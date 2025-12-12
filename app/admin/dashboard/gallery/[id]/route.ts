import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const { error, data } = await supabaseServer
            .from(process.env.NEXT_PUBLIC_DB_PHOTOS_TABLE!)
            .select()
            .eq("id", id)
            .single()

        if (error) {
            return NextResponse.json(
                { error: error.message },
                { status: 500 }
            );
        }
        else {
            const { error: deleteErr } = await supabaseServer.storage
                .from(process.env.NEXT_PUBLIC_STORAGE_BUCKET!)
                .remove([data.storage_path])

            if (deleteErr) {
                return NextResponse.json(
                    { error: deleteErr.message },
                    { status: 500 }
                );
            }

            const { error: dbDeleteErr } = await supabaseServer
                .from(process.env.NEXT_PUBLIC_DB_PHOTOS_TABLE!)
                .delete()
                .eq("id", id)

            if (dbDeleteErr) {
                return NextResponse.json(
                    { error: dbDeleteErr.message },
                    { status: 500 }
                );
            }

            return NextResponse.json({ success: true });
        }
    } catch (error) {
        return NextResponse.json(
            { error: "삭제 중 오류가 발생했습니다" },
            { status: 500 }
        );
    }
}