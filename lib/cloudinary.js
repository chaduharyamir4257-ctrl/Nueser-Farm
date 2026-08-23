// Uploads a File object straight from the browser to Cloudinary using an
// UNSIGNED upload preset (no API secret needed in frontend code — safe to
// expose the cloud name + preset publicly).
//
// Setup once in Cloudinary dashboard: Settings -> Upload -> Add upload preset
// -> Signing Mode: Unsigned -> name it, e.g. "nursery-uploads" -> Save.
// Then put that name + your cloud name into .env.local.
export async function uploadImageToCloudinary(file) {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  if (!cloudName || !uploadPreset) {
    throw new Error(
      "Cloudinary isn't configured yet — add NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME and NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET to .env.local"
    );
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);
  formData.append("folder", "khalil-nursery");

  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error?.message || "Image upload failed");
  }

  const data = await res.json();
  return data.secure_url;
}
