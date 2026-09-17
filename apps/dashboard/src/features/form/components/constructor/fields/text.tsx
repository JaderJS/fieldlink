'use client'

import * as React from "react"
import { useFormContext } from "react-hook-form"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { BaseFieldProps } from "./index"

const FormFieldText = React.forwardRef<HTMLInputElement, BaseFieldProps>(
    ({ name, label, description, formRef, showLabel = true, children, ...props }, ref) => {
        const form = useFormContext()

        return (
            <FormField
                name={name}
                control={form.control}
                render={({ field }) => (
                    <FormItem className="flex flex-col space-y-1">
                        {showLabel && <FormLabel>{label ?? name}</FormLabel>}
                        <FormDescription>{description}</FormDescription>
                        <FormControl>
                            <Input
                                {...field}
                                ref={ref}
                                onBlur={() => form.handleSubmit(formRef.current?.submit!)()}
                                {...props}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        )
    }
)

FormFieldText.displayName = "FormFieldText"

export { FormFieldText }
