import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

const allowedTags = new Set(["plants", "fertilizers", "services"]);

export async function POST(request) {
  const secret = process.env.REVALIDATE_SECRET;
  const body = await request.json().catch(() => null);

  if (!secret || body?.secret !== secret) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const tags = Array.isArray(body?.tags) ? body.tags : [];
  for (const tag of tags) {
    if (allowedTags.has(tag)) revalidateTag(tag);
  }

  return NextResponse.json({ ok: true, revalidated: tags.filter((tag) => allowedTags.has(tag)) });
}
