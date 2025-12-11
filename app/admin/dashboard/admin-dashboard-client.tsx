"use client"

import { useState } from "react"
import UploadBoard from "@/components/admin/dashboard/upload-board"
import { GallaryBoard } from "@/components/admin/dashboard/gallary-board"

export function AdminDashboardClient() {
    // refreshKey 상태 - 이 값이 변경되면 GallaryBoard가 자동으로 새로고침됨
    const [refreshKey, setRefreshKey] = useState(0)

    // 업로드 성공 시 호출되는 함수
    const handleUploadSuccess = () => {
        // refreshKey를 증가시켜서 GallaryBoard의 useEffect가 다시 실행되도록 함
        setRefreshKey(prev => prev + 1)
    }

    return (
        <>
            <UploadBoard onUploadSuccess={handleUploadSuccess} />
            <GallaryBoard refreshKey={refreshKey} />
        </>
    )
}