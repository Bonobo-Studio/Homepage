import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

export async function GET() {
    try {
        const { data, error } = await supabaseServer
            .from(process.env.NEXT_PUBLIC_DB_PHOTOS_TABLE!)
            .select("*")
            .order("created_at", { ascending: false });

        if (error) {
            console.log(error)

            return NextResponse.json(
                { error: error.message },
                { status: 500 }
            );
        }

        return NextResponse.json({ items: data || [] });
    } catch (error) {
        return NextResponse.json(
            { error: "데이터를 불러오는 중 오류가 발생했습니다" },
            { status: 500 }
        );
    }
}