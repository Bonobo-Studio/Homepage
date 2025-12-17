import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { KakaoButton } from "@/components/kakao-button"
import { Car, MapPin, Clock, Users, Star, CheckCircle, Utensils, Camera } from "lucide-react"
import Link from "next/link"

// 투어 패키지 정보
const packages = [
  {
    name: "반나절 투어",
    price: "180,000",
    duration: "4시간",
    people: "1-4명",
    features: [
      "주요 명소 2-3곳 방문",
      "전용 차량 이동",
      "한국어 가이드",
      "맛집 추천 & 예약 대행",
      "스냅 촬영 10장 포함",
    ],
    popular: false,
  },
  {
    name: "종일 투어",
    price: "300,000",
    duration: "8시간",
    people: "1-4명",
    features: [
      "주요 명소 4-5곳 방문",
      "전용 차량 이동",
      "한국어 가이드",
      "점심 식사 포함",
      "맛집 추천 & 예약 대행",
      "스냅 촬영 30장 포함",
    ],
    popular: true,
  },
  {
    name: "맞춤 투어",
    price: "협의",
    duration: "자유",
    people: "1-8명",
    features: [
      "원하는 일정으로 구성",
      "전용 차량 이동",
      "한국어 가이드",
      "식사 포함 가능",
      "숙소 픽업/드랍",
      "스냅 촬영 옵션 추가 가능",
      "큐슈 전역 이동 가능",
    ],
    popular: false,
  },
]

// 인기 투어 코스
const tourCourses = [
  {
    name: "후쿠오카 시티 투어",
    duration: "반나절",
    spots: ["텐진", "캐널시티", "오호리 공원", "후쿠오카 타워"],
    description: "후쿠오카의 핵심 명소를 효율적으로 둘러보는 코스",
  },
  {
    name: "다자이후 & 야나가와",
    duration: "종일",
    spots: ["다자이후 텐만구", "스타벅스 다자이후점", "야나가와 뱃놀이", "장어 맛집"],
    description: "일본 전통과 자연을 만끽하는 인기 코스",
  },
  {
    name: "이토시마 힐링",
    duration: "종일",
    spots: ["사쿠라이 후타미가우라", "런던버스 카페", "야자수 비치", "선셋 스팟"],
    description: "에메랄드빛 바다와 감성 카페를 즐기는 힐링 코스",
  },
  {
    name: "유후인 당일치기",
    duration: "종일",
    spots: ["유후인 호수", "유노츠보 거리", "온천 체험", "고로게 맛집"],
    description: "규슈의 대표 온천 마을에서의 특별한 하루",
  },
]

// 투어 특징
const features = [
  {
    icon: Car,
    title: "프라이빗 차량",
    description: "편안한 전용 차량으로 이동하며, 대중교통 걱정 없이 여행을 즐기세요.",
  },
  {
    icon: Users,
    title: "소수 정예 투어",
    description: "1-8명의 소규모 그룹으로 프라이빗하고 편안한 여행을 제공합니다.",
  },
  {
    icon: MapPin,
    title: "로컬 전문가",
    description: "후쿠오카 거주 10년차 가이드가 숨겨진 명소까지 안내해 드립니다.",
  },
  {
    icon: Utensils,
    title: "맛집 큐레이션",
    description: "현지인만 아는 진짜 맛집을 추천하고 예약까지 대행해 드립니다.",
  },
  {
    icon: Camera,
    title: "스냅 촬영 포함",
    description: "투어 중 자연스러운 순간을 전문 촬영으로 남겨드립니다.",
  },
  {
    icon: Star,
    title: "맞춤형 일정",
    description: "고객님의 관심사와 체력에 맞춘 최적의 코스를 구성합니다.",
  },
]

