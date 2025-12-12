import Image from 'next/image'

export function About() {
  return (
    <section id="about" className="px-6 py-24 bg-background">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 items-center md:grid-cols-2">
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image src="/images/bonobostudio_about 01.jpg" alt="about" fill className="object-cover" />
          </div>

          <div className="space-y-6">
            <p className="text-sm tracking-[0.2em] text-muted-foreground uppercase">About Studio</p>
            <h2 className="text-3xl font-light md:text-4xl text-foreground text-balance">
              빛과 감성으로 완성하는
              <br />
              특별한 순간
            </h2>
            <div className="space-y-4 leading-relaxed text-muted-foreground">
              <p>
                보노보 스튜디오는는 수많은 고객들의 소중한 순간을 담아왔습니다. 웨딩, 프로필, 가족사진, 스냅 등
                다양한 분야에서 전문적인 촬영 서비스를 제공합니다.
              </p>
              <p>
                자연광을 활용한 따뜻하고 감성적인 사진부터, 스튜디오 조명을 활용한 세련된 프로필 사진까지, 고객의 니즈에
                맞는 최상의 결과물을 약속드립니다.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-border">
              <div>
                <p className="text-3xl font-light text-foreground">10+</p>
                <p className="mt-1 text-sm text-muted-foreground">년의 경력</p>
              </div>
              <div>
                <p className="text-3xl font-light text-foreground">5000+</p>
                <p className="mt-1 text-sm text-muted-foreground">촬영 건수</p>
              </div>
              <div>
                <p className="text-3xl font-light text-foreground">99%</p>
                <p className="mt-1 text-sm text-muted-foreground">고객 만족도</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
