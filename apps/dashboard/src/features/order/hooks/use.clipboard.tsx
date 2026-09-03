import { useEffect, useState } from "react"

export function useClipboardImages() {
    const [files, setFiles] = useState<File[]>([])

    useEffect(() => {
        const handlePaste = (e: ClipboardEvent) => {
            if (!e.clipboardData) return
            const newFiles: File[] = []
            for (const item of e.clipboardData.items) {
                if (item.type.startsWith("image")) {
                    const file = item.getAsFile()
                    if (file) newFiles.push(file)
                }
            }
            if (newFiles.length > 0) setFiles(newFiles)
        }

        window.addEventListener("paste", handlePaste)
        return () => window.removeEventListener("paste", handlePaste)
    }, [])

    return files
}
