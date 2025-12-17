import type { MetadataRoute } from "next"

const siteUrl = "https://bonobostudio.co.kr/"

export default function sitemap(): MetadataRoute.Sitemap {
  // 현재 날짜를 마지막 수정일로 사용
  const lastModified = new Date()

  return [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/services/snap-photography`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/services/private-tour`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ]
}
