"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

export function Header() {
  const navItems = [
    { name: "후쿠오카 스냅촬영", href: "/services/snap-photography" },
    { name: "프라이빗 투어", href: "/services/private-tour" },
    { name: "포트폴리오", href: "/#portfolio" },
    { name: "촬영 및 투어 문의", href: "/#contact" },
  ]  

  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="fixed top-0 right-0 left-0 z-50 border-b backdrop-blur-md bg-background/80 border-border">
      <div className="flex justify-between items-center px-6 py-4 mx-auto max-w-7xl">
        <Link href="/" className="text-xl font-semibold tracking-tight text-foreground">
          BONOBO STUDIO
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden gap-8 items-center md:flex">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm transition-colors text-muted-foreground hover:text-foreground"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button className="p-2 md:hidden" onClick={() => setIsOpen(!isOpen)} aria-label="메뉴 열기">
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <nav className="border-b md:hidden bg-background border-border">
          <div className="flex flex-col gap-4 px-6 py-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm transition-colors text-muted-foreground hover:text-foreground"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  )
}
