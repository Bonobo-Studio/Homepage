import type React from "react"

import { AdminLogin } from "@/components/admin/admin-login"
import { authAdmin } from "@/lib/auth"

async function handleLoginAction(password: string) {
  "use server"

  const response = await authAdmin(password);

  if(response.ok) {
    return { success: true, redirect: "/admin/dashboard" };
  } else {
    return { success: false, error: "비밀번호가 올바르지 않습니다" };
  }
}

export default function AdminLoginPage() {
  return <AdminLogin handleLogin={handleLoginAction} />
}
