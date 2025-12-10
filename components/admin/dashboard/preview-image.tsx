import { Button } from "@/components/ui/button"
import { Upload, X } from "lucide-react"
import Image from "next/image"

export default function PreviewImage({previewUrl}: {previewUrl: string}) {
    return (
        previewUrl ? (
            <div className="relative w-full max-w-xs">
              <div className="aspect-[3/4] relative rounded-lg overflow-hidden border border-border">
                <Image src={previewUrl || "/placeholder.svg"} alt="미리보기" fill className="object-cover" />
              </div>
              <Button
                variant="destructive"
                size="sm"
                className="absolute top-2 right-2"
                // onClick={handleRemoveImage}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <div
            //   onClick={() => fileInputRef.current?.click()}
            //   onDragOver={handleDragOver}
            //   onDragLeave={handleDragLeave}
            //   onDrop={handleDrop}
              className={`
                border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
                transition-colors duration-200
                ${
                //   isDragging
                false
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50 hover:bg-muted/50"
                }
              `}
            >
              <Upload className="w-10 h-10 mx-auto mb-3 text-muted-foreground" />
              <p className="text-sm text-muted-foreground mb-1">클릭하거나 이미지를 드래그하여 업로드</p>
              <p className="text-xs text-muted-foreground">JPG, PNG, GIF 파일 지원</p>
            </div>
          )
    )

}