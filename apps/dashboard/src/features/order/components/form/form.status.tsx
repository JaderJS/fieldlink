'use client'

import { UseFormReturn } from "react-hook-form"
import { useOrderStatus } from "../../hooks/use.order.status"
import { CustomSelectOrderStatus } from "../assets/upsert.order/custom.select"
import { UpsertOrderSchema } from "../../schema/upsert.schema"
import { FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useUpsertOrderStatus } from "../../hooks/use.upsert.order.status"
import { color } from "framer-motion"

export const FormStatus = ({ form, onAutoSave }: { form: UseFormReturn<UpsertOrderSchema>, onAutoSave: (data: any) => void }) => {

    const { data: status } = useOrderStatus()
    const { mutateAsync: upsertOrderStatusFn } = useUpsertOrderStatus()

    return (
        <>
            <FormField
                name="statusId"
                control={form.control}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Status</FormLabel>
                        <CustomSelectOrderStatus
                            label="Status"
                            options={(status || [])?.map((s) => ({ id: s.id, label: s.name, color: s.color }))}
                            values={field.value ? [{ id: field.value, label: (status || []).find(st => st.id === field.value)?.name || "", color: (status || []).find(st => st.id === field.value)?.color }] : []}
                            onValueChange={async (value) => {
                                if (!value.id) {
                                    upsertOrderStatusFn({
                                        name: value.label,
                                        color: value.color
                                    }).then((res) => {
                                        field.onChange(res.status.id)
                                        form.handleSubmit(onAutoSave)()
                                    })
                                    return
                                }
                                field.onChange(value.id)
                                form.handleSubmit(onAutoSave)()
                            }}
                        />
                        <FormDescription>Informe o status atual da ordem</FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />

        </>
    )
}