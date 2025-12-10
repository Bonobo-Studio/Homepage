import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Upload, X } from "lucide-react"
import { useRef, useState } from "react"

export default function UploadBoard() {
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [isAdding, setIsAdding] = useState(false)
    const [previewUrl, setPreviewUrl] = useState<string>("")
    const [isDragging, setIsDragging] = useState(false)

    const categories = [
        { id: "wedding", name: "웨딩" },
        { id: "profile", name: "프로필" },
        { id: "family", name: "가족사진" },
        { id: "snap", name: "스냅" },
    ]

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            processFile(file)
        }
    }

    const handleAddItem = () => {
        // if (!newItem.title || !newItem.image) {
        //   alert("제목과 이미지를 모두 입력해주세요")
        //   return
        // }

        // const newId = Math.max(...items.map((i) => i.id), 0) + 1
        // const updatedItems = [...items, { ...newItem, id: newId }]
        // setItems(updatedItems)
        // localStorage.setItem("portfolioItems", JSON.stringify(updatedItems))

        // // Reset form
        // setNewItem({ title: "", category: "wedding", image: "" })
        // setPreviewUrl("")
        // setIsAdding(false)
        // if (fileInputRef.current) {
        //   fileInputRef.current.value = ""
        // }
    }

    const handleRemoveImage = () => {
        setPreviewUrl("")
        if (fileInputRef.current) {
            fileInputRef.current.value = ""
        }
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

    const processFile = (file: File) => {
        if (!file.type.startsWith("image/")) {
            alert("이미지 파일만 업로드 가능합니다")
            return
        }

        const reader = new FileReader()
        reader.onload = (e) => {
            const base64 = e.target?.result as string
            setPreviewUrl(file.name)
        }
        reader.readAsDataURL(file)
    }

    return (
        <Card className="p-6 mb-8">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-light">새 이미지 추가</h2>
                <Button onClick={() => setIsAdding(!isAdding)} size="sm" variant="outline">
                    {isAdding ? ("취소") : (
                        <>
                            <Plus className="mr-2 w-4 h-4" />
                            추가하기
                        </>
                    )}
                </Button>
            </div>
            {isAdding && (
                <div className="pt-4 space-y-4 border-t border-border">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="title">제목</Label>
                            <Input id="title" placeholder="작품 제목" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="category">카테고리</Label>
                            <select
                                id="category"
                                className="px-3 w-full h-10 rounded-md border border-input bg-background text-foreground"
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
                            <div className="flex gap-2 items-center w-full max-w-xs">
                                <div className="mb-1 text-sm text-left truncate text-muted-foreground">
                                    {previewUrl}
                                </div>
                                <Button
                                    variant="destructive"
                                    size="sm"
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
                                ${isDragging
                                        ? "border-primary bg-primary/5"
                                        : "border-border hover:border-primary/50 hover:bg-muted/50"
                                    }
                              `}>
                                <Upload className="mx-auto mb-3 w-10 h-10 text-muted-foreground" />
                                <p className="mb-1 text-sm text-muted-foreground">클릭하거나 이미지를 드래그하여 업로드</p>
                                <p className="text-xs text-muted-foreground">JPG, PNG, GIF 파일 지원</p>
                            </div>
                        )}
                    </div>
                    <Button>
                        저장
                    </Button>
                </div>
            )}
        </Card>
    )
}