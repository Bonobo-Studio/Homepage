"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Trash2, Plus, LogOut, Upload, X } from "lucide-react"

interface PortfolioItem {
  id: number
  category: string
  title: string
  image: string
}

const categories = [
  { id: "wedding", name: "웨딩" },
  { id: "profile", name: "프로필" },
  { id: "family", name: "가족사진" },
  { id: "snap", name: "스냅" },
]

export default function AdminDashboard() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [items, setItems] = useState<PortfolioItem[]>([])
  const [newItem, setNewItem] = useState({
    title: "",
    category: "wedding",
    image: "",
  })
  const [isAdding, setIsAdding] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string>("")
  const [isDragging, setIsDragging] = useState(false)

  useEffect(() => {
    // Check authentication
    if (localStorage.getItem("adminAuth") !== "true") {
      router.push("/admin")
      return
    }

    // Load portfolio items
    const stored = localStorage.getItem("portfolioItems")
    if (stored) {
      setItems(JSON.parse(stored))
    } else {
      // Initialize with default items
      const defaultItems = [
        {
          id: 1,
          category: "wedding",
          title: "봄날의 웨딩",
          image: "/elegant-wedding-couple-in-garden-with-soft-natural.jpg",
        },
        {
          id: 2,
          category: "profile",
          title: "비즈니스 프로필",
          image: "/professional-business-portrait-in-studio-with-clea.jpg",
        },
        {
          id: 3,
          category: "family",
          title: "가족의 행복",
          image: "/happy-family-portrait-in-natural-outdoor-setting.jpg",
        },
        {
          id: 4,
          category: "snap",
          title: "일상의 순간",
          image: "/candid-street-photography-portrait-with-bokeh-back.jpg",
        },
        {
          id: 5,
          category: "wedding",
          title: "로맨틱 웨딩",
          image: "/romantic-wedding-couple-sunset-silhouette.jpg",
        },
        {
          id: 6,
          category: "profile",
          title: "아티스트 프로필",
          image: "/artistic-portrait-with-dramatic-lighting.jpg",
        },
        {
          id: 7,
          category: "family",
          title: "세대를 잇는",
          image: "/multigenerational-family-portrait-warm-tones.jpg",
        },
        {
          id: 8,
          category: "snap",
          title: "여행 스냅",
          image: "/travel-photography-portrait-scenic-destination.jpg",
        },
      ]
      setItems(defaultItems)
      localStorage.setItem("portfolioItems", JSON.stringify(defaultItems))
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("adminAuth")
    router.push("/admin")
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      processFile(file)
    }
  }

  const processFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("이미지 파일만 업로드 가능합니다")
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      const base64 = e.target?.result as string
      setPreviewUrl(base64)
      setNewItem({ ...newItem, image: base64 })
    }
    reader.readAsDataURL(file)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file) {
      processFile(file)
    }
  }

  const handleRemoveImage = () => {
    setPreviewUrl("")
    setNewItem({ ...newItem, image: "" })
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleAddItem = () => {
    if (!newItem.title || !newItem.image) {
      alert("제목과 이미지를 모두 입력해주세요")
      return
    }

    const newId = Math.max(...items.map((i) => i.id), 0) + 1
    const updatedItems = [...items, { ...newItem, id: newId }]
    setItems(updatedItems)
    localStorage.setItem("portfolioItems", JSON.stringify(updatedItems))

    // Reset form
    setNewItem({ title: "", category: "wedding", image: "" })
    setPreviewUrl("")
    setIsAdding(false)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleDeleteItem = (id: number) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      const updatedItems = items.filter((item) => item.id !== id)
      setItems(updatedItems)
      localStorage.setItem("portfolioItems", JSON.stringify(updatedItems))
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-light">갤러리 관리</h1>
          <Button variant="outline" onClick={handleLogout} size="sm">
            <LogOut className="w-4 h-4 mr-2" />
            로그아웃
          </Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Add New Item Section */}
        <Card className="p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-light">새 이미지 추가</h2>
            <Button onClick={() => setIsAdding(!isAdding)} size="sm" variant="outline">
              {isAdding ? (
                "취소"
              ) : (
                <>
                  <Plus className="w-4 h-4 mr-2" />
                  추가하기
                </>
              )}
            </Button>
          </div>

          {isAdding && (
            <div className="space-y-4 border-t border-border pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">제목</Label>
                  <Input
                    id="title"
                    value={newItem.title}
                    onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                    placeholder="작품 제목"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">카테고리</Label>
                  <select
                    id="category"
                    value={newItem.category}
                    onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                    className="w-full h-10 px-3 border border-input bg-background text-foreground rounded-md"
                  >
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>이미지 업로드</Label>
                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />

                {previewUrl ? (
                  <div className="relative w-full max-w-xs">
                    <div className="aspect-[3/4] relative rounded-lg overflow-hidden border border-border">
                      <Image src={previewUrl || "/placeholder.svg"} alt="미리보기" fill className="object-cover" />
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={handleRemoveImage}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`
                      border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
                      transition-colors duration-200
                      ${
                        isDragging
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50 hover:bg-muted/50"
                      }
                    `}
                  >
                    <Upload className="w-10 h-10 mx-auto mb-3 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mb-1">클릭하거나 이미지를 드래그하여 업로드</p>
                    <p className="text-xs text-muted-foreground">JPG, PNG, GIF 파일 지원</p>
                  </div>
                )}
              </div>

              <Button onClick={handleAddItem} disabled={!newItem.title || !newItem.image}>
                저장
              </Button>
            </div>
          )}
        </Card>

        {/* Gallery Items */}
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
                      onClick={() => handleDeleteItem(item.id)}
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
      </div>
    </div>
  )
}
