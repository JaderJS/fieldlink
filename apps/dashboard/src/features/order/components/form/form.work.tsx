'use client'

import { ArrayPath, FieldArrayWithId, FieldValues, useFieldArray, UseFieldArrayReturn, UseFormReturn } from "react-hook-form"
import { UpsertOrderSchema } from "../../schema/upsert.schema"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, Trash } from "lucide-react"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { NumberField, Input as InputAria } from "react-aria-components"
import { FormSalesInWork } from "./form.sales.in.work"
import { recalculateTotalFn } from "../../helpers/calc"
import { FormOtherValues } from "./form.other.values"
import { Input } from "@/components/ui/input"
import { FormViewImagesInOrder } from "./form.view.images"
import { Editor, EditorBubbleMenu, EditorClearFormatting, EditorFloatingMenu, EditorFormatBold, EditorFormatCode, EditorFormatItalic, EditorFormatStrike, EditorFormatSubscript, EditorFormatSuperscript, EditorFormatUnderline, EditorLinkSelector, EditorNodeBulletList, EditorNodeCode, EditorNodeHeading1, EditorNodeHeading2, EditorNodeHeading3, EditorNodeOrderedList, EditorNodeQuote, EditorNodeTable, EditorNodeTaskList, EditorNodeText, EditorProvider, EditorSelector, JSONContent } from "@/components/ui/kibo-ui/editor"
import { useIsMobile } from "@/hooks/use-mobile"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"

interface FormProps<T extends FieldValues> {
    form: UseFormReturn<T>
    onAutoSave: (data: T) => void
    formArray: UseFieldArrayReturn<T, ArrayPath<T>, "key">
    fields: FieldArrayWithId<T, ArrayPath<T>, "key">
    index: number
    className?: string
}

export const FormWork = ({ form, fields, formArray, index, onAutoSave, className }: FormProps<UpsertOrderSchema>) => {

    const isMobile = useIsMobile()
    const [show, setShow] = useState(form.watch(`works.${index}.open`))
    const [content, setContent] = useState<JSONContent>(form.getValues(`works.${index}.content`) as Object ?? undefined)

    const otherValues = useFieldArray({ control: form.control, name: `works.${index}.otherValues`, keyName: 'key' })

    const handleContent = ({ editor }: { editor: Editor }) => {
        setContent(editor.getJSON())
        form.setValue(`works.${index}.content`, editor.getJSON())
        form.handleSubmit(onAutoSave)()
    }

    const isDisabled = form.watch(`works.${index}.disabled`)
    const order = form.watch(`works.${index}.orderN`)

    return (
        <Card
            className={cn("w-full", isDisabled && "bg-accent")}
        >
            <CardHeader className="p-2 flex flex-row gap-1">
                <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => {
                        setShow((prev) => !prev)
                        form.setValue(`works.${index}.open`, !show)
                        form.handleSubmit(onAutoSave)()
                    }}
                >
                    {!show ? <ChevronDown /> : <ChevronUp />}
                </Button>
                <CardTitle className="flex-1 flex items-center justify-between">
                    <FormField
                        name={`works.${index}.title`}
                        control={form.control}
                        render={({ field }) => (
                            <FormItem >
                                <FormControl>
                                    <Input
                                        {...field}
                                        disabled={isDisabled}
                                        onBlur={() => {
                                            form.handleSubmit(onAutoSave)()
                                        }}
                                        className="border-none shadow-none text-xl"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        name={`works.${index}.disabled`}
                        render={({ field }) => (
                            <FormItem className="pr-4">
                                <FormControl>
                                    <Switch
                                        {...field}
                                        checked={field.value}
                                        onCheckedChange={(checked) => {
                                            field.onChange(checked)
                                            recalculateTotalFn(form, { workIndex: index })
                                            form.handleSubmit(onAutoSave)()
                                        }}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </CardTitle>
            </CardHeader>
            {show && <CardContent className="flex flex-col gap-0 w-full">
                <FormSalesInWork
                    form={form}
                    index={index}
                    onAutoSave={onAutoSave}
                />
                <FormOtherValues<UpsertOrderSchema>
                    form={form}
                    formArray={otherValues}
                    workIndex={index}
                    arrayName={`works.${index}.otherValues`}
                    onAutoSave={onAutoSave}
                />
                <FormViewImagesInOrder
                    form={form}
                    workIndex={index}
                    onAutoSave={onAutoSave}
                />
                <FormField
                    name={`works.${index}.content`}
                    control={form.control}
                    render={({ field }) => (
                        <FormItem className="mt-2">
                            <FormControl>
                                <EditorProvider
                                    className="h-full w-full overflow-y-auto rounded-lg border bg-background p-4"
                                    content={content}
                                    onUpdate={handleContent}
                                    placeholder="Digite aqui..."
                                >
                                    <EditorFloatingMenu>
                                        <EditorNodeHeading1 hideName />
                                        <EditorNodeBulletList hideName />
                                        <EditorNodeQuote hideName />
                                        <EditorNodeCode hideName />
                                        <EditorNodeTable hideName />
                                    </EditorFloatingMenu>
                                    <EditorBubbleMenu>
                                        <EditorSelector title="Text">
                                            <EditorNodeText />
                                            <EditorNodeHeading1 />
                                            <EditorNodeHeading2 />
                                            <EditorNodeHeading3 />
                                            <EditorNodeBulletList />
                                            <EditorNodeOrderedList />
                                            <EditorNodeTaskList />
                                            <EditorNodeQuote />
                                            <EditorNodeCode />
                                        </EditorSelector>
                                        <EditorSelector title="Format">
                                            <EditorFormatBold />
                                            <EditorFormatItalic />
                                            <EditorFormatUnderline />
                                            <EditorFormatStrike />
                                            <EditorFormatCode />
                                            <EditorFormatSuperscript />
                                            <EditorFormatSubscript />
                                        </EditorSelector>
                                        <EditorLinkSelector />
                                        <EditorClearFormatting />
                                    </EditorBubbleMenu>
                                </EditorProvider>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </CardContent>}
            <CardFooter className="flex justify-between items-center">
                <FormField
                    name={`works.${index}.orderN`}
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    className="outline-none"
                                    {...field}
                                    disabled={isDisabled}
                                    onChange={(event) => {
                                        field.onChange(event.target.value)
                                        form.handleSubmit(onAutoSave)()
                                    }}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                {!isMobile && <span className="text-sm text-muted-foreground">#{form.watch(`works.${index}.id`)}</span>}
                <FormField
                    name={`works.${index}.total`}
                    control={form.control}
                    render={({ field }) => (
                        <FormItem className="flex items-center gap-2">
                            {!false && <FormLabel className="text-sm font-medium">Total parcial do trabalho</FormLabel>}
                            <FormControl>
                                <NumberField
                                    {...field}
                                    value={field.value}
                                    onChange={(value) => {
                                        field.onChange(value)
                                        recalculateTotalFn(form, { workIndex: index })
                                        form.handleSubmit(onAutoSave)()
                                    }}
                                    formatOptions={{
                                        currency: "BRL",
                                        style: "currency"
                                    }}
                                >
                                    <InputAria className={"text-yellow-600 outline-none"} />
                                </NumberField>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {<Button
                    size={"icon"}
                    variant={"ghost"}
                    className="text-muted-foreground"
                    // disabled={!hasPermission(user, 'work', 'delete')}
                    onClick={() => {
                        formArray.remove(index)
                        recalculateTotalFn(form, { workIndex: index })
                        form.handleSubmit(onAutoSave)()
                    }}>
                    <Trash />
                </Button>}
            </CardFooter>
        </Card>
    )
}