'use client'

import { useForm } from "react-hook-form"
import { upsertGroupSchema, UpsertGroupSchema } from "../schema/group.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { group } from "console"
import { useGroup } from "../hooks/use.group"
import { Group } from "../types"
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { useRef } from "react"
import debounce from "lodash.debounce"
import { Input } from "@/components/ui/input"
import { useUpsertGroup } from "../hooks/use.upsert.group"
import { toast } from "sonner"

export const UpsertGroup = ({ group }: { group: Pick<Group, "id"> }) => {

    const { data } = useGroup({ group, initialValues: group as Group })
    const { mutateAsync: upsertGroupFn } = useUpsertGroup()
    const form = useForm<UpsertGroupSchema>({
        resolver: zodResolver(upsertGroupSchema),
        defaultValues: {
            id: data?.id,
            identifier: String(data?.identifier),
            title: data?.title,
            type: data?.type
        }
    })
    const submit = (data: UpsertGroupSchema) => {
        const promise = upsertGroupFn(data)
        toast.promise(promise)
    }

    const handleSubmit = useRef(debounce(submit, 3000))

    return (
        <>
            <Card
                className="hover:shadow-md transition-shadow cursor-pointer"
            >
                <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                        <FormField
                            name="title"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            onChange={(value) => {
                                                field.onChange(value)
                                                form.handleSubmit(handleSubmit.current)()
                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="identifier"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem className="text-sm text-muted-foreground">
                                    <FormControl>
                                        <Input
                                            {...field}
                                            onChange={(value) => {
                                                field.onChange(value)
                                                form.handleSubmit(handleSubmit.current)()
                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground space-y-2">
                    <FormField
                        name="type"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem className="text-sm text-muted-foreground">
                                <FormControl>
                                    <Input
                                        {...field}
                                        onChange={(value) => {
                                            field.onChange(value)
                                            form.handleSubmit(handleSubmit.current)()
                                        }}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <p>
                        <strong>Canais:</strong> {data?.channels?.length ?? 0}
                    </p>
                    <p>
                        <strong>Estações:</strong> {data?.stations?.length ?? 0}
                    </p>
                </CardContent>
            </Card>
        </>
    )
}