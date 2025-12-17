"use client"

import { useState, useEffect, useMemo } from "react"
import Image from "next/image"

// YouTube URL에서 Video ID 추출하는 유틸 함수
function extractYouTubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
  ]
  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match) return match[1]
  }
  return null
}

// YouTube 썸네일 URL 생성
function getYouTubeThumbnail(videoId: string): string {
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
}

interface VideoItem {
  id: number
  title: string
  url: string
  thumbnail_url?: string
}

interface PhotoItem {
  id: number
  title: string
  url: string
}

export function Portfolio() {
  const categories = [
    { id: "photo", name: "사진" },
    { id: "video", name: "동영상" },
  ]

  const [activeCategory, setActiveCategory] = useState("photo")
  const [photoItems, setPhotoItems] = useState<PhotoItem[]>([])
  const [displayStartIndex, setDisplayStartIndex] = useState(0)
  const maxVisibleItems = 5

  // 사진 모달용 상태 추가
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null)

  const [videoItems, setVideoItems] = useState<VideoItem[]>([])
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null)

  // 보여줄 아이템 계산 (순환)
  const visibleItems = useMemo(() => {
    if (photoItems.length <= maxVisibleItems) return photoItems
    const items: typeof photoItems = []
    for (let i = 0; i < maxVisibleItems; i += 1) {
      // 배열 끝에 닿으면 앞에서 다시 가져오기
      const wrappedIndex = (displayStartIndex + i) % photoItems.length
      items.push(photoItems[wrappedIndex])
    }
    return items
  }, [photoItems, displayStartIndex])

  // 사진 데이터 로드
  useEffect(() => {
    async function loadPhotos() {
      try {
        const response = await fetch("/api/photos")
        if (response.ok) {
          const { items } = await response.json()
          setPhotoItems(items || [])
        }
      } catch (error) {
        console.error("사진 로드 오류:", error)
      }
    }
    loadPhotos()
  }, [])

  // 동영상 데이터 로드
  useEffect(() => {
    async function loadVideos() {
      try {
        const response = await fetch("/api/videos")
        if (response.ok) {
          const { items } = await response.json()
          setVideoItems(items || [])
        }
      } catch (error) {
        console.error("동영상 로드 오류:", error)
      }
    }
    loadVideos()
  }, [])

  // 자동 스크롤 useEffect 추가
  useEffect(() => {
    if (activeCategory !== "photo") return
    if (photoItems.length <= maxVisibleItems) return

    const intervalId = window.setInterval(() => {
      setDisplayStartIndex((prev) => (prev + maxVisibleItems) % photoItems.length)
    }, 4000)
    return () => window.clearInterval(intervalId)
  }, [photoItems, activeCategory])

  // 버튼 핸들러
  const handlePrev = () => {
    if (photoItems.length === 0) return
    setDisplayStartIndex((prev) => {
      const nextIndex = (prev - maxVisibleItems) % photoItems.length
      return nextIndex < 0 ? nextIndex + photoItems.length : nextIndex
    })
  }

  const handleNext = () => {
    if (photoItems.length === 0) return
    setDisplayStartIndex((prev) => (prev + maxVisibleItems) % photoItems.length)
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
              onClick={() => {
                setActiveCategory(category.id)
                setDisplayStartIndex(0)
              }}
              className={`px-6 py-2 text-sm transition-all ${activeCategory === category.id
                ? "bg-foreground text-background"
                : "bg-transparent text-muted-foreground hover:text-foreground border border-border"
                }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* 사진 갤러리 */}
        {activeCategory == "photo" && (
          <div className="relative">
            <div className="grid grid-rows-1 grid-flow-col auto-cols-[minmax(0,1fr)] gap-4 overflow-hidden">
              {visibleItems.map((item) => (
                <div
                  key={item.id}
                  className="overflow-hidden relative rounded-lg cursor-pointer group aspect-auto"
                  onClick={() => setSelectedPhoto(item)}
                >
                  <img
                    src={item.url || "/placeholder.svg"}
                    alt={item.title}
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="flex absolute inset-0 justify-center items-center transition-all duration-300 bg-foreground/0 group-hover:bg-foreground/40">
                  </div>
                </div>
              ))}
            </div>
            {photoItems.length > maxVisibleItems && (
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
        )}

        {/* 동영상 갤러리 */}
        {activeCategory === "video" && (
          <div className="grid grid-rows-1 grid-flow-col auto-cols-[minmax(0,1fr)] gap-6 md:grid-cols-2 lg:grid-cols-3">
            {videoItems.length === 0 ? (
              <p className="col-span-full py-12 text-center text-muted-foreground">
                등록된 동영상이 없습니다
              </p>
            ) : (
              videoItems.map((video) => {
                const videoId = extractYouTubeId(video.url)
                const thumbnail = video.thumbnail_url ||
                  (videoId ? getYouTubeThumbnail(videoId) : "/placeholder.svg")

                return (
                  <div
                    key={video.id}
                    className="overflow-hidden relative rounded-lg cursor-pointer group aspect-video"
                    onClick={() => videoId && setSelectedVideo(videoId)}
                  >
                    <img
                      src={thumbnail}
                      alt={video.title}
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* 재생 버튼 오버레이 */}
                    <div className="flex absolute inset-0 justify-center items-center transition-all bg-black/30 group-hover:bg-black/50">
                      <div className="flex justify-center items-center w-16 h-16 rounded-full bg-white/90">
                        <svg
                          className="ml-1 w-8 h-8 text-foreground"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                    {/* 제목 */}
                    <div className="absolute right-0 bottom-0 left-0 p-4 bg-gradient-to-t to-transparent from-black/70">
                      <p className="font-light text-white">{video.title}</p>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        )}

        {/* YouTube 모달 */}
        {selectedVideo && (
          <div
            className="flex fixed inset-0 z-50 justify-center items-center p-4 bg-black/80"
            onClick={() => setSelectedVideo(null)}
          >
            <div
              className="relative w-full max-w-4xl aspect-video"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute right-0 -top-10 text-white hover:text-gray-300"
              >
                닫기 ✕
              </button>
              <iframe
                src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`}
                className="w-full h-full rounded-lg"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            </div>
          </div>
        )}

                {/* 사진 모달 */}
                {selectedPhoto && (
          <div
            className="overflow-auto fixed inset-0 z-50 bg-black/90"
            onClick={() => setSelectedPhoto(null)}
          >
            {/* 닫기 버튼 - 화면 우상단 고정 */}
            <button
              onClick={() => setSelectedPhoto(null)}
              className="fixed top-4 right-4 z-10 text-lg text-white hover:text-gray-300"
            >
              닫기 ✕
            </button>

            {/* 이전/다음 버튼 - 화면 좌우 고정 */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                const currentIndex = photoItems.findIndex(p => p.id === selectedPhoto.id)
                const prevIndex = currentIndex > 0 ? currentIndex - 1 : photoItems.length - 1
                setSelectedPhoto(photoItems[prevIndex])
              }}
              className="flex fixed left-4 top-1/2 z-10 justify-center items-center w-12 h-12 text-2xl text-white rounded-full transition -translate-y-1/2 bg-white/20 hover:bg-white/40"
            >
              ‹
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                const currentIndex = photoItems.findIndex(p => p.id === selectedPhoto.id)
                const nextIndex = currentIndex < photoItems.length - 1 ? currentIndex + 1 : 0
                setSelectedPhoto(photoItems[nextIndex])
              }}
              className="flex fixed right-4 top-1/2 z-10 justify-center items-center w-12 h-12 text-2xl text-white rounded-full transition -translate-y-1/2 bg-white/20 hover:bg-white/40"
            >
              ›
            </button>

            {/* 이미지 컨테이너 - 원본 크기, 중앙 정렬, 스크롤 가능 */}
            <div
              className="flex justify-center items-center p-8 min-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedPhoto.url}
                alt={selectedPhoto.title}
                className="max-w-none"
                onClick={() => setSelectedPhoto(null)}
              />
            </div>
          </div>
        )}

      </div>
    </section>
  )
}
