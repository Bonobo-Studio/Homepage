import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
    const { id, password } = await request.json();

    const adminId = process.env.ADMIN_ID;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if(id === adminId && password === adminPassword) {
        (await cookies()).set("admin_auth", "true", {
            httpOnly: true,
            secure: true,
            maxAge: 60 * 60 * 24, // 1 day
          });

        return NextResponse.json({ ok: true });
    }

    return new NextResponse("Unauthorized", { status: 401 });
}

export async function DELETE() {
    (await cookies()).delete("admin_auth");
    return NextResponse.json({ ok: true });
}