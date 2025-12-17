import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { KakaoButton } from "@/components/kakao-button"
import { Camera, MapPin, Clock, Heart, Star, CheckCircle, Image } from "lucide-react"
import Link from "next/link"

// 페이지별 SEO 메타데이터
export const metadata: Metadata = {
  title: "후쿠오카 스냅촬영",
  description:
    "후쿠오카 전문 스냅촬영 서비스. 오호리공원, 다자이후, 이토시마 등 인기 촬영지에서 자연스럽고 감성적인 순간을 담아드립니다. 커플스냅, 가족사진, 우정스냅 전문.",
  keywords: [
    "후쿠오카 스냅",
    "후쿠오카 스냅촬영",
    "후쿠오카 커플스냅",
    "후쿠오카 가족사진",
    "다자이후 스냅",
    "이토시마 스냅",
    "오호리공원 스냅",
    "일본 스냅촬영",
  ],
  openGraph: {
    title: "후쿠오카 스냅촬영 | Bonobo Studio",
    description:
      "후쿠오카 전문 스냅촬영. 인기 촬영지에서 자연스럽고 감성적인 순간을 담아드립니다.",
    images: ["/og-snap.jpg"],
  },
}

// 촬영 패키지 정보
const packages = [
  {
    name: "베이직",
    price: "150,000",
    duration: "1시간",
    photos: "30장",
    features: [
      "1개 촬영 장소",
      "기본 보정 포함",
      "원본 파일 제공",
      "촬영 후 3일 내 전달",
    ],
    popular: false,
  },
  {
    name: "스탠다드",
    price: "250,000",
    duration: "2시간",
    photos: "60장",
    features: [
      "2개 촬영 장소",
      "고급 보정 포함",
      "원본 + 보정본 제공",
      "촬영 후 5일 내 전달",
      "의상 1벌 무료 대여",
    ],
    popular: true,
  },
  {
    name: "프리미엄",
    price: "400,000",
    duration: "4시간",
    photos: "100장+",
    features: [
      "3개 이상 촬영 장소",
      "프리미엄 보정 포함",
      "원본 + 보정본 제공",
      "촬영 후 7일 내 전달",
      "의상 2벌 무료 대여",
      "전용 차량 이동",
    ],
    popular: false,
  },
]

// 인기 촬영 장소
const locations = [
  {
    name: "오호리 공원",
    description: "도심 속 자연과 호수가 어우러진 로맨틱한 장소",
    image: "/images/locations/ohori.jpg",
  },
  {
    name: "다자이후 텐만구",
    description: "전통과 현대가 공존하는 유명 신사",
    image: "/images/locations/dazaifu.jpg",
  },
  {
    name: "모모치 해변",
    description: "후쿠오카 타워와 함께하는 해변 스냅",
    image: "/images/locations/momochi.jpg",
  },
  {
    name: "야나가와 뱃놀이",
    description: "일본 전통 뱃놀이와 함께하는 특별한 촬영",
    image: "/images/locations/yanagawa.jpg",
  },
  {
    name: "이토시마",
    description: "에메랄드빛 바다와 감성적인 카페 거리",
    image: "/images/locations/itoshima.jpg",
  },
  {
    name: "텐진 거리",
    description: "도심의 활기와 트렌디한 배경",
    image: "/images/locations/tenjin.jpg",
  },
]

// 서비스 특징
const features = [
  {
    icon: Camera,
    title: "전문 촬영 장비",
    description: "최신 미러리스 카메라와 다양한 렌즈로 최고의 화질을 보장합니다.",
  },
  {
    icon: Heart,
    title: "자연스러운 연출",
    description: "딱딱한 포즈가 아닌, 자연스러운 순간을 담아드립니다.",
  },
  {
    icon: MapPin,
    title: "현지 로케이션 전문",
    description: "후쿠오카 거주 10년차, 숨겨진 명소까지 안내해 드립니다.",
  },
  {
    icon: Star,
    title: "맞춤형 촬영",
    description: "고객님의 취향과 스타일에 맞춘 1:1 맞춤 촬영을 제공합니다.",
  },
]

