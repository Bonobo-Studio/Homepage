import { checkAdminAuth } from "@/lib/auth";
import { redirect } from "next/navigation";
import DashboardClient from "./dashboard-client";

export default async function AdminDashboard() {
  const isAuth = await checkAdminAuth();

  if(!isAuth) {
    redirect("/admin");
  }

  return <DashboardClient />;
}