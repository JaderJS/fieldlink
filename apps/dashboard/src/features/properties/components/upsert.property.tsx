'use client'

import { useProperty } from "@/features/property/hooks/use.property"
import { Property } from "../types"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { UpsertPropertySchema, upsertPropertySchema } from "../schemas/upsert.property.schema"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useClients } from "@/features/client/hooks/useClients"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MultiSelect } from "@/components/ui/custom/multi.select"
import { useStations } from "@/features/station/hooks/use.stations"
import { Search, Wifi } from "lucide-react"
import { useEffect, useRef } from "react"
import debounce from "lodash.debounce"
import { Skeleton } from "@/components/ui/skeleton"
import { getBgColorByWord } from "@/components/utils"

interface UpsertPropertyProps {
    property: Pick<Property, "id">
}

export const UpsertProperty = ({ property }: UpsertPropertyProps) => {

    const { data } = useProperty({ property })
    const { data: clients } = useClients()
    const { data: stations } = useStations()

    const form = useForm<UpsertPropertySchema>({
        resolver: zodResolver(upsertPropertySchema),
        defaultValues: {
            id: data?.id,
            clientId: data?.clientId,
            city: data?.city,
            title: data?.title,
            stationsIds: data?.stations?.map((s) => s.id)
        }
    })

    const submit = (data: UpsertPropertySchema) => {
        console.log(data)
    }

    const handleSubmitWithDebounce = useRef(debounce(submit, 3000))
    const onAutoSave = handleSubmitWithDebounce.current

    useEffect(() => {
        console.log(form.formState.errors)
    }, [form.formState.errors])

    return (
        <>
            <Form {...form}>
                <FormField
                    name="title"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nome da propriedade</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    onBlur={() => {
                                        form.handleSubmit(onAutoSave)()
                                    }}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    name="city"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    name="clientId"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <Select
                                onValueChange={(value) => field.onChange(value)}
                                value={String(field.value)}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Cliente" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {clients?.map((client) => (
                                        <SelectItem key={client.id} value={String(client.id)}>{client.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    name="stationsIds"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                {stations?.length ? <MultiSelect
                                    ref={field.ref}
                                    searchable
                                    hideSelectAll
                                    aria-label="Busque por uma estação"
                                    placeholder="Estações"
                                    options={stations?.map((station) =>
                                    ({
                                        label: `${station.title} - ${station.property.title}`,
                                        value: String(station.id),
                                        icon: Wifi,
                                        style: {
                                            badgeColor: getBgColorByWord(station.property.title)
                                        },
                                    })
                                    )}
                                    onValueChange={(value) => {
                                        field.onChange(value.map(v => Number(v)))
                                        form.handleSubmit(onAutoSave)()
                                    }}
                                    value={String(field.value)}
                                    emptyIndicator={
                                        <div className="text-center p-4 text-muted-foreground">
                                            <Search className="size-5 mx-auto mb-2 text-muted-foreground/50" />
                                            <p className="text-sm">
                                                Nenhuma estação encontrada
                                            </p>
                                        </div>

                                    }
                                /> : <Skeleton className="h-9 w-full" />}
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </Form>
        </>
    )
}