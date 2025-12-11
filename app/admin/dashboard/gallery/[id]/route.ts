// 파일 경로: app/admin/dashboard/gallery/[id]/route.ts
// URL 경로: /admin/dashboard/gallery/123 (id는 123)

import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const { error, data } = await supabaseServer
            .from(process.env.NEXT_PUBLIC_DB_TABLE!)
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
                .remove([data?.title])

            if (deleteErr) {
                return NextResponse.json(
                    { error: deleteErr.message },
                    { status: 500 }
                );
            }

            const { error: dbDeleteErr } = await supabaseServer
                .from(process.env.NEXT_PUBLIC_DB_TABLE!)
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