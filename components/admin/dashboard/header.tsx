import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export default function Header({handleLogout}: {handleLogout: () => Promise<void>}) {
    return (
        <header className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-light">갤러리 관리</h1>
          <Button variant="outline" onClick={handleLogout} size="sm">
            <LogOut className="w-4 h-4 mr-2" />
            로그아웃
          </Button>
        </div>
      </header>
    )
}