import { AdminLogin } from "@/components/admin/admin-login"
import { authAdmin } from "@/lib/auth"
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

async function handleLoginAction(password: string) {
  "use server"

  const response = await authAdmin(password);

  if (response.ok) {
    return { success: true, redirect: "/admin/dashboard" };
  } else {
    return { success: false, error: "비밀번호가 올바르지 않습니다" };
  }
}

export default async function AdminLoginPage() {
  const session = await getSession()

  if (session.isAdmin) {
    redirect("/admin/dashboard")
  }

  return <AdminLogin handleLogin={handleLoginAction} />
}
