"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

const categories = [
  { id: "all", name: "전체" },
  { id: "wedding", name: "웨딩" },
  { id: "profile", name: "프로필" },
  { id: "family", name: "가족사진" },
  { id: "snap", name: "스냅" },
]

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

export function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [portfolioItems, setPortfolioItems] = useState<
    Array<{ id: number; category: string; title: string; image: string }>
  >([])

  useEffect(() => {
    // Load items from localStorage
    const stored = localStorage.getItem("portfolioItems")
    if (stored) {
      setPortfolioItems(JSON.parse(stored))
    } else {
      setPortfolioItems(defaultItems)
      localStorage.setItem("portfolioItems", JSON.stringify(defaultItems))
    }

    // Listen for storage changes (when admin updates)
    const handleStorageChange = () => {
      const updated = localStorage.getItem("portfolioItems")
      if (updated) {
        setPortfolioItems(JSON.parse(updated))
      }
    }

    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [])

  const filteredItems =
    activeCategory === "all" ? portfolioItems : portfolioItems.filter((item) => item.category === activeCategory)

  return (
    <section id="portfolio" className="py-24 px-6 bg-secondary">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm tracking-[0.2em] text-muted-foreground uppercase mb-3">Portfolio</p>
          <h2 className="text-3xl md:text-4xl font-light text-foreground">작품 갤러리</h2>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-2 text-sm transition-all ${
                activeCategory === category.id
                  ? "bg-foreground text-background"
                  : "bg-transparent text-muted-foreground hover:text-foreground border border-border"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredItems.map((item) => (
            <div key={item.id} className="group relative aspect-[3/4] overflow-hidden cursor-pointer">
              <Image
                src={item.image || "/placeholder.svg"}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/40 transition-all duration-300 flex items-center justify-center">
                <p className="text-primary-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-lg font-light">
                  {item.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
