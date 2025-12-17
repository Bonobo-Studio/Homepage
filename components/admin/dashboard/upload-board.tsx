"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Plus, Upload, X } from "lucide-react"
import { useRef, useState } from "react"

export default function UploadBoard({ onUploadSuccess }: { onUploadSuccess?: () => void }) {
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [newItem, setNewItem] = useState({
        file: null as File | null
    })
    const [isAdding, setIsAdding] = useState(false)
    const [isDragging, setIsDragging] = useState(false)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            processFile(file)
        }
    }

    const handleAddItem = async () => {
        if(!newItem.file) {
            alert("파일과 카테고리를 모두 입력해주세요")
            return
        }
    
        try {
            const form = new FormData()
            form.append("file", newItem.file)
            
            const response = await fetch("/admin/dashboard/upload", {
                method: "POST",
                body: form,
            })
    
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}))
                throw new Error(errorData.error || "업로드 중 오류가 발생했습니다")
            }
    
            // Reset form
            setNewItem({ file: null })
            setIsAdding(false)
            if (fileInputRef.current) {
              fileInputRef.current.value = ""
            }
    
            // 갤러리 새로고침 콜백 호출
            onUploadSuccess?.()
        } catch (error) {
            alert(error instanceof Error ? error.message : "업로드 중 오류가 발생했습니다")
            console.error("[upload] error:", error)
        }
    }

    const handleRemoveImage = () => {
        setNewItem({ ...newItem, file: null })
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
            setNewItem({ ...newItem, file: file })
        }
        reader.readAsArrayBuffer(file)
    }

    return (
        <Card className="p-6 mb-8">
            <div className="flex justify-between items-center mb-2">
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
                <div className="pt-4 space-y-4 border-border">
                    <div className="space-y-2">
                        <Label>이미지 업로드</Label>
                        <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                        {newItem.file ? (
                            <div className="flex gap-2 items-center w-full max-w-xs">
                                <div className="mb-1 text-sm text-left truncate text-muted-foreground">
                                    {newItem.file?.name}
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
                    <Button onClick={handleAddItem}>
                        업로드
                    </Button>
                </div>
            )}
        </Card>
    )
}