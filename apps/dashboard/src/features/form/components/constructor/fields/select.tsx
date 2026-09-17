'use client'

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { forwardRef } from "react"
import { Path, useFormContext, UseFormReturn } from "react-hook-form"
import { type BaseFieldProps } from "./index"
export interface SelectFieldHandle {
    submit: () => void
}

export type SelectFieldProps<T = string | number> = BaseFieldProps & {
    options: {
        label: string
        value: T
    }[]
}

const FormFieldSelect = forwardRef<SelectFieldHandle, SelectFieldProps>(({ name, options, formRef }, ref) => {

    const form = useFormContext()

    return (
        <FormField
            name={name}
            control={form.control}
            render={({ field }) => (
                <FormItem className="p-2 w-full">
                    <FormLabel>{field.name}</FormLabel>
                    <Select
                        value={String(field.value)}
                        onValueChange={(value) => {
                            field.onChange(value)
                            form.handleSubmit(formRef.current?.submit!)()
                        }}
                    >
                        <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {options.map(({ value, label }) => (
                                <SelectItem key={value} value={String(value)}>{label}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
})

FormFieldSelect.displayName = "FormFieldSelect"

export { FormFieldSelect }