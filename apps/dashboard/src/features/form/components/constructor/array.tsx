import { Button } from "@/components/ui/button"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Trash } from "lucide-react"
import { Input } from "react-aria-components"
import { ControllerRenderProps, FieldValues, useFieldArray, UseFormReturn } from "react-hook-form"
import { ZodDefault, ZodEffects, ZodEnum, ZodNativeEnum, ZodNullable, ZodOptional, ZodTypeAny } from "zod"

type ArrayFieldCustomization = {
    [fieldPath: string]: (params: {
        field: ControllerRenderProps<any>
        form: UseFormReturn<any>
        index: number
    }) => React.ReactNode
}

type BuilderFieldArrayProps<T extends FieldValues> = {
    methods: UseFormReturn<T>
    fieldSchema: ZodTypeAny
    formRef: React.RefObject<{ submit: (data: any) => void } | null>
    path: string,
    customFields?: ArrayFieldCustomization
}

export const BuilderFieldArray = ({ methods, fieldSchema, path, formRef, customFields }: BuilderFieldArrayProps<any>) => {
    const { fields, append, remove } = useFieldArray({ control: methods.control, name: path, keyName: "key" })

    const itemShape = fieldSchema._def.type.shape
    const header = Object.keys(itemShape).concat("actions")

    const renderArrayField = (fieldPath: string, schema: ZodTypeAny, index: number) => {
        const unwrappedSchema = unwrapZodType(schema)
        const customRender = customFields?.[fieldPath]

        if (customRender) {
            return (
                <FormField
                    name={fieldPath}
                    control={methods.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                {customRender({ field, form: methods, index })}
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            )
        }

        if (unwrappedSchema instanceof ZodEnum || unwrappedSchema instanceof ZodNativeEnum) {
            const values = unwrappedSchema._def.values as (string | number)[]
            return (
                <FormField
                    name={fieldPath}
                    control={methods.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <select
                                    {...field}
                                    className="p-2 border rounded w-full"
                                    onBlur={() => methods.handleSubmit(formRef.current?.submit!)()}
                                >
                                    {values.map((v) => (
                                        <option key={v} value={v}>
                                            {v}
                                        </option>
                                    ))}
                                </select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            )
        }

        return (
            <FormField
                name={fieldPath}
                control={methods.control}
                render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <Input
                                {...field}
                                onBlur={() => methods.handleSubmit(formRef.current?.submit!)()}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        )
    }

    return (
        <div key={path} className="flex flex-col space-y-1">
            <Table>
                <TableHeader>
                    <TableRow>
                        {header.map((name) => (
                            <TableHead key={name}>{name}</TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {fields.map((field, index) => (
                        <TableRow key={field.key}>
                            {/* {Object.entries(itemShape).map(([k, s]) => {
                                const itemPath = `${path}.${index}.${k}`
                                const schema = unwrapZodType(s)
                                if (schema instanceof ZodEnum || schema instanceof ZodNativeEnum) {
                                    // pega valores da enum
                                    const values = schema._def.values as (string | number)[]

                                    return (
                                        <TableCell key={itemPath}>
                                            <FormField
                                                name={itemPath}
                                                control={methods.control}
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormControl>
                                                            <select
                                                                {...field}
                                                                className="p-2 border rounded w-full"
                                                                onBlur={() =>
                                                                    methods.handleSubmit(formRef.current?.submit!)()
                                                                }
                                                            >
                                                                {values.map((v) => (
                                                                    <option key={v} value={v}>
                                                                        {v}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </TableCell>
                                    )
                                }

                                return (
                                    <TableCell key={itemPath}>
                                        <FormField
                                            name={itemPath}
                                            control={methods.control}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input
                                                            {...field}
                                                            onBlur={() => methods.handleSubmit(formRef.current?.submit!)()}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </TableCell>
                                )
                            })} */}
                            {Object.entries(itemShape).map(([fieldName, schema]) => {
                                const fieldPath = `${path}.${index}.${fieldName}`
                                return (
                                    <TableCell key={fieldPath}>
                                        {renderArrayField(fieldPath, schema as ZodTypeAny, index)}
                                    </TableCell>
                                )
                            })}
                            <TableCell>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    type="button"
                                    onClick={() => {
                                        remove(index)
                                        methods.handleSubmit(formRef.current?.submit!)()
                                    }}
                                >
                                    <Trash className="text-muted-foreground" />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={header.length - 1}></TableCell>
                        <TableCell className="text-right">
                            <Button
                                size={"sm"}
                                variant="link"
                                type="button"
                                onClick={() => append({})}
                            >
                                <Plus /> {path}
                            </Button>
                        </TableCell>
                    </TableRow>
                </TableFooter>
            </Table>


        </div >

    )
}




function unwrapZodType(schema: unknown): ZodTypeAny {
    const s = schema as ZodTypeAny
    if (s instanceof ZodEffects) {
        return unwrapZodType((s as any)._def.schema)
    }
    if (s instanceof ZodDefault || s instanceof ZodOptional || s instanceof ZodNullable) {
        return unwrapZodType((s as any)._def.innerType)
    }
    return s
}