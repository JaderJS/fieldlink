'use client'

import { Input } from "@/components/ui/input";
import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { useDoc } from "../hooks/useDoc";
import { EditorProvider } from "@/features/newEditor/providers/editor.provider";
import { Editor } from "@tiptap/core";
import { EditorBubbleMenu, EditorNodeText } from "@/features/newEditor/components/bubble.menu";
import { EditorSelector } from "@/features/newEditor/components/selector";
import { EditorFloatingMenu, EditorFormatBold, EditorLinkSelector, EditorNodeHeading1, EditorNodeTable } from "@/features/newEditor/components/floating.menu";
import { debounce } from "lodash"
import { EditorTableColumnAfter, EditorTableColumnBefore, EditorTableColumnDelete, EditorTableColumnMenu, EditorTableDelete, EditorTableFix, EditorTableGlobalMenu, EditorTableHeaderColumnToggle, EditorTableHeaderRowToggle, EditorTableMenu, EditorTableMergeCells, EditorTableRowAfter, EditorTableRowBefore, EditorTableRowDelete, EditorTableRowMenu, EditorTableSplitCell } from "@/features/newEditor/components/table/table";
import { useUpsertDoc } from "../hooks/useUpsertDoc";
import { useForm } from "react-hook-form";
import { upsertDocSchema, UpsertDocSchema } from "../schemas/upsert.doc.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { LoaderIcon } from "lucide-react";

interface UpsertDocProps {
    doc: Pick<Doc, "cuid">
    initialData?: Doc
}

export const UpsertDoc = ({ doc, initialData }: UpsertDocProps) => {

    const { data, isLoading } = useDoc({ cuid: doc.cuid })

    const form = useForm<UpsertDocSchema>({
        resolver: zodResolver(upsertDocSchema),
        defaultValues: initialData ? initialData : {
            cuid: data?.cuid,
            title: data?.title,
            slug: data?.slug,
            content: data?.content
        }
    })

    const { mutateAsync: upsertDoc } = useUpsertDoc()

    const submit = async (data: UpsertDocSchema) => {
        const promise = upsertDoc(data)
        toast.promise(promise, { loading: "Salvando documento..." })
    }

    const handleSaveWithDebounce = useRef(debounce(submit, 4000)).current

    const handleContent = ({ editor }: { editor: Editor }) => {
        form.setValue('content', editor.getJSON(), { shouldValidate: false, shouldDirty: false })
        form.handleSubmit(handleSaveWithDebounce)()
    }

    useEffect(() => {
        return () => {
            handleSaveWithDebounce.flush()
        }
    }, [])

    useEffect(() => {
        console.log(form.formState.errors)
    }, [form.formState.errors])

    if (isLoading) {
        return (
            <>
                <LoaderIcon className="animate-spin" />
            </>
        )
    }

    return (
        <Form {...form}>
            <div className="flex flex-col gap-y-2">
                <FormField
                    name="title"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <Input
                                {...field}
                                className="text-xl border-none focus:outline-hidden focus:ring-0 focus:border-transparent bg-transparent shadow-none focus:shadow-none"
                                onChange={(value) => {
                                    field.onChange(value)
                                    form.handleSubmit(handleSaveWithDebounce)()
                                }}
                            />
                        </FormItem>
                    )}
                />
                <FormField
                    name="content"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <EditorProvider
                                className="h-full w-full overflow-y-auto rounded-lg border bg-background p-4"
                                onUpdate={handleContent}
                                content={field.value}
                            >
                                <EditorFloatingMenu>
                                    <EditorNodeHeading1 hideName />
                                    <EditorNodeTable hideName />
                                    <EditorFormatBold hideName />
                                </EditorFloatingMenu>
                                <EditorBubbleMenu>
                                    <EditorSelector title="text">
                                        <EditorNodeText />
                                        <EditorNodeHeading1 />
                                    </EditorSelector>
                                    <EditorLinkSelector />
                                </EditorBubbleMenu>
                                <EditorTableMenu>
                                    <EditorTableColumnMenu>
                                        <EditorTableColumnBefore />
                                        <EditorTableColumnAfter />
                                        <EditorTableColumnDelete />
                                    </EditorTableColumnMenu>
                                    <EditorTableRowMenu>
                                        <EditorTableRowBefore />
                                        <EditorTableRowAfter />
                                        <EditorTableRowDelete />
                                    </EditorTableRowMenu>
                                    <EditorTableGlobalMenu>
                                        <EditorTableHeaderColumnToggle />
                                        <EditorTableHeaderRowToggle />
                                        <EditorTableDelete />
                                        <EditorTableMergeCells />
                                        <EditorTableSplitCell />
                                        <EditorTableFix />
                                    </EditorTableGlobalMenu>
                                </EditorTableMenu>
                            </EditorProvider>
                        </FormItem>
                    )}
                />
            </div>
        </Form>
    )
}