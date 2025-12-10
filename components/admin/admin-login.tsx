"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useState } from "react";
import { useRouter } from "next/navigation";

type LoginResult = {
  success: boolean
  redirect?: string
  error?: string
}

export function AdminLogin({handleLogin}: {handleLogin: (password: string) => Promise<LoginResult>}) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await handleLogin(password);
      console.log("[admin login] result:", result)

      if(result.success) {
        router.push(result.redirect!);
        return;
      }

      setError("로그인에 실패했습니다.")
    }
    catch(e) {
      console.error("[admin login] error:", e)
      setError("로그인 중 오류가 발생했습니다")
    }
  }

  return (
        <div className="min-h-screen bg-background flex items-center justify-center px-6">
          <Card className="w-full max-w-md p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-light text-foreground mb-2">관리자 로그인</h1>
              <p className="text-sm text-muted-foreground">갤러리 관리를 위해 로그인하세요</p>
            </div>
    
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">비밀번호</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="비밀번호를 입력하세요"
                  className="w-full"
                />
              </div>
    
              {error && <p className="text-sm text-destructive">{error}</p>}
    
              <Button type="submit" className="w-full">
                로그인
              </Button>
            </form>
          </Card>
        </div>
      )
}