export default function SnapPhotographyPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      {/* 히어로 섹션 */}
      <section className="relative flex items-center justify-center h-screen">
        <div className="absolute inset-0 bg-linear-to-b from-rose-50 to-amber-50" />
        <div className="absolute inset-0 bg-[url('/images/snap-hero.jpg')] bg-cover bg-center opacity-30" />
        <div className="relative z-10 px-6 text-center max-w-4xl mx-auto">
          <p className="text-rose-600/80 text-sm tracking-[0.3em] uppercase mb-4">
            Fukuoka Snap Photography
          </p>
          <h1 className="text-4xl font-light tracking-tight md:text-6xl lg:text-7xl text-foreground mb-6">
            후쿠오카에서의
            <br />
            <span className="text-rose-600">특별한 순간</span>을 담다
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            일본 후쿠오카의 아름다운 명소에서 당신만의 특별한 추억을 
            전문 포토그래퍼가 감성적으로 담아드립니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#packages"
              className="inline-block px-8 py-3 text-sm tracking-wide bg-rose-600 text-white hover:bg-rose-700 transition-colors"
            >
              패키지 보기
            </a>
            <a
              href="#contact"
              className="inline-block px-8 py-3 text-sm tracking-wide border border-foreground/30 text-foreground hover:bg-foreground hover:text-background transition-colors"
            >
              문의하기
            </a>
          </div>
        </div>
      </section>

      {/* 서비스 특징 */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm tracking-[0.2em] text-rose-600 uppercase mb-3">Why Choose Us</p>
            <h2 className="text-3xl md:text-4xl font-light text-foreground">
              보노보 스튜디오만의 특별함
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="text-center p-6">
                <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center bg-rose-50 rounded-full">
                  <feature.icon className="w-7 h-7 text-rose-600" />
                </div>
                <h3 className="text-lg font-medium text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 가격 패키지 */}
      <section id="packages" className="py-24 px-6 bg-secondary">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm tracking-[0.2em] text-rose-600 uppercase mb-3">Packages</p>
            <h2 className="text-3xl md:text-4xl font-light text-foreground">촬영 패키지</h2>
            <p className="text-muted-foreground mt-4">
              원하시는 스타일과 예산에 맞는 패키지를 선택하세요
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <div
                key={pkg.name}
                className={`relative bg-background p-8 flex flex-col ${
                  pkg.popular ? "ring-2 ring-rose-600" : ""
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-rose-600 text-white text-xs px-4 py-1 tracking-wide">
                    인기
                  </div>
                )}
                <div className="text-center mb-6">
                  <h3 className="text-xl font-medium text-foreground mb-2">{pkg.name}</h3>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-3xl font-light text-foreground">₩{pkg.price}</span>
                  </div>
                </div>
                
                <div className="flex justify-center gap-6 mb-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{pkg.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Image className="w-4 h-4" />
                    <span>{pkg.photos}</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-rose-600 mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className={`block w-full py-3 text-center text-sm tracking-wide transition-colors ${
                    pkg.popular
                      ? "bg-rose-600 text-white hover:bg-rose-700"
                      : "border border-foreground/30 text-foreground hover:bg-foreground hover:text-background"
                  }`}
                >
                  예약 문의
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 촬영 장소 */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm tracking-[0.2em] text-rose-600 uppercase mb-3">Locations</p>
            <h2 className="text-3xl md:text-4xl font-light text-foreground">인기 촬영 장소</h2>
            <p className="text-muted-foreground mt-4">
              후쿠오카의 아름다운 명소에서 특별한 순간을 담아보세요
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {locations.map((location) => (
              <div key={location.name} className="group relative overflow-hidden aspect-4/3 bg-secondary">
                {/* 실제 이미지가 없을 경우 플레이스홀더 */}
                <div className="absolute inset-0 bg-linear-to-br from-rose-100 to-amber-100 flex items-center justify-center">
                  <MapPin className="w-12 h-12 text-rose-300" />
                </div>
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-lg font-medium text-white mb-1">{location.name}</h3>
                  <p className="text-white/80 text-sm">{location.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 촬영 진행 과정 */}
      <section className="py-24 px-6 bg-rose-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm tracking-[0.2em] text-rose-600 uppercase mb-3">Process</p>
            <h2 className="text-3xl md:text-4xl font-light text-foreground">촬영 진행 과정</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "상담", desc: "카카오톡으로 원하시는 날짜와 스타일을 상담합니다." },
              { step: "02", title: "예약", desc: "패키지 선택 후 예약금 입금으로 일정을 확정합니다." },
              { step: "03", title: "촬영", desc: "당일 약속 장소에서 만나 편안하게 촬영을 진행합니다." },
              { step: "04", title: "전달", desc: "보정 완료 후 고화질 파일로 전달해 드립니다." },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="text-4xl font-light text-rose-300 mb-4">{item.step}</div>
                <h3 className="text-lg font-medium text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section id="contact" className="py-24 px-6 bg-foreground text-background">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-light mb-6">
            후쿠오카에서의 특별한 순간,
            <br />
            지금 예약하세요
          </h2>
          <p className="text-background/70 mb-10 max-w-2xl mx-auto">
            카카오톡으로 편하게 문의해 주세요. 
            원하시는 날짜, 장소, 스타일 등 상세한 상담을 도와드립니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://pf.kakao.com/_your_kakao_channel"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-yellow-400 text-black text-sm tracking-wide hover:bg-yellow-300 transition-colors"
            >
              카카오톡 문의하기
            </a>
            <Link
              href="/"
              className="inline-block px-8 py-3 text-sm tracking-wide border border-background/30 text-background hover:bg-background hover:text-foreground transition-colors"
            >
              홈으로 돌아가기
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <KakaoButton />
    </main>
  )
}
