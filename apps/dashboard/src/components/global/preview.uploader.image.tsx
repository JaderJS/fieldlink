'use client'
import { Button } from "@/components/ui/button"
import { uploadImage } from "@/functions/global"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { Copy, UploadIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { ChangeEvent, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { Input } from "../ui/input"
import { z } from "zod"

const schema = z.object({
    pathUrl: z.string().url()
})

interface ImageUploaderProps {
    onUpdate?: (pathUrl: string) => void
    enable?: boolean
    src?: string
    width?: number
    height?: number
}

const PROFILE_URL = "https://static.vecteezy.com/system/resources/previews/004/141/669/non_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg"

export const PreviewAndImageUploader = ({ onUpdate, enable, src = PROFILE_URL, width = 200, height = 200 }: ImageUploaderProps) => {
    const { mutateAsync: uploadImageMutate, data: upload } = useMutation({ mutationFn: (body: any) => uploadImage(body) })
    const [pathUrl, setPathUrl] = useState<string>(src)
    const [show, setShow] = useState(false)
    const inputRef = useRef<HTMLInputElement | null>(null)

    const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files?.[0]) {
            return
        }
        const formData = new FormData()
        formData.append("image", event.target.files[0])
        uploadImageMutate(formData).then((resp) => {
            setPathUrl(resp.pathUrl)
            onUpdate?.(resp.pathUrl)
        })
    }
    return (
        <div className="flex flex-col justify-center items-center">
            <div className="relative w-fit">
                {pathUrl ? <Image
                    src={pathUrl}
                    alt="Imagem"
                    width={width}
                    height={height}
                    className="aspect-square rounded-full border-2 z-10 object-contain"
                /> : <div className={cn(`h-[200px] w-[200px]`, 'border rounded-full flex justify-center items-center')}>
                    <p className="text-muted-foreground">Nenhuma imagem</p>

                </div>}
                <Button
                    size="icon"
                    variant="outline"
                    onClick={() => { inputRef.current?.click() }}
                    className="absolute bottom-0 rounded-full"
                >
                    <UploadIcon className=" h-6 w-6" />
                </Button>
                <Button
                    size="icon"
                    variant="outline"
                    onClick={() => setShow((prev) => !prev)}
                    className="absolute bottom-0 right-0 rounded-full"
                >
                    <Copy className=" h-6 w-6" />
                </Button>
            </div>

            <input ref={inputRef} className="hidden" type="file" accept="image/*" onChange={handleFileChange} />
            {show && <Input
                type="text"
                placeholder="Insira URL da imagem"
                value={pathUrl}
                onChange={(e) => {
                    const data = schema.safeParse({ pathUrl: e.target.value })
                    if (data.success) {
                        setPathUrl(() => data.data.pathUrl)
                        onUpdate?.(data.data.pathUrl)
                    }
                }}
                className="mt-2 w-full rounded border px-3 py-1 text-sm"
            />}
        </div>
    )
}

