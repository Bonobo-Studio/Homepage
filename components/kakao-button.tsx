"use client"

import { MessageCircle } from "lucide-react"

export function KakaoButton() {
  const handleKakaoClick = () => {
    // 카카오톡 채널 또는 오픈채팅 링크로 이동
    // 실제 사용시 본인의 카카오톡 채널 URL로 변경해주세요
    window.open("https://pf.kakao.com/_xYourChannelId", "_blank")
  }

  return (
    <button
      onClick={handleKakaoClick}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#FEE500] hover:bg-[#FDD835] rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110"
      aria-label="카카오톡 문의"
    >
      <MessageCircle className="w-7 h-7 text-[#3C1E1E]" fill="#3C1E1E" />
    </button>
  )
}
