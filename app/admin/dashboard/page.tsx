import { checkCacheAdminAuth } from "@/lib/auth";
import { redirect } from "next/navigation";
import DashboardClient from "./dashboard-client";

export default async function AdminDashboard() {
  const isAuth = await checkCacheAdminAuth();

  if(!isAuth) {
    redirect("/admin");
  }

  return <DashboardClient />;
}