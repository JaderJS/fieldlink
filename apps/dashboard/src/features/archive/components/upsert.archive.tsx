'use client'

import { uploadArchive, type UpsertArchive, upsertArchive } from "../service/archive.service"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { KEYS } from "@/core/keys"
import { Loader2 } from "lucide-react"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { upsertArchiveSchema, UpsertArchiveSchema } from "../schema/archive.schema"
import { Uploader } from "./uploader"
import { DEFAULT_NEW_ARCHIVE } from "../constants/archive"

const UpsertArchive = ({ connect, ...archive }: UpsertArchive) => {

    const queryClient = useQueryClient()

    const form = useForm<UpsertArchiveSchema>({
        resolver: zodResolver(upsertArchiveSchema),
        defaultValues: !!archive ? { ...archive, file: undefined } : DEFAULT_NEW_ARCHIVE
    })
    const { mutateAsync: uploadArchiveFn, isPending: isPendingUpload } = useMutation({
        mutationFn: uploadArchive,
    })
    const { mutateAsync: upsertArchiveFn, isPending: isPendingUpsert } = useMutation({
        mutationFn: upsertArchive,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: KEYS.archive.getAll({ transaction: { id: connect?.transaction?.id as number} }) })
        }
    })

    const submit = async (data: UpsertArchiveSchema) => {

        if (!!data.file) {
            const formData = new FormData()
            formData.append('file', data.file)

            await uploadArchiveFn(formData).then((resp) => {
                upsertArchiveFn({
                    cuid: data.cuid,
                    title: data.title,
                    path: resp.path,
                    pathUrl: resp.pathUrl,
                    size: resp.size,
                    type: resp.type,
                    connect: {
                        transaction: {
                            id: connect?.transaction?.id
                        }
                    }
                })
            })
        }

    }

    return (
        <div className="flex flex-col w-full">
            <Form {...form}>
                <FormField
                    name="file"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Uploader {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    name="title"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input {...field} placeholder="Informe um nome para o arquivo" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button className="mt-4" disabled={form.formState.isSubmitted} onClick={form.handleSubmit(submit)}>
                    {!form.formState.isSubmitting && <span>Subir arquivo</span>}
                    {form.formState.isSubmitting && <Loader2 className="animate-spin" />}
                </Button>
            </Form>
        </div>
    )
}

export { UpsertArchive }