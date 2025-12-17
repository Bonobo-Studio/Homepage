import { redirect } from "next/navigation";
import Header from "@/components/admin/dashboard/header";
import { AdminDashboardClient } from "./admin-dashboard-client";
import { getSession } from "@/lib/session";

type LogoutResult = {
  success: boolean
  error?: string
}

async function handleLogoutAction(): Promise<LogoutResult> {
  "use server"

  try {
    const session = await getSession()
    session.destroy()
    return { success: true }
  } catch (error) {
    return { success: false, error: "로그아웃 중 오류가 발생했습니다" }
  }
}

export default async function AdminDashboard() {
  const session = await getSession()

  if (!session.isAdmin) {
    redirect("/admin");
  }

  return (
    <div className="min-h-screen bg-background">
      <Header
        handleLogout={handleLogoutAction} />
      <div className="px-6 py-8 mx-auto max-w-7xl">
        <AdminDashboardClient />
      </div>
    </div>
  )
}