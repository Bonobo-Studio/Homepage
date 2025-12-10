"use server"

import { cookies } from "next/headers";
import { cache } from "react";
import { NextResponse } from "next/server"

export const checkCacheAdminAuth = cache(async () => {
    const cookieStore = await cookies();
    const adminAuth = cookieStore.get("admin_auth");
    return adminAuth?.value === "true";
});

export const deleteCacheAdminAuth = async () => {
    (await cookies()).delete("admin_auth");
    return NextResponse.json({ ok: true });
}

export const authAdmin = async (password: string) => {
    let adminPassword = process.env.ADMIN_PASSWORD;

    if(password === adminPassword) {
        (await cookies()).set("admin_auth", "true", {
            httpOnly: true,
            secure: true,
            maxAge: 60 * 60 * 24, // 1 day
          });

        return NextResponse.json({ ok: true });
    }

    return new NextResponse("Unauthorized", { status: 401 });
}