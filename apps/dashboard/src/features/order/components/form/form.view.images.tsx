'use client'

import { FieldValues, useFieldArray, UseFieldArrayReturn, UseFormReturn } from "react-hook-form"
import { UpsertOrderSchema } from "../../schema/upsert.schema"
import { useUploadArchive, useUploadArchiveNew } from "@/features/archive/hooks/use.upload.archive"
import { Button } from "@/components/ui/button"
import { defaultNewArchive } from "../../constants/new.archive"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ReactNode, useEffect, useState } from "react"
import { Dropzone, DropzoneContent, DropzoneEmptyState } from "@/components/ui/kibo-ui/dropzone"
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { Archive, ChevronRightIcon, File, Plus, Trash } from "lucide-react"
import { useClipboardImages } from "../../hooks/use.clipboard"
import { Item, ItemActions, ItemContent, ItemDescription, ItemGroup, ItemHeader, ItemMedia, ItemTitle } from "@/components/ui/item"
import { Empty } from "@/components/ui/empty"

interface FormViewArchivesInOrderProps<T extends FieldValues> {
    form: UseFormReturn<T>
    workIndex: number
    onAutoSave: (data: T) => void
}

export const FormViewImagesInOrder = ({ form, workIndex, onAutoSave }: FormViewArchivesInOrderProps<UpsertOrderSchema>) => {

    const archives = useFieldArray({ control: form.control, name: `works.${workIndex}.archives`, keyName: "key" })

    if (archives.fields.length === 0) {
        return (
            <Item variant={"outline"} asChild>
                <DropZone
                    form={form}
                    archives={archives}
                    onAutoSave={onAutoSave}
                    workIndex={workIndex}
                >
                    <Button
                        variant={"ghost"}
                        className="h-full w-full border"
                    >
                        <ItemMedia>
                            <File className="size-5" />
                        </ItemMedia>
                        <ItemContent className="flex justify-center items-start">
                            <ItemTitle>Upload de arquivos?</ItemTitle>
                            <ItemDescription>Se quiser pode adicionar arquivos ao trabalho</ItemDescription>
                        </ItemContent>
                        <ItemActions>
                            <ChevronRightIcon className="size-4" />
                        </ItemActions>
                    </Button>
                </DropZone>
            </Item>
        )
    }

    return (
        <div className="w-full">
            <ViewInList
                form={form}
                archives={archives}
                workIndex={workIndex}
                onAutoSave={onAutoSave}
            />
        </div>
    )
}

interface ViewInListProps<
    TFieldArrayName extends `works.${number}.archives` = `works.${number}.archives`
> {
    archives: UseFieldArrayReturn<UpsertOrderSchema, TFieldArrayName, "key">
    form: UseFormReturn<UpsertOrderSchema>
    workIndex: number
    onAutoSave: (data: any) => void
}

const ViewInList = ({ archives, form, workIndex, onAutoSave }: ViewInListProps) => {

    const isImage = (type: string) => {
        return type.startsWith("image") 
    }


    return (
        <div className="flex w-full flex-col gap-6">
            <ItemGroup className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {archives.fields.map((archive, index) => (
                    <Item key={archive.key} className="border-muted relative">
                        <Button
                            size={"icon"}
                            variant={"ghost"}
                            className="absolute bottom-1 right-1 text-muted-foreground"
                            onClick={() => { archives.remove(index) }}
                        >
                            <Trash />
                        </Button>
                        <ItemHeader>
                            {isImage(archive.type ?? "") && <Image
                                src={archive.pathUrl}
                                alt={archive.title}
                                width={128}
                                height={128}
                                className="aspect-square w-full rounded-sm object-cover"
                                unoptimized
                            />}
                            {!isImage(archive.type ?? "") &&
                                <div className="flex items-center justify-center h-20 w-full bg-muted text-sm rounded-[inherit]">
                                    📄 {archive.title || archive.path}
                                </div>
                            }
                        </ItemHeader>
                        <ItemContent>
                            <ItemTitle>
                                <FormField
                                    name={`works.${workIndex}.archives.${index}.title`}
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem className="w-full">
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    className="border-none shadow-none line-clamp-4"
                                                    onBlur={() => {
                                                        form.handleSubmit(onAutoSave)()
                                                    }}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </ItemTitle>
                            <FormField
                                name={`works.${workIndex}.archives.${index}.description`}
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="Descrição"
                                                className="border-none shadow-none line-clamp-4"
                                                onBlur={() => {
                                                    form.handleSubmit(onAutoSave)()
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </ItemContent>
                    </Item>
                ))}
                <Item className="border-muted flex justify-center items-center">
                    <ItemActions>
                        <DropZone
                            form={form}
                            archives={archives}
                            onAutoSave={onAutoSave}
                            workIndex={workIndex}
                        >
                            <Button variant={"ghost"} size={"icon"}>
                                <Plus className="size-5" />
                            </Button>
                        </DropZone>
                    </ItemActions>
                </Item>
            </ItemGroup>
        </div>
    )
}

interface DropZoneProps extends ViewInListProps {
    children: ReactNode
}

const DropZone = ({ archives, form, onAutoSave, workIndex, children }: DropZoneProps) => {

    const pastedImages = useClipboardImages()
    const [files, setFiles] = useState<File[] | undefined>()

    const { mutateAsync: uploadArchiveFn } = useUploadArchiveNew()

    const handleDrop = async (files: File[]) => {
        setFiles(files)
        for (const file of files) {
            uploadArchiveFn(file).then((resp) => {
                archives.append(defaultNewArchive({
                    path: resp.path,
                    type: resp.mimetype,
                    pathUrl: resp.pathUrl,
                }))
            })
            form.handleSubmit(onAutoSave)()
        }
    }

    useEffect(() => {
        if (pastedImages.length > 0) {
            handleDrop(pastedImages)
        }
    }, [pastedImages])

    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Arquivo</DialogTitle>
                    <DialogDescription></DialogDescription>
                </DialogHeader>
                <Dropzone
                    maxFiles={8}
                    onDrop={handleDrop}
                >
                    <DropzoneEmptyState />
                    <DropzoneContent />
                </Dropzone>
                <DialogFooter></DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
