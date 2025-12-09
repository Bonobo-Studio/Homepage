export function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/elegant-photography-studio-interior-with-soft-natu.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-foreground/40" />
      </div>

      <div className="relative z-10 text-center px-6">
        <p className="text-primary-foreground/80 text-sm tracking-[0.3em] uppercase mb-4">Photography Studio</p>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-primary-foreground tracking-tight text-balance">
          당신의 소중한 순간을
          <br />
          빛으로 담습니다
        </h1>
        <p className="mt-6 text-primary-foreground/70 text-lg max-w-xl mx-auto text-pretty">
          10년의 경력으로 완성하는 감성적인 사진
        </p>
        <a
          href="#portfolio"
          className="inline-block mt-10 px-8 py-3 border border-primary-foreground/50 text-primary-foreground text-sm tracking-wide hover:bg-primary-foreground hover:text-foreground transition-all"
        >
          포트폴리오 보기
        </a>
      </div>
    </section>
  )
}
