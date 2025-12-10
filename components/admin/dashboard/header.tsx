import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

type LogoutResult = {
  success: boolean
  error?: string
}

export default function Header({handleLogout}: {handleLogout: () => Promise<LogoutResult>}) {
    return (
        <header className="border-b border-border bg-card">
        <div className="flex justify-between items-center px-6 py-4 mx-auto max-w-7xl">
          <h1 className="text-xl font-light">갤러리 관리</h1>
          <Button variant="outline" onClick={handleLogout} size="sm">
            <LogOut className="mr-2 w-4 h-4" />
            로그아웃
          </Button>
        </div>
      </header>
    )
}