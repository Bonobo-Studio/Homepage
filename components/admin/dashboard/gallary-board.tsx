import { Card } from "@/components/ui/card"
import { Trash2 } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export interface PortfolioItem {
    id: number
    category: string
    title: string
    image: string
}

export function GallaryBoard({items}: {items: PortfolioItem[]}) {
    const categories = [
        { id: "wedding", name: "웨딩" },
        { id: "profile", name: "프로필" },
        { id: "family", name: "가족사진" },
        { id: "snap", name: "스냅" },
      ]

    return (
        <div className="space-y-4">
            <h2 className="text-lg font-light">현재 갤러리 ({items.length}개)</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map((item) => (
                    <Card key={item.id} className="overflow-hidden">
                        <div className="aspect-[3/4] relative">
                            <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                        </div>
                        <div className="p-4">
                            <div className="flex items-start justify-between mb-2">
                                <div>
                                    <h3 className="font-medium text-foreground">{item.title}</h3>
                                    <p className="text-sm text-muted-foreground">
                                        {categories.find((c) => c.id === item.category)?.name}
                                    </p>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-destructive hover:text-destructive"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    )
}