"use client"

import { useState, useEffect, useMemo } from "react"
import Image from "next/image"

const categories = [
  { id: "photo", name: "사진" },
  { id: "video", name: "동영상" },
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
  const [activeCategory, setActiveCategory] = useState("photo")
  const [portfolioItems, setPortfolioItems] = useState<
    Array<{ id: number; category: string; title: string; image: string }>
  >([])
  const [displayStartIndex, setDisplayStartIndex] = useState(0)
  const maxVisibleItems = 5

  // 보여줄 아이템 계산 (순환)
  const visibleItems = useMemo(() => {
    if (portfolioItems.length <= maxVisibleItems) return portfolioItems
    const items: typeof portfolioItems = []
    for (let i = 0; i < maxVisibleItems; i += 1) {
      // 배열 끝에 닿으면 앞에서 다시 가져오기
      const wrappedIndex = (displayStartIndex + i) % portfolioItems.length
      items.push(portfolioItems[wrappedIndex])
    }
    return items
  }, [portfolioItems, displayStartIndex])

  useEffect(() => {
    setPortfolioItems(defaultItems)
  }, [])

  // 자동 스크롤 useEffect 추가
  useEffect(() => {
    // 아이템이 5개 이하이면 자동 스크롤 불필요
    if (portfolioItems.length <= maxVisibleItems) return
    const intervalId = window.setInterval(() => {
      setDisplayStartIndex((prev) => (prev + maxVisibleItems) % portfolioItems.length)
    }, 4000) // 4초마다 다음 세트로 이동
    return () => window.clearInterval(intervalId)
  }, [portfolioItems])

  // 버튼 핸들러
  const handlePrev = () => {
    if (portfolioItems.length === 0) return
    setDisplayStartIndex((prev) => {
      const nextIndex = (prev - maxVisibleItems) % portfolioItems.length
      return nextIndex < 0 ? nextIndex + portfolioItems.length : nextIndex
    })
  }

  const handleNext = () => {
    if (portfolioItems.length === 0) return
    setDisplayStartIndex((prev) => (prev + maxVisibleItems) % portfolioItems.length)
  }

  return (
    <section id="portfolio" className="px-6 py-24 bg-secondary">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <p className="text-sm tracking-[0.2em] text-muted-foreground uppercase mb-3">Portfolio</p>
          <h2 className="text-3xl font-light md:text-4xl text-foreground">작품 갤러리</h2>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-4 justify-center mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-2 text-sm transition-all ${activeCategory === category.id
                ? "bg-foreground text-background"
                : "bg-transparent text-muted-foreground hover:text-foreground border border-border"
                }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="relative">
          <div className="grid grid-rows-1 grid-flow-col auto-cols-[minmax(0,1fr)] gap-4 overflow-hidden">
            {visibleItems.map((item) => (
              <div key={item.id} className="group relative aspect-[3/4] overflow-hidden cursor-pointer">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="flex absolute inset-0 justify-center items-center transition-all duration-300 bg-foreground/0 group-hover:bg-foreground/40">
                  <p className="text-lg font-light opacity-0 transition-opacity duration-300 text-primary-foreground group-hover:opacity-100">
                    {item.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
          {portfolioItems.length > maxVisibleItems && (
            <div className="flex gap-3 justify-center items-center mt-4">
              <button
                onClick={handlePrev}
                aria-label="이전 항목"
                className="h-10 min-w-[2.5rem] px-3 rounded-full border border-border bg-background/90 text-foreground shadow transition hover:bg-foreground hover:text-background active:scale-95 sm:h-11 sm:px-4"
              >
                <span aria-hidden="true" className="text-lg leading-none">‹</span>
              </button>
              <button
                onClick={handleNext}
                aria-label="다음 항목"
                className="h-10 min-w-[2.5rem] px-3 rounded-full border border-border bg-background/90 text-foreground shadow transition hover:bg-foreground hover:text-background active:scale-95 sm:h-11 sm:px-4"
              >
                <span aria-hidden="true" className="text-lg leading-none">›</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
