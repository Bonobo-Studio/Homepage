import Link from "next/link"
import { Instagram } from "lucide-react"

export function Footer() {
  return (
    <footer className="py-12 px-6 bg-foreground text-background">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <p className="text-xl font-semibold tracking-tight">BONOBO STUDIO</p>
            <p className="text-sm text-background/60 mt-1">당신의 소중한 순간을 빛으로 담습니다</p>
          </div>

          <div className="flex items-center gap-6">
            <Link
              href="https://instagram.com"
              target="_blank"
              className="text-background/60 hover:text-background transition-colors"
              aria-label="인스타그램"
            >
              <Instagram className="w-5 h-5" />
            </Link>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-background/20 text-center">
          <p className="text-sm text-background/40">© 2025 Bonobo Studio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