export default function PrivateTourPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      {/* 히어로 섹션 */}
      <section className="relative flex items-center justify-center h-screen">
        <div className="absolute inset-0 bg-linear-to-b from-emerald-50 to-sky-50" />
        <div className="absolute inset-0 bg-[url('/images/tour-hero.jpg')] bg-cover bg-center opacity-30" />
        <div className="relative z-10 px-6 text-center max-w-4xl mx-auto">
          <p className="text-emerald-600/80 text-sm tracking-[0.3em] uppercase mb-4">
            Fukuoka Private Tour
          </p>
          <h1 className="text-4xl font-light tracking-tight md:text-6xl lg:text-7xl text-foreground mb-6">
            당신만을 위한
            <br />
            <span className="text-emerald-600">프라이빗 투어</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            복잡한 대중교통, 언어 장벽 걱정 없이
            후쿠오카를 가장 편하고 알차게 즐기는 방법
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#packages"
              className="inline-block px-8 py-3 text-sm tracking-wide bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
            >
              투어 패키지 보기
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

      {/* 왜 프라이빗 투어인가 */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm tracking-[0.2em] text-emerald-600 uppercase mb-3">Why Private Tour</p>
            <h2 className="text-3xl md:text-4xl font-light text-foreground">
              프라이빗 투어가 특별한 이유
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="text-center p-6">
                <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center bg-emerald-50 rounded-full">
                  <feature.icon className="w-7 h-7 text-emerald-600" />
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

      {/* 인기 투어 코스 */}
      <section className="py-24 px-6 bg-emerald-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm tracking-[0.2em] text-emerald-600 uppercase mb-3">Popular Courses</p>
            <h2 className="text-3xl md:text-4xl font-light text-foreground">인기 투어 코스</h2>
            <p className="text-muted-foreground mt-4">
              가장 인기 있는 코스를 소개합니다. 맞춤 코스도 가능해요!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {tourCourses.map((course) => (
              <div key={course.name} className="bg-background p-8">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-medium text-foreground">{course.name}</h3>
                  <span className="text-sm text-emerald-600 bg-emerald-100 px-3 py-1">
                    {course.duration}
                  </span>
                </div>
                <p className="text-muted-foreground text-sm mb-4">{course.description}</p>
                <div className="flex flex-wrap gap-2">
                  {course.spots.map((spot) => (
                    <span
                      key={spot}
                      className="text-xs text-muted-foreground bg-secondary px-3 py-1"
                    >
                      {spot}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 가격 패키지 */}
      <section id="packages" className="py-24 px-6 bg-secondary">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm tracking-[0.2em] text-emerald-600 uppercase mb-3">Packages</p>
            <h2 className="text-3xl md:text-4xl font-light text-foreground">투어 패키지</h2>
            <p className="text-muted-foreground mt-4">
              원하시는 일정과 예산에 맞는 패키지를 선택하세요
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <div
                key={pkg.name}
                className={`relative bg-background p-8 flex flex-col ${
                  pkg.popular ? "ring-2 ring-emerald-600" : ""
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-600 text-white text-xs px-4 py-1 tracking-wide">
                    인기
                  </div>
                )}
                <div className="text-center mb-6">
                  <h3 className="text-xl font-medium text-foreground mb-2">{pkg.name}</h3>
                  <div className="flex items-baseline justify-center gap-1">
                    {pkg.price === "협의" ? (
                      <span className="text-2xl font-light text-foreground">가격 협의</span>
                    ) : (
                      <span className="text-3xl font-light text-foreground">₩{pkg.price}</span>
                    )}
                  </div>
                </div>
                
                <div className="flex justify-center gap-6 mb-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{pkg.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{pkg.people}</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className={`block w-full py-3 text-center text-sm tracking-wide transition-colors ${
                    pkg.popular
                      ? "bg-emerald-600 text-white hover:bg-emerald-700"
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

      {/* 투어 포함 사항 */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm tracking-[0.2em] text-emerald-600 uppercase mb-3">Included</p>
            <h2 className="text-3xl md:text-4xl font-light text-foreground">투어 포함 사항</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* 포함 사항 */}
            <div>
              <h3 className="text-lg font-medium text-foreground mb-6 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
                포함 사항
              </h3>
              <ul className="space-y-4">
                {[
                  "전용 차량 및 유류비",
                  "한국어 가이드",
                  "입장료 (기본 명소)",
                  "스냅 촬영 (패키지별 상이)",
                  "음료 및 간식",
                  "여행자 보험",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-muted-foreground">
                    <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* 불포함 사항 */}
            <div>
              <h3 className="text-lg font-medium text-foreground mb-6 flex items-center gap-2">
                <span className="w-5 h-5 flex items-center justify-center text-rose-600">✕</span>
                불포함 사항
              </h3>
              <ul className="space-y-4">
                {[
                  "식사비 (종일 투어 제외)",
                  "개인 쇼핑비",
                  "특별 체험 프로그램 비용",
                  "숙소 비용",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-muted-foreground">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 투어 진행 과정 */}
      <section className="py-24 px-6 bg-emerald-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm tracking-[0.2em] text-emerald-600 uppercase mb-3">Process</p>
            <h2 className="text-3xl md:text-4xl font-light text-foreground">투어 진행 과정</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "상담", desc: "카카오톡으로 원하시는 날짜와 코스를 상담합니다." },
              { step: "02", title: "코스 확정", desc: "맞춤 코스를 구성하고 예약금 입금 후 확정합니다." },
              { step: "03", title: "투어 진행", desc: "당일 숙소 픽업 후 편안한 투어를 시작합니다." },
              { step: "04", title: "사진 전달", desc: "투어 중 촬영한 사진을 보정하여 전달해 드립니다." },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="text-4xl font-light text-emerald-300 mb-4">{item.step}</div>
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
            후쿠오카 여행,
            <br />
            프라이빗하게 즐기세요
          </h2>
          <p className="text-background/70 mb-10 max-w-2xl mx-auto">
            카카오톡으로 편하게 문의해 주세요. 
            원하시는 날짜, 인원, 관심 코스 등 상세한 상담을 도와드립니다.
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
