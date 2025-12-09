import { MapPin, Phone, Clock } from "lucide-react"

export function Contact() {
  return (
    <section id="contact" className="py-24 px-6 bg-secondary">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm tracking-[0.2em] text-muted-foreground uppercase mb-3">Contact</p>
          <h2 className="text-3xl md:text-4xl font-light text-foreground">문의 및 예약</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-background p-8 text-center">
            <MapPin className="w-6 h-6 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-medium text-foreground mb-2">위치</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
            Japan. Fukuoka
            </p>
          </div>

          <div className="bg-background p-8 text-center">
            <Phone className="w-6 h-6 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-medium text-foreground mb-2">연락처</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              KR: 010-3837-0919
              <br />
              JP: 090-2852-9477
            </p>
          </div>

          <div className="bg-background p-8 text-center">
            <Clock className="w-6 h-6 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-medium text-foreground mb-2">운영시간</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              평일: 10:00 - 19:00
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-6">촬영 문의 및 상담은 카카오톡으로 편하게 연락주세요</p>
        </div>
      </div>
    </section>
  )
}
