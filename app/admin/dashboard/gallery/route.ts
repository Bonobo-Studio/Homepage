import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";
import { getSession } from "@/lib/session";

export async function GET() {
    try {
        const session = await getSession()
        if (!session.isAdmin) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { data, error } = await supabaseServer
            .from(process.env.DB_PHOTOS_TABLE!)
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