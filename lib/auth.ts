"use server"

import { NextResponse } from "next/server"
import { getSession } from "./session";

export const authAdmin = async (password: string) => {
    let adminPassword = process.env.ADMIN_PASSWORD;

    if(password === adminPassword) {
        const session = await getSession()
        session.isAdmin = true;
        await session.save();

        return NextResponse.json({ ok: true });
    }

    return new NextResponse("Unauthorized", { status: 401 });
}