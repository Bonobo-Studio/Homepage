"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

import UploadBoard from "./upload-board"
import Header from "./header"
import { GallaryBoard, PortfolioItem } from "./gallary-board"

export default function DashboardClient() {
  const router = useRouter()
  const [items, setItems] = useState<PortfolioItem[]>([])

  useEffect(() => {
    // Load portfolio items
    const stored = localStorage.getItem("portfolioItems")
    if (stored) {
      setItems(JSON.parse(stored))
    } else {
      // Initialize with default items
      const defaultItems = [
        {
          id: 1,
          category: "wedding",
          title: "봄날의 웨딩",
          image: "/elegant-wedding-couple-in-garden-with-soft-natural.jpg",
        },
        {
          id: 2,
          category: "profile",
          title: "비즈니스 프로필",
          image: "/professional-business-portrait-in-studio-with-clea.jpg",
        },
        {
          id: 3,
          category: "family",
          title: "가족의 행복",
          image: "/happy-family-portrait-in-natural-outdoor-setting.jpg",
        },
        {
          id: 4,
          category: "snap",
          title: "일상의 순간",
          image: "/candid-street-photography-portrait-with-bokeh-back.jpg",
        },
        {
          id: 5,
          category: "wedding",
          title: "로맨틱 웨딩",
          image: "/romantic-wedding-couple-sunset-silhouette.jpg",
        },
        {
          id: 6,
          category: "profile",
          title: "아티스트 프로필",
          image: "/artistic-portrait-with-dramatic-lighting.jpg",
        },
        {
          id: 7,
          category: "family",
          title: "세대를 잇는",
          image: "/multigenerational-family-portrait-warm-tones.jpg",
        },
        {
          id: 8,
          category: "snap",
          title: "여행 스냅",
          image: "/travel-photography-portrait-scenic-destination.jpg",
        },
      ]
      setItems(defaultItems)
      localStorage.setItem("portfolioItems", JSON.stringify(defaultItems))
    }
  }, [router])

  const handleLogout = async () => {
    await fetch("/api/auth", { method: "DELETE" })
    router.push("/admin")
  }

  const handleDeleteItem = (id: number) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      const updatedItems = items.filter((item) => item.id !== id)
      setItems(updatedItems)
      localStorage.setItem("portfolioItems", JSON.stringify(updatedItems))
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header handleLogout={handleLogout} />
      <div className="px-6 py-8 mx-auto max-w-7xl">
        <UploadBoard />
        <GallaryBoard items={items} />
      </div>
    </div>
  )
}
