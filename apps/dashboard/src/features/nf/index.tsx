'use client'
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import dynamic from "next/dynamic"

export { Nf } from "./components/nf"

export const PDFViewer = dynamic(
    async () => await import("@react-pdf/renderer").then(m => m.PDFViewer),
    { ssr: false, loading: () => <>Loading...</> }
)

export const PDFDownloadLink = dynamic(
    async () => await import("@react-pdf/renderer").then(m => m.PDFDownloadLink),
    {
        ssr: false,
        loading: () => (
            <Button disabled>
                <Loader2 className="animate-spin">Loading...</Loader2>
            </Button>
        )
    }
) 