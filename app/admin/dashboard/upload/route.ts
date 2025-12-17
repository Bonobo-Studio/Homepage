import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";
import { getSession } from "@/lib/session";

export async function POST(req: Request) {
    const session = await getSession()
    if (!session.isAdmin) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const form = await req.formData();
    const file = form.get("file") as File;

    if (!file) {
        return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
    }

    const path = `${file.name}`;

    // Supabase Storage 업로드
    const { error: uploadErr } = await supabaseServer.storage
        .from(process.env.STORAGE_BUCKET!)
        .upload(path, file, {
            contentType: file.type,
            upsert: true,
        });

    if (uploadErr) {
        console.error("[admin upload] error:", uploadErr.message)
        return NextResponse.json({ error: uploadErr.message }, { status: 500 });
    }

    // Public URL 생성
    const { data: urlData } = supabaseServer.storage
        .from(process.env.STORAGE_BUCKET!)
        .getPublicUrl(path);

    // DB Insert
    const { error: dbErr, data } = await supabaseServer
        .from(process.env.DB_PHOTOS_TABLE!)
        .insert({
            title: file.name,
            storage_path: path,
            url: urlData.publicUrl,
        })
        .select()
        .single();

    if (dbErr) {
        return NextResponse.json({ error: dbErr.message }, { status: 500 });
    }

    return NextResponse.json({ item: data });
}
