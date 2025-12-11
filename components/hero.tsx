"use client"

import { use, useState, useEffect, useRef } from "react"

type HeroItem = { image: string }
const FALLBACK_IMAGE = "/elegant-photography-studio-interior-with-soft-natu.jpg"

export function Hero({ heroItems }: { heroItems: Promise<HeroItem[]> }) {
  // 두 레이어의 이미지 인덱스를 각각 관리
  const [indexA, setIndexA] = useState(0)
  const [indexB, setIndexB] = useState(1)
  const [showA, setShowA] = useState(true) // true면 A visible, false면 B visible
  const timeoutRef = useRef<number | null>(null)

  const allItems = use(heroItems) ?? []
  const length = allItems.length
  const hasImages = length > 0
  const canAutoFade = length >= 2

  const holdMs = 3500
  const fadeMs = 900

  // 길이가 바뀌면 초기화
  useEffect(() => {
    setIndexA(0)
    setIndexB(1)
    setShowA(true)
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current)
  }, [length])

  const imageA = hasImages ? allItems[indexA % length].image : FALLBACK_IMAGE
  const imageB = hasImages ? allItems[indexB % length].image : FALLBACK_IMAGE

  useEffect(() => {
    if (!canAutoFade) return

    const clearTimer = () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current)
    }
    clearTimer()

    const schedule = () => {
      // 페이드 토글 (보이는 레이어 전환)
      setShowA((prev) => !prev)

      timeoutRef.current = window.setTimeout(() => {
        // 페이드 완료 후, 숨겨진 레이어의 이미지를 다음 이미지로 미리 교체
        if (showA) {
          // 방금 A→B로 전환됨, 이제 A는 숨겨짐 → A의 이미지를 B+1로
          setIndexA(indexB + 1)
        } else {
          // 방금 B→A로 전환됨, 이제 B는 숨겨짐 → B의 이미지를 A+1로
          setIndexB(indexA + 1)
        }
        // 다음 사이클 예약
        timeoutRef.current = window.setTimeout(schedule, holdMs)
      }, fadeMs)
    }

    timeoutRef.current = window.setTimeout(schedule, holdMs)

    return () => clearTimer()
  }, [canAutoFade, length, holdMs, fadeMs, showA, indexA, indexB])

  return (
    <section className="flex overflow-hidden relative justify-center items-center h-screen">
      <div className="overflow-hidden absolute inset-0">
        {/* 레이어 A */}
        <div
          className={`absolute inset-0 bg-center bg-cover bg-no-repeat transition-opacity duration-900 ease-in-out ${
            showA ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: `url(${imageA})` }}
        />
        {/* 레이어 B */}
        <div
          className={`absolute inset-0 bg-center bg-cover bg-no-repeat transition-opacity duration-900 ease-in-out ${
            showA ? "opacity-0" : "opacity-100"
          }`}
          style={{ backgroundImage: `url(${imageB})` }}
        />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      <div className="relative z-10 px-6 text-center">
        <p className="text-primary-foreground/80 text-sm tracking-[0.3em] uppercase mb-4">Photography Studio</p>
        <h1 className="text-4xl font-light tracking-tight md:text-6xl lg:text-7xl text-primary-foreground text-balance">
          당신의 소중한 순간을
          <br />
          빛으로 담습니다
        </h1>
        <a
          href="#portfolio"
          className="inline-block px-8 py-3 mt-10 text-sm tracking-wide border transition-all border-primary-foreground/50 text-primary-foreground hover:bg-primary-foreground hover:text-foreground"
        >
          포트폴리오 보기
        </a>
      </div>
    </section>
  )
}