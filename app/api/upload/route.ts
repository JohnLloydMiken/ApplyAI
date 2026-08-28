import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!, // server-only, never exposed to client
);

export async function POST(req: NextRequest) {
  console.log("SUPABASE_URL:", process.env.SUPABASE_URL);
  console.log(
    "SERVICE_ROLE_KEY exists:",
    !!process.env.SUPABASE_SERVICE_ROLE_KEY,
  );
  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) NextResponse.json({ error: "No File" }, { status: 400 });

  if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
    return NextResponse.json({ error: "Invalid file type" }, { status: 400 });
  }

  if (file.size > 5 * 1024 * 1024)
    return NextResponse.json({ error: "File too large" }, { status: 400 });

  const ext = file.name.split(".").pop();
  const path = `${crypto.randomUUID()}.${ext}`;

  const { error } = await supabase.storage
    .from("avatars") // was 'post-images'
    .upload(path, file, { contentType: file.type });

  if (error) {
    console.error("Supabase upload error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const {
    data: { publicUrl },
  } = supabase.storage
    .from("avatars") // was 'post-images'
    .getPublicUrl(path);

  return NextResponse.json({ url: publicUrl });
}
