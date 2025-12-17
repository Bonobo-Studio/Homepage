import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

const siteUrl = "https://bonobostudio.co.kr/"
const siteName = "Bonobo Studio"

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#121212" },
  ],
}

export const metadata: Metadata = {
  // 기본 메타 정보
  title: {
    default: "Bonobo Studio | 후쿠오카 스냅촬영 & 프라이빗 투어",
    template: "%s | Bonobo Studio",
  },
  description:
    "후쿠오카 전문 스냅촬영과 프라이빗 투어 서비스. 10년차 현지 전문가가 당신의 특별한 순간을 감성적으로 담아드립니다. 오호리공원, 다자이후, 이토시마 등 인기 촬영지.",
  keywords: [
    "후쿠오카 스냅",
    "후쿠오카 스냅촬영",
    "후쿠오카 프라이빗 투어",
    "후쿠오카 여행 사진",
    "일본 스냅촬영",
    "후쿠오카 가족사진",
    "후쿠오카 커플스냅",
    "다자이후 스냅",
    "이토시마 스냅",
    "유후인 투어",
    "보노보 스튜디오",
    "Fukuoka snap photography",
    "Fukuoka private tour",
  ],
  authors: [{ name: "Bonobo Studio" }],
  creator: "Bonobo Studio",
  publisher: "Bonobo Studio",

  // Canonical URL
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
    languages: {
      "ko-KR": "/",
    },
  },

  // Open Graph (Facebook, KakaoTalk 등 소셜 공유용)
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: siteUrl,
    siteName: siteName,
    title: "Bonobo Studio | 후쿠오카 스냅촬영 & 프라이빗 투어",
    description:
      "후쿠오카 전문 스냅촬영과 프라이빗 투어. 10년차 현지 전문가가 당신의 특별한 순간을 담아드립니다.",
    images: [
      {
        url: "/og-image.jpg", // 1200x630 크기 권장
        width: 1200,
        height: 630,
        alt: "Bonobo Studio - 후쿠오카 스냅촬영",
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "Bonobo Studio | 후쿠오카 스냅촬영 & 프라이빗 투어",
    description:
      "후쿠오카 전문 스냅촬영과 프라이빗 투어. 10년차 현지 전문가가 당신의 특별한 순간을 담아드립니다.",
    images: ["/og-image.jpg"],
  },

  // 아이콘 설정
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },

  // 로봇 설정
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // 추가 메타 태그
  other: {
    "naver-site-verification": "2fa8431181a83c1f574d06a89d3e0dba33a375be", // 네이버 서치어드바이저 인증 코드
    "google-site-verification": "vnzg5pmlEWxcnUaJMDA7EUM4SfTTxsesN3ZQeHbozKo", // 구글 서치콘솔 인증 코드
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
