import type React from "react"
import { Toaster } from "@/components/ui/sonner"

export const dynamic = 'force-dynamic'

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            {children}
            <Toaster richColors position="top-right" />
        </>
    )
}
