import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Portfolio } from "@/components/portfolio"
import { About } from "@/components/about"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { KakaoButton } from "@/components/kakao-button"
import { supabaseServer } from "@/lib/supabaseServer"

async function getHeroItems() {
  const bucketName = process.env.STORAGE_BUCKET!
  const targetFolder = "home"

  const { data: fileList, error: listError } = await supabaseServer.storage
    .from(bucketName)
    .list(targetFolder, {
      limit: 10,
      sortBy: { column: "name", order: "asc" }
    })

  if (listError || !fileList) {
    console.error("[home] error:", listError?.message)
    return []
  }

  // 각 파일의 public URL 생성
  const heroItems = fileList
    .map((file) => {
      const filePath = targetFolder ? `${targetFolder}/${file.name}` : file.name
      const { data: publicUrlData } = supabaseServer.storage
        .from(bucketName)
        .getPublicUrl(filePath, {
          transform: {
            width: 1920,
            height: 1080,
            resize: "cover",
          }
        })

      return { image: publicUrlData.publicUrl }
    })
    .filter((item): item is { image: string } => item !== null)

  return heroItems
}

export default async function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero heroItems={getHeroItems()} />
      <Portfolio />
      <About />
      <Contact />
      <Footer />
      <KakaoButton />
    </main>
  )
}
