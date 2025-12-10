"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { AdminLogin } from "@/components/admin/admin-login"

export default function AdminLoginPage() {
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Simple password check (in production, use proper authentication)
    if (password === "admin123") {
      localStorage.setItem("adminAuth", "true")
      router.push("/admin/dashboard")
    } else {
      setError("비밀번호가 올바르지 않습니다")
    }
  }

  return <AdminLogin 
    password={password} 
    error={error} 
    onPasswordChange={(e) => setPassword(e.target.value) } 
    handleLogin={handleLogin} />
}
