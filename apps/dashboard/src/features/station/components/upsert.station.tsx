'use client'

import { useForm, UseFormReturn } from "react-hook-form"
import { Station } from "../types"
import { zodResolver } from "@hookform/resolvers/zod"
import { UpsertStationSchema, upsertStationSchema } from "../schemas/upsert.station.schema"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { NumberField, Input as InputAria } from "react-aria-components"
import { useStation } from "../hooks/use.station"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { AlertCircleIcon, AudioWaveform, Binary, BoxIcon, HouseIcon, PanelsTopLeftIcon, Radio, Waves, WavesLadder } from "lucide-react"
import { useStations } from "../hooks/use.stations"
import { useEffect, useState } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { haversineDistance } from "../helpers/geo"
import Link from "next/link"
import { useUpsertStation } from "../hooks/use.upsert.station"
import { toast } from "sonner"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { ViewChannelsSchemas } from "@/features/channel.schema/components/view.channel.schemas"
import { ViewGroups } from "@/features/group/components/view.groups"
import { useGroups } from "@/features/group/hooks/use.groups"

interface UpsertStationProps {
    station: Pick<Station, "id">
    className?: string
}

export const UpsertStation = ({ station, className }: UpsertStationProps) => {

    const { data } = useStation({ station })
    const { mutateAsync: upsertStationFn } = useUpsertStation()

    const form = useForm<UpsertStationSchema>({
        resolver: zodResolver(upsertStationSchema),
        defaultValues: {
            ...data,
            content: {},
            mode: data?.digital ? "digital" : data?.analog ? "analog" : undefined
        }
    })

    const submit = async (data: UpsertStationSchema) => {
        const promise = upsertStationFn(data)
        toast.promise(promise, { loading: "Atualizando estação...", success: "Estacão atualizada" })
    }

    useEffect(() => { console.log(form.formState.errors) }, [form.formState.errors])

    return (
        <div className={cn(className)}>
            <Form {...form}>
                <p className="text-2xl font-semibold mb-2">{data?.property.title}</p>
                <UpsertStationPanel form={form} station={station} />
                <Button
                    className="w-full mt-2"
                    variant={"submit"}
                    onClick={form.handleSubmit(submit)}
                >
                    Salvar
                </Button>
            </Form>
        </div>
    )
}

export const UpsertStationPanel = ({ form, station }: { form: UseFormReturn<UpsertStationSchema>, station: Pick<Station, "id"> }) => {

    const { data: groups } = useGroups({ filters: { station: { id: station.id } } })

    return (
        <Tabs defaultValue="general">
            <ScrollArea>
                <TabsList className="mb-3">
                    <TabsTrigger value="general">
                        <HouseIcon
                            className="-ms-0.5 me-1.5 opacity-60"
                            size={16}
                            aria-hidden="true"
                        />
                        Geral
                    </TabsTrigger>
                    <TabsTrigger value="schema" className="group">
                        <PanelsTopLeftIcon
                            className="-ms-0.5 me-1.5 opacity-60"
                            size={16}
                            aria-hidden="true"
                        />
                        Esquema de canais
                        <Badge
                            className="bg-primary/15 ms-1.5 min-w-5 px-1 transition-opacity group-data-[state=inactive]:opacity-50"
                            variant="secondary"
                        >
                            1
                        </Badge>
                    </TabsTrigger>
                    <TabsTrigger value="groups" className="group">
                        <BoxIcon
                            className="-ms-0.5 me-1.5 opacity-60"
                            size={16}
                            aria-hidden="true"
                        />
                        Grupos
                        <Badge
                            className="bg-primary/15 ms-1.5 min-w-5 px-1 transition-opacity group-data-[state=inactive]:opacity-50"
                            variant="secondary"
                        >
                            {groups?.length}
                        </Badge>
                    </TabsTrigger>
                </TabsList>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
            <TabsContent value="general">
                <FormUpsertStation form={form} />
            </TabsContent>
            <TabsContent value="schema">
                <ViewChannelsSchemas station={station} />
            </TabsContent>
            <TabsContent value="groups">
                <ViewGroups station={station} />
            </TabsContent>
        </Tabs>
    )
}

export function FormUpsertStation({ form, }: { form: UseFormReturn<UpsertStationSchema> }) {

    const debouncedRx = useDebounce(form.watch('rx'), 600)
    const debouncedTx = useDebounce(form.watch('tx'), 600)

    const { data: stations } = useStations({ filters: { excludeStationId: form.getValues('id'), frequency: { rx: debouncedRx, tx: debouncedTx } } })

    return (
        <>

            <div className="flex flex-wrap">
                {/* RX */}
                <FormField
                    control={form.control}
                    name="rx"
                    render={({ field, fieldState }) => (
                        <FormItem className="flex-1">
                            <FormLabel>RX</FormLabel>
                            <FormControl>
                                <NumberField
                                    {...field}
                                    value={field.value / 1e6}
                                    onChange={(val) => field.onChange(Number(val) * 1e6)}
                                    className="flex items-center"
                                >
                                    <InputAria />
                                    <span className="ml-1 text-sm text-muted-foreground">MHz</span>
                                </NumberField>
                            </FormControl>
                            <FormDescription>Frequência RX em MHz</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* TX */}
                <FormField
                    control={form.control}
                    name="tx"
                    render={({ field }) => (
                        <FormItem className="flex-1">
                            <FormLabel>TX</FormLabel>
                            <FormControl>
                                <NumberField
                                    {...field}
                                    value={field.value / 1e6}
                                    onChange={(val) => field.onChange(Number(val) * 1e6)}
                                    className="flex items-center"
                                >
                                    <InputAria />
                                    <span className="ml-1 text-sm text-muted-foreground">MHz</span>
                                </NumberField>
                            </FormControl>
                            <FormDescription>Frequência TX em MHz</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {stations && stations.length > 0 && (
                    <Alert variant="destructive" className="mt-4">
                        <AlertCircleIcon />
                        <AlertTitle>Atenção</AlertTitle>
                        <AlertDescription>
                            Existem <strong>{stations.length}</strong> estação(ões) com frequência próxima a esta, sendo elas:
                            {stations.map((station) => (
                                <div key={station.id} className="flex items-center justify-between p-2 border rounded-xl">
                                    <div>
                                        <p className="text-base">{station.property.title}</p>
                                        <div className="flex items-center gap-2">
                                            <Radio className="h-4 w-4 text-muted-foreground" />
                                            RX {station.rx / 1e6} MHz · TX {station.tx / 1e6} MHz
                                            há {haversineDistance({ lat1: form.watch('latitude'), lon1: form.watch('longitude'), lat2: station.latitude, lon2: station.longitude }).toFixed(2)}Km
                                        </div>
                                    </div>
                                    <Button asChild variant={"outline"}>
                                        <Link href={`/stations/${station.id}`}>Ver mais</Link>
                                    </Button>
                                </div>
                            ))}
                        </AlertDescription>
                    </Alert>
                )}
            </div>

            <Separator className="my-2" />

            <div className="flex flex-wrap">
                {/* Latitude */}
                <FormField
                    name="latitude"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem className="flex-1">
                            <FormLabel>Latitude</FormLabel>
                            <FormControl>
                                <NumberField
                                    {...field}
                                    formatOptions={{ maximumFractionDigits: 9 }}
                                >
                                    <InputAria />
                                </NumberField>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Longitude */}
                <FormField
                    name="longitude"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem className="flex-1">
                            <FormLabel>Longitude</FormLabel>
                            <FormControl>
                                <NumberField
                                    {...field}
                                    formatOptions={{ maximumFractionDigits: 9 }}
                                >
                                    <InputAria />
                                </NumberField>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>


            {/* Ativa */}
            <FormField
                name="isActive"
                control={form.control}
                render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm my-2">
                        <div className="space-y-0.5">
                            <FormLabel>Ativa</FormLabel>
                            <FormDescription>
                                A estação está ativa atualmente?
                            </FormDescription>
                        </div>
                        <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            {/* Modo */}
            <FormField
                name="mode"
                control={form.control}
                render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <RadioGroup
                                className="flex flex-wrap gap-2"
                                value={field.value}
                                onValueChange={(value) => field.onChange(value)}
                            >

                                <div
                                    className="border-input has-data-[state=checked]:border-primary/50 relative flex flex-1 items-center gap-2 rounded-md border p-6 shadow-xs outline-none"
                                >
                                    <RadioGroupItem
                                        value="digital"
                                        id={`digital`}
                                        aria-describedby={`digital-1-description`}
                                        className="order-1 after:absolute after:inset-0"
                                    />
                                    <div className="flex grow items-center gap-3">
                                        <Binary />
                                        <div className="grid grow gap-2">
                                            <Label htmlFor={`digital`}>
                                                Digital
                                            </Label>
                                            <p
                                                id={`digital-1-description`}
                                                className="text-muted-foreground text-xs"
                                            >
                                                Marque essa caixa se eu sistema for digital.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div
                                    className="border-input has-data-[state=checked]:border-primary/50 relative flex flex-1 items-center gap-2 rounded-md border p-6 shadow-xs outline-none"
                                >
                                    <RadioGroupItem
                                        value="analog"
                                        id={`analog-2`}
                                        aria-describedby={`analog-2-description`}
                                        className="order-1 after:absolute after:inset-0"
                                    />
                                    <div className="flex grow items-start gap-3">
                                        <AudioWaveform />
                                        <div className="grid grow gap-2">
                                            <Label htmlFor={`analog-2`}>
                                                Analógico
                                            </Label>
                                            <p
                                                id={`analog-2-description`}
                                                className="text-muted-foreground text-xs"
                                            >
                                                O bom e velho rádio analógico.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </RadioGroup>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            {/* Configurações específicas */}
            {form.watch("mode") === "digital" && (
                <Accordion type="single" collapsible>
                    <AccordionItem value="digital">
                        <AccordionTrigger>Configurações Digitais</AccordionTrigger>
                        <AccordionContent className="space-y-4">
                            <FormField
                                control={form.control}
                                name="digital.slot"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Slot</FormLabel>
                                        <FormControl>
                                            <Input type="number" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="digital.colorCode"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Color Code</FormLabel>
                                        <FormControl>
                                            <Input type="number" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            )}

            {form.watch("mode") === "analog" && (
                <Accordion type="single" collapsible>
                    <AccordionItem value="analog">
                        <AccordionTrigger>Configurações Analógicas</AccordionTrigger>
                        <AccordionContent className="space-y-4">
                            <FormField
                                control={form.control}
                                name="analog.silent"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Silent</FormLabel>
                                        <Select value={field.value} onValueChange={field.onChange}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Selecione" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="CSQ">CSQ</SelectItem>
                                                <SelectItem value="TPL">TPL</SelectItem>
                                                <SelectItem value="DPL_N">DPL Normal</SelectItem>
                                                <SelectItem value="DPL_I">DPL Invertido</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="analog.encoder"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Encoder</FormLabel>
                                        <FormControl>
                                            <Input type="number" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="analog.decoder"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Decoder</FormLabel>
                                        <FormControl>
                                            <Input type="number" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            )}

        </>
    )
}

function useDebounce<T>(value: T, delay = 300) {
    const [debouncedValue, setDebouncedValue] = useState<T>(value)

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedValue(value), delay)
        return () => clearTimeout(timer)
    }, [value, delay])

    return debouncedValue
}