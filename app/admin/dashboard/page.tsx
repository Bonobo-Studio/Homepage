import { checkCacheAdminAuth, deleteCacheAdminAuth } from "@/lib/auth";
import { redirect } from "next/navigation";
import DashboardClient from "@/components/admin/dashboard/dashboard-client";

type LogoutResult = {
  success: boolean
  error?: string
}

async function handleLogoutAction(): Promise<LogoutResult> {
  "use server"
  try {
    await deleteCacheAdminAuth()
    return { success: true }
  } catch (error) {
    return { success: false, error: "로그아웃 중 오류가 발생했습니다" }
  }
}

export default async function AdminDashboard() {
  const isAuth = await checkCacheAdminAuth();

  if (!isAuth) {
    redirect("/admin");
  }

  return <DashboardClient handleLogout={handleLogoutAction} />;
}