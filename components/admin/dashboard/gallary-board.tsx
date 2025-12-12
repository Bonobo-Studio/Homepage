"use client"

import { Card } from "@/components/ui/card"
import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export interface PhotoItem {
    id: number
    url: string
}

export function GallaryBoard({ refreshKey }: { refreshKey: number }) {
    const [items, setItems] = useState<PhotoItem[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [deletingIds, setDeletingIds] = useState<Set<number>>(new Set())

    // API Route를 통해 데이터 가져오기
    async function loadItems() {
        try {
            setIsLoading(true)
            setError(null)

            const response = await fetch("/admin/dashboard/gallery")

            if (!response.ok) {
                throw new Error("데이터를 불러오는데 실패했습니다")
            }

            const { items: fetchedItems } = await response.json()
            setItems(fetchedItems || [])
        } catch (err) {
            setError(err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다")
            console.error("갤러리 로드 오류:", err)
        } finally {
            setIsLoading(false)
        }
    }

    async function handleDelete(id: number) {
        // 삭제 확인
        if (!confirm("정말 이 이미지를 삭제하시겠습니까?")) {
            return
        }

        try {
            // 삭제 중 상태 추가
            setDeletingIds(prev => new Set(prev).add(id))

            const response = await fetch(`/admin/dashboard/gallery/${id}`, {
                method: "DELETE",
            })

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}))
                throw new Error(errorData.error || "삭제에 실패했습니다")
            }

            // 삭제 성공 후 갤러리 새로고침
            await loadItems()
        } catch (err) {
            alert(err instanceof Error ? err.message : "삭제 중 오류가 발생했습니다")
            console.error("삭제 오류:", err)
        } finally {
            // 삭제 중 상태 제거
            setDeletingIds(prev => {
                const newSet = new Set(prev)
                newSet.delete(id)
                return newSet
            })
        }
    }

    useEffect(() => {
        loadItems()
    }, [refreshKey])

    if (isLoading) {
        return (
            <div className="space-y-4">
                <h2 className="text-lg font-light">현재 갤러리 (로딩 중...)</h2>
                <div className="py-8 text-center text-muted-foreground">
                    데이터를 불러오는 중...
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="space-y-4">
                <h2 className="text-lg font-light">현재 갤러리</h2>
                <div className="py-8 text-center text-destructive">
                    {error}
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-4">
            <h2 className="text-lg font-light">현재 갤러리 ({items.length}개)</h2>

            {items.length === 0 ? (
                <div className="py-8 text-center text-muted-foreground">
                    등록된 이미지가 없습니다
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {items.map((item) => {
                        const isDeleting = deletingIds.has(item.id)

                        return (
                            <Card key={item.id} className="overflow-hidden">
                                <div className="aspect-[3/4] relative">
                                    <img
                                        src={item.url || "/placeholder.svg"}
                                        className="object-cover w-full h-full"
                                    />
                                </div>
                                <div className="p-4">
                                    <div className="flex justify-between items-start mb-2">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="text-destructive hover:text-destructive"
                                            onClick={() => handleDelete(item.id)}
                                            disabled={isDeleting}
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        )
                    })}
                </div>
            )}
        </div>
    )
}