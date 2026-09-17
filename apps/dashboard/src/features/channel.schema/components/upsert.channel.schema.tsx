'use client'

import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { useFieldArray, useForm, UseFormReturn } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { Station } from "@/features/station/types"
import { UpsertChannelSchemaSchema, upsertChannelSchemaSchema } from "../schema/upsert.channel.schema"
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChannelSchema } from "../types"
import { useChannelSchema } from "../hooks/use.channel.schema"
import { Button } from "@/components/ui/button"
import { AudioWaveform, Binary, Network, Trash } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TPL_TONES } from "../helpers/subtons"
import { Editor, EditorBubbleMenu, EditorClearFormatting, EditorFloatingMenu, EditorFormatBold, EditorFormatCode, EditorFormatItalic, EditorFormatStrike, EditorFormatSubscript, EditorFormatSuperscript, EditorFormatUnderline, EditorLinkSelector, EditorNodeBulletList, EditorNodeCode, EditorNodeHeading1, EditorNodeHeading2, EditorNodeHeading3, EditorNodeOrderedList, EditorNodeQuote, EditorNodeTable, EditorNodeTaskList, EditorNodeText, EditorProvider, EditorSelector, JSONContent } from "@/components/ui/kibo-ui/editor"
import { useRef, useState } from "react"
import { defaultNewChannelSchema, defaultNewChannelSchemaAnalog, defaultNewChannelSchemaDigital } from "../constants/default.new.channel.schema"
import { Label } from "@/components/ui/label"
import { useUpsertChannelSchema } from "../hooks/use.upsert.channel.schema"
import { toast } from "sonner"
import debounce from "lodash.debounce"
import { useGroups } from "@/features/group/hooks/use.groups"

interface FormSchemaProps {
    channelSchema: Pick<ChannelSchema, "id"> & Omit<ChannelSchema, "id">
}

export const UpsertChannelSchema = ({ channelSchema }: FormSchemaProps) => {

    const { data } = useChannelSchema({ channelSchema })
    const { mutateAsync } = useUpsertChannelSchema()

    const form = useForm<UpsertChannelSchemaSchema>({
        resolver: zodResolver(upsertChannelSchemaSchema),
        defaultValues: {
            ...data,
            channelsAnalog: data?.channelsAnalog
        }
    })

    const handleSubmit = (data: UpsertChannelSchemaSchema) => {
        const promise = mutateAsync(data)
        toast.promise(promise, { loading: "Salvando esquema de canais...", success: "Esquema de canal salvo.", error: (error) => `Erro ao salvar ${error}` })
    }
    const handleDebounce = useRef(debounce(handleSubmit, 3000))

    return (
        <>
            <Form {...form}>
                <FormSchema form={form} onAutoSave={handleDebounce.current} />
                {/* <Button
                    variant={"submit"}
                    className="w-full"
                    onClick={form.handleSubmit(handleSubmit)}
                >
                    Salvar
                </Button> */}
            </Form>
        </>
    )
}

