import { cookies } from "next/headers";
import { cache } from "react";

export const checkAdminAuth = cache(async () => {
    const cookieStore = await cookies();
    const adminAuth = cookieStore.get("admin_auth");
    return adminAuth?.value === "true";
});