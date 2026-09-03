import { Form } from "@/components/ui/form";
import debounce from "lodash.debounce";
import React, { ReactNode, useCallback } from "react"
import { UseFormReturn } from "react-hook-form"
import { ZodObject } from "zod"


export interface ReusableFormRef {
    submit: (data: any) => void;
}

export interface ReusableFormProps {
    schema: ZodObject<any>
    methods: UseFormReturn<any>
    children: ReactNode
    onSubmit: (data: any) => void
    controls?: ReactNode,
    debounceMs?: number
}

export const ReusableForm = React.forwardRef<ReusableFormRef, ReusableFormProps>(({ schema, methods, children, controls, onSubmit, debounceMs = 1000 }, ref) => {


    const submit = React.useCallback(debounce(onSubmit, debounceMs), [onSubmit])

    React.useImperativeHandle(ref, () => ({
        submit: (data: any) => submit(data),
    }))


    return (
        <>
            <div className="w-full">
                <Form {...methods}>
                    {children}
                </Form>
                <div className="flex flex-row mt-4 w-full justify-between">
                    {Array.isArray(controls) &&
                        controls.map((control, index) => <div key={index}>{control}</div>)
                    }
                </div>
            </div>
        </>
    )
})