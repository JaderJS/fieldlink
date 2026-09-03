'use client'

import { useState } from 'react'
import Dropzone, { useDropzone } from 'react-dropzone'
import { File, FileIcon } from 'lucide-react'
import Image from 'next/image'
import { Input } from '@/components/ui/input'

interface UploaderProps {
    onChange: (data: any) => void
    onBlur: (data: any) => void,
    value: any
}

const Uploader = ({ value, onChange, onBlur }: UploaderProps) => {

    const [file, setFile] = useState<{ name: string, size: string, preview: string, isImage: boolean }>()

    const onDrop = (files: File[]) => {
        if (files.length === 0)
            return

        setFile({
            name: files[0].name,
            size: `${(files[0].size / 1024).toFixed(2)} KB`,
            preview: URL.createObjectURL(files[0]),
            isImage: files[0].type.includes("image")
        })
        onChange(files[0])
    }

    const { getRootProps, getInputProps } = useDropzone({
        multiple: false,
        onDrop,
    })
    return (
        <>
            <div className="border-2 border-dashed border-gray-200 rounded-lg flex flex-col gap-1 p-6 items-center" {...getRootProps()}>
                <FileIcon className="w-12 h-12" />
                <span className="text-sm font-medium text-gray-500">Segure e arraste um arquivo, ou clique aqui!</span>
                <span className="text-xs text-gray-500">PDF, image, video, ou audio</span>
            </div>
            <div className="space-y-2 text-sm">
                <Input {...getInputProps()} className='line-clamp-1 w-[240px]' />
            </div>
            {file && (
                <div className='flex gap-x-3 items-center justify-start py-3'>
                    {!file.isImage && <File className='lg:w-6 lg:h-6' />}
                    {file.isImage && <Image width={40} height={40} alt='miniature' src={file.preview} />}
                    <span className='text-muted-foreground text-xs'>{file.size}</span>
                    <span className=' text-xs text-muted-foreground'>{file.name.slice(0, 55)}</span>
                </div>
            )}
        </>

    )

}

export { Uploader }