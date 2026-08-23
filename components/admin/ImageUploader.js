"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabaseClient";
import { uploadImageToCloudinary } from "@/lib/cloudinary";

function isSupabaseStorageUrl(url) {
  return typeof url === "string" && url.includes("/storage/v1/object/public/images/");
}

function getSupabaseStoragePath(url) {
  const marker = "/storage/v1/object/public/images/";
  const index = url.indexOf(marker);
  if (index === -1) return null;
  const pathWithQuery = url.slice(index + marker.length);
  const queryIndex = pathWithQuery.indexOf("?");
  const rawPath = queryIndex === -1 ? pathWithQuery : pathWithQuery.slice(0, queryIndex);
  try {
    return decodeURIComponent(rawPath);
  } catch {
    return rawPath;
  }
}

export default function ImageUploader({ value, onChange, label = "Photo" }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const previousSupabaseUrl = useRef(null);
  const currentSupabasePath = useRef(null);
  const isStoredImage = isSupabaseStorageUrl(value);

  useEffect(() => {
    if (isSupabaseStorageUrl(value)) {
      previousSupabaseUrl.current = value;
      currentSupabasePath.current = getSupabaseStoragePath(value);
    } else {
      previousSupabaseUrl.current = null;
      currentSupabasePath.current = null;
    }
  }, [value]);

  async function uploadToSupabase(file) {
    if (!supabase) {
      throw new Error("Supabase is not connected. Add your project URL and anon key to .env.local.");
    }

    const filename = `${Date.now()}-${file.name}`;
    const { data: uploadData, error: uploadError } = await supabase.storage.from("images").upload(filename, file, {
      cacheControl: "3600",
      upsert: false,
    });
    console.log("Supabase upload response", { filename, uploadData, uploadError });

    if (uploadError) {
      throw new Error(uploadError.message || "Supabase storage upload failed");
    }

    const { data: urlData, error: urlError } = await supabase.storage.from("images").getPublicUrl(filename);
    console.log("Supabase getPublicUrl response", { filename, urlData, urlError });
    if (urlError) {
      throw new Error(urlError.message || "Failed to get public URL");
    }

    return { publicUrl: urlData.publicUrl, path: filename };
  }

  async function listBucketFiles(message) {
    if (!supabase) return null;
    const { data, error } = await supabase.storage.from("images").list("", { limit: 100 });
    console.log(message, { files: data, error });
    return { data, error };
  }

  async function deleteSupabaseFile(url) {
    if (!supabase) return;
    const path = currentSupabasePath.current || getSupabaseStoragePath(url);
    console.log("Deleting storage path", path, "from url", url);
    if (!path) {
      throw new Error("Cannot delete file: invalid storage URL");
    }

    const session = await supabase.auth.getSession();
    console.log("Supabase auth session before delete", session);

    await listBucketFiles("Bucket contents before delete");

    const { data, error: deleteError } = await supabase.storage.from("images").remove([path]);
    console.log("Supabase remove response", { path, data, deleteError });

    await listBucketFiles("Bucket contents after delete");

    if (deleteError) {
      console.warn("Delete failed for path", path, { deleteError });
      throw new Error(deleteError.message || "Failed to delete storage file");
    }

    return data;
  }

  async function handleFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError("");
    setUploading(true);
    try {
      let url;
      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
      const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
      const previousValue = value;

      if (cloudName && uploadPreset && cloudName !== "your-cloud-name" && uploadPreset !== "your-unsigned-upload-preset") {
        url = await uploadImageToCloudinary(file);
      } else {
        const result = await uploadToSupabase(file);
        url = result.publicUrl;
        currentSupabasePath.current = result.path;
      }

      console.log("handleFile complete", { previousValue, newUrl: url, currentSupabasePath: currentSupabasePath.current });

      if (previousValue && isSupabaseStorageUrl(previousValue)) {
        await deleteSupabaseFile(previousValue);
      }

      onChange(url);
    } catch (err) {
      setError(err.message || "Upload failed");
      console.error("Upload error", err);
    } finally {
      setUploading(false);
    }
  }

  async function handleRemove() {
    if (!value) return;
    setError("");
    setUploading(true);
    try {
      if (isSupabaseStorageUrl(value)) {
        console.log("handleRemove deleting", { value, currentSupabasePath: currentSupabasePath.current });
        await deleteSupabaseFile(value);
        currentSupabasePath.current = null;
      }
      previousSupabaseUrl.current = null;
      onChange("");
    } catch (err) {
      setError(err.message || "Remove failed");
      console.error("Supabase delete failed", err);
    } finally {
      setUploading(false);
    }
  }

  const uploadDisabled = uploading;

  return (
    <div className="flex flex-col gap-4 rounded-3xl border border-line bg-cream-card p-5 shadow-sm">
      <div className="flex items-center gap-4">
        <div>
          <label className="text-[13px] font-semibold text-forest-dark">{label}</label>
          <p className="text-xs text-ink-soft mt-1">Upload an image from your device.</p>
        </div>
      </div>

      <div className="grid sm:grid-cols-[96px,1fr] gap-4 items-start">
        <div className="relative w-24 h-24 rounded-xl overflow-hidden border border-line bg-white shadow-inner">
          {value ? (
            <Image src={value} alt="Uploaded image preview" fill sizes="96px" className="object-cover" />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-ink-soft text-[12px] px-2 text-center">
              No photo selected
            </div>
          )}
        </div>

        <div className="flex flex-col gap-3">
          <label className="inline-flex items-center justify-center px-4 py-2.5 rounded-full text-sm font-semibold bg-white border border-line text-forest-dark hover:bg-cream transition cursor-pointer disabled:cursor-not-allowed disabled:opacity-60">
            <span>{uploading ? "Uploading…" : "Choose image"}</span>
            <input type="file" accept="image/*" onChange={handleFile} className="hidden" disabled={uploadDisabled} />
          </label>

          {value && (
            <button type="button" onClick={handleRemove} disabled={uploading} className="px-4 py-2.5 rounded-full text-sm font-semibold bg-white border border-line text-clay-dark hover:bg-cream transition disabled:opacity-60">
              Remove image
            </button>
          )}

          {error && <p className="text-xs text-clay-dark">{error}</p>}
        </div>
      </div>
    </div>
  );
}