const FormSchema = ({ form, onAutoSave }: { form: UseFormReturn<UpsertChannelSchemaSchema>, onAutoSave: (data: any) => void }) => {

    const channelsDigital = useFieldArray({ control: form.control, name: "channelsDigital", keyName: 'key' })
    const channelsAnalog = useFieldArray({ control: form.control, name: "channelsAnalog", keyName: 'key' })

    const [content, setContent] = useState<JSONContent>(form.getValues(`content`) as Object ?? undefined)
    const handleContent = ({ editor }: { editor: Editor }) => {
        setContent(editor.getJSON())
        form.setValue(`content`, editor.getJSON())
        form.handleSubmit(onAutoSave)()
    }

    const handleNewChannelAnalog = () => {
        channelsAnalog.append(defaultNewChannelSchemaAnalog())
        form.handleSubmit(onAutoSave)()
    }
    const handleNewChannelDigital = () => {
        channelsDigital.append(defaultNewChannelSchemaDigital())
        form.handleSubmit(onAutoSave)()

    }

    const { data: groups } = useGroups({ filters: { station: { id: form.getValues(`stationId`) } } })

    return (
        <>
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
                                    form.handleSubmit(onAutoSave)()
                                }}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                name="content"
                control={form.control}
                render={() => (
                    <FormItem className="my-2">
                        <FormControl>
                            <EditorProvider
                                className="h-full w-full overflow-y-auto rounded-lg border bg-background p-4"
                                content={content}
                                onUpdate={handleContent}
                                placeholder="Start typing..."
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
            <div className="flex flex-wrap gap-1">
                <FormField
                    name="channelsAnalog"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem className="flex-1 p-1">
                            {!channelsAnalog.fields.length && <div className="flex items-center justify-center">
                                <div
                                    onClick={handleNewChannelAnalog}
                                    className="border-input flex items-start gap-2 rounded-md border p-4 shadow-xs"
                                >
                                    <div className="flex items-start gap-3 shrink-0">
                                        <AudioWaveform />
                                    </div>
                                    <div className="flex flex-col gap-2 min-w-0">
                                        <Label>
                                            Analógico{" "}
                                            <span className="text-muted-foreground text-xs leading-[inherit] font-normal">
                                                Adicionar template Analógico
                                            </span>
                                        </Label>
                                        <p className="text-muted-foreground text-xs whitespace-normal break-words leading-snug">
                                            O campo Analógico lhe permite configurar o esquema de canais para sistemas Analógicos
                                        </p>
                                    </div>
                                </div>
                            </div>}
                            <FormControl>
                                {channelsAnalog.fields.length && <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>#</TableHead>
                                            <TableHead>Silenciador</TableHead>
                                            <TableHead>Encoder</TableHead>
                                            <TableHead>Decoder</TableHead>
                                            <TableHead>Mais</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {channelsAnalog.fields.map((channel, index) => (
                                            <TableRow key={channel.key}>
                                                <TableCell>{index}</TableCell>
                                                <TableCell>
                                                    <FormField
                                                        name={`channelsAnalog.${index}.silent`}
                                                        control={form.control}
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormControl>
                                                                    <Select
                                                                        value={String(field.value)}
                                                                        onValueChange={(value) => field.onChange(value)}
                                                                    >
                                                                        <SelectTrigger>
                                                                            <SelectValue placeholder="Encoder" />
                                                                        </SelectTrigger>
                                                                        <SelectContent>
                                                                            {['CSQ', 'TPL', 'DPL_N'].map((tone, index) => (
                                                                                <SelectItem value={String(tone)} key={index}>{tone}</SelectItem>
                                                                            ))}
                                                                        </SelectContent>
                                                                    </Select>
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <FormField
                                                        name={`channelsAnalog.${index}.encoder`}
                                                        control={form.control}
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormControl>
                                                                    <Select
                                                                        disabled={form.watch(`channelsAnalog.${index}.silent`) === 'CSQ'}
                                                                        value={String(field.value)}
                                                                        onValueChange={(value) => field.onChange(value)}
                                                                    >
                                                                        <SelectTrigger>
                                                                            <SelectValue placeholder="Encoder" />
                                                                        </SelectTrigger>
                                                                        <SelectContent>
                                                                            {TPL_TONES.map((tone, index) => (
                                                                                <SelectItem value={String(tone)} key={index}>{tone}Hz</SelectItem>
                                                                            ))}
                                                                        </SelectContent>
                                                                    </Select>
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <FormField
                                                        name={`channelsAnalog.${index}.decoder`}
                                                        control={form.control}
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormControl>
                                                                    <Select
                                                                        disabled={form.watch(`channelsAnalog.${index}.silent`) === 'CSQ'}
                                                                        value={String(field.value)}
                                                                        onValueChange={(value) => field.onChange(value)}
                                                                    >
                                                                        <SelectTrigger>
                                                                            <SelectValue placeholder="Decoder" />
                                                                        </SelectTrigger>
                                                                        <SelectContent>
                                                                            {TPL_TONES.map((tone, index) => (
                                                                                <SelectItem value={String(tone)} key={index}>{tone}Hz</SelectItem>
                                                                            ))}
                                                                        </SelectContent>
                                                                    </Select>
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <Button
                                                        variant={"outline"}
                                                        size={"icon"}
                                                        className="text-muted-foreground"
                                                        onClick={() => channelsAnalog.remove(index)}
                                                    >
                                                        <Trash />
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                    <TableFooter>
                                        <TableRow>
                                            <TableCell colSpan={4} />
                                            <TableCell>
                                                <Button
                                                    size={"sm"}
                                                    variant={"link"}
                                                    onClick={handleNewChannelAnalog}
                                                >
                                                    Novo
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    </TableFooter>
                                </Table>}
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    name="channelsDigital"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem className="flex-1 p-1">
                            {!channelsDigital.fields.length && <div className="flex items-center justify-center group">
                                <div
                                    onClick={handleNewChannelDigital}
                                    className="border-input flex items-start gap-2 rounded-md border p-4 shadow-xs group-hover::bg-accent"
                                >
                                    <div className="flex items-start gap-3 shrink-0">
                                        <Binary />
                                    </div>
                                    <div className="flex flex-col gap-2 min-w-0">
                                        <Label>
                                            Digital{" "}
                                            <span className="text-muted-foreground text-xs leading-[inherit] font-normal">
                                                Adicionar template digital
                                            </span>
                                        </Label>
                                        <p className="text-muted-foreground text-xs whitespace-normal break-words leading-snug">
                                            O campo digital lhe permite configurar o esquema de canais para sistemas digitais
                                        </p>
                                    </div>
                                </div>
                            </div>}
                            <FormControl>
                                {!!channelsDigital.fields.length && <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>#</TableHead>
                                            <TableHead>Color code</TableHead>
                                            <TableHead>Slot</TableHead>
                                            <TableHead>Grupo</TableHead>
                                            <TableHead>Mais</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {channelsDigital.fields.map((channel, index) => (
                                            <TableRow key={channel.key}>
                                                {/* Index */}
                                                <TableCell>{index}</TableCell>

                                                {/* Color code */}
                                                <TableCell>
                                                    <FormField
                                                        name={`channelsDigital.${index}.colorCode`}
                                                        control={form.control}
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormControl>
                                                                    <Select
                                                                        value={String(field.value)}
                                                                        onValueChange={(value) => field.onChange(value)}
                                                                    >
                                                                        <SelectTrigger>
                                                                            <SelectValue placeholder="Código de cor" />
                                                                        </SelectTrigger>
                                                                        <SelectContent>
                                                                            {Array.from({ length: 15 }).map((_, index) => (
                                                                                <SelectItem value={String(index)} key={index}>{index}</SelectItem>
                                                                            ))}
                                                                        </SelectContent>
                                                                    </Select>
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </TableCell>

                                                {/* Slot */}
                                                <TableCell>
                                                    <FormField
                                                        name={`channelsDigital.${index}.slot`}
                                                        control={form.control}
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormControl>
                                                                    <Select
                                                                        value={String(field.value)}
                                                                        onValueChange={(value) => field.onChange(value)}
                                                                    >
                                                                        <SelectTrigger>
                                                                            <SelectValue placeholder="Código de cor" />
                                                                        </SelectTrigger>
                                                                        <SelectContent>
                                                                            {Array.from({ length: 2 }).map((_, index) => (
                                                                                <SelectItem value={String(index)} key={index}>{index}</SelectItem>
                                                                            ))}
                                                                        </SelectContent>
                                                                    </Select>
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </TableCell>

                                                {/* Group */}
                                                <TableCell>
                                                    <FormField
                                                        name={`channelsDigital.${index}.groupId`}
                                                        control={form.control}
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormControl>
                                                                    <Select
                                                                        value={String(field.value)}
                                                                        onValueChange={(value) => field.onChange(value)}
                                                                    >
                                                                        <SelectTrigger>
                                                                            <SelectValue placeholder="Código de cor" />
                                                                        </SelectTrigger>
                                                                        <SelectContent>
                                                                            {groups?.map((group, index) => (
                                                                                <SelectItem value={String(group.id)} key={group.id}>{group.title} {group.identifier} {group.type}</SelectItem>
                                                                            ))}
                                                                        </SelectContent>
                                                                    </Select>
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </TableCell>

                                                {/* More */}
                                                <TableCell>
                                                    <Button
                                                        variant={"outline"}
                                                        size={"icon"}
                                                        className="text-muted-foreground"
                                                        onClick={() => channelsDigital.remove(index)}
                                                    >
                                                        <Trash />
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                    <TableFooter>
                                        <TableRow>
                                            <TableCell colSpan={4} />
                                            <TableCell>
                                                <Button
                                                    size={"sm"}
                                                    variant={"link"}
                                                    onClick={handleNewChannelDigital}
                                                >
                                                    Novo
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    </TableFooter>
                                </Table>}
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>

        </>
    )
}