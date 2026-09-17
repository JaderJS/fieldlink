'use client'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useForm, UseFormReturn } from "react-hook-form"
import { upsertClientSchema, UpsertClientSchema } from "../schemas/upsert.client.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useClient } from "../hooks/use.client"
import { Client } from "../type"
import { useProperties } from "@/features/properties/hooks/use.properties"
import { PropertyAssignment } from "./form/property.assignment"
import { useEffect, useMemo, useRef } from "react"
import debounce from "lodash.debounce"
import { Input } from "@/components/ui/input"
import { UpsertDoc } from "@/features/doc/components/upsert.doc"
import { useUpsertDoc } from "@/features/doc/hooks/useUpsertDoc"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { IconFolderCode } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import { DEFAULT_NEW_DOC } from "@/features/doc/constants/new.doc"
import { useUpsertClient } from "../hooks/use.upsert.client"
import { toast } from "sonner"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ViewChannelsSchemas } from "@/features/channel.schema/components/view.channel.schemas"
import { ViewGroups } from "@/features/group/components/view.groups"
import { FormUpsertStation } from "@/features/station/components/upsert.station"
import { HouseIcon, PanelsTopLeftIcon, BoxIcon, Wrench, Trash } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Item, ItemActions, ItemContent, ItemDescription, ItemTitle } from "@/components/ui/item"
import { useDeleteClient } from "../hooks/use.delete.client"
import { useRouter } from "next/navigation"
import { useDoc } from "@/features/doc/hooks/useDoc"

export const UpsertClient = ({ client }: { client: Pick<Client, "id"> }) => {

    const { data } = useClient({ client })
    const { mutateAsync: upsertDocFn } = useUpsertClient()

    const form = useForm<UpsertClientSchema>({
        resolver: zodResolver(upsertClientSchema),
        defaultValues: {
            id: data?.id,
            name: data?.name,
            propertyIds: data?.properties.map(p => String(p.id)),
            moreInfos: {
                id: data?.moreInfos?.id,
                city: data?.moreInfos?.city || "",
                state: data?.moreInfos?.state || "",
                address: data?.moreInfos?.address || "",
                phone: data?.moreInfos?.phone || "",
                zipCode: data?.moreInfos?.zipCode || "",
                email: data?.moreInfos?.email || "unknown@gmail.com"
            }
        }
    })

    const submit = (data: UpsertClientSchema) => {
        const promise = upsertDocFn(data)
        toast.promise(promise, {
            loading: "Salvando cliente...",
            success: "Cliente salvo com sucesso!",
        })
    }

    useEffect(() => {
        console.log(form.formState.errors)
    }, [form.formState.errors])

    const handleSubmitWithDebounce = useRef(debounce(submit, 5000))

    if (!data) return

    return (
        <Form {...form} >
            <div className="p-2">
                <FormUpsertPanel form={form} client={data} onAutoSave={handleSubmitWithDebounce.current} />
            </div>
        </Form>
    )
}

const FormUpsertPanel = ({ form, client, onAutoSave }: { form: UseFormReturn<UpsertClientSchema>, client: Client, onAutoSave: (data: UpsertClientSchema) => void }) => {
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
                    <TabsTrigger value="config" className="group">
                        <Wrench
                            className="-ms-0.5 me-1.5 opacity-60"
                            size={16}
                            aria-hidden="true"
                        />
                        Configurações
                    </TabsTrigger>
                </TabsList>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
            <TabsContent value="general">
                <FormUpsertClient form={form} client={client} onAutoSave={onAutoSave} />
            </TabsContent>
            <TabsContent value="config">
                <FormUpsertConfig form={form} client={client} onAutoSave={onAutoSave} />
            </TabsContent>
        </Tabs>
    )
}

const FormUpsertClient = ({ form, client, onAutoSave }: { form: UseFormReturn<UpsertClientSchema>, client: Client, onAutoSave: (data: UpsertClientSchema) => void }) => {

    const { data: properties } = useProperties()
    const { data: doc, isLoading } = useDoc({ cuid: client.doc?.cuid ?? "" })

    const { mutateAsync: upsertDoc } = useUpsertDoc()

    return (
        <>
            <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Nome</FormLabel>
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
                name="moreInfos.city"
                control={form.control}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Cidade</FormLabel>
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
                name="moreInfos.state"
                control={form.control}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Estado</FormLabel>
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
                name="moreInfos.email"
                control={form.control}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Email</FormLabel>
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
                name="moreInfos.address"
                control={form.control}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Endereço</FormLabel>
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
                name="moreInfos.phone"
                control={form.control}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Telefone</FormLabel>
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
                name="propertyIds"
                control={form.control}
                render={({ field }) => (
                    <FormItem className="py-2">
                        <FormControl>
                            {properties?.length && (
                                <PropertyAssignment
                                    properties={properties}
                                    onChange={(ids) => {
                                        form.setValue("propertyIds", ids, { shouldDirty: true })
                                        form.handleSubmit(onAutoSave)()
                                    }}
                                    value={field.value}
                                />
                            )}
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <Separator className="mt-2" />

            {!client?.doc && <Empty>
                <EmptyHeader>
                    <EmptyMedia variant={"icon"}>
                        <IconFolderCode />
                    </EmptyMedia>
                    <EmptyTitle>Nenhum documento criado</EmptyTitle>
                    <EmptyDescription>Deseja criar um novo documento para atribuir informações customizadas do seu client?</EmptyDescription>
                </EmptyHeader>
                <EmptyContent>
                    <Button
                        onClick={() => {
                            upsertDoc({ ...DEFAULT_NEW_DOC, connect: { clientId: client?.id } })
                        }}
                    >
                        Criar documento
                    </Button>
                </EmptyContent>
            </Empty>}
            {doc && client.doc && <UpsertDoc doc={client.doc} initialData={doc} />}
        </>
    )
}

const FormUpsertConfig = ({ form, client, onAutoSave }: { form: UseFormReturn<UpsertClientSchema>, client?: Client, onAutoSave: (data: UpsertClientSchema) => void }) => {

    const { push } = useRouter()

    const { isPending, mutateAsync: deleteClientFn } = useDeleteClient()

    const handleDeleteClient = (id?: number) => {
        if (!id) return
        const promise = deleteClientFn(id).then(() => {
            push(`/clients`)
        })
        toast.promise(promise, { loading: "Removendo cliente", success: "Cliente removido!" })
    }

    return (
        <Item variant={"outline"} className="bg-destructive/50">
            <ItemContent>
                <ItemTitle>Excluir cliente?</ItemTitle>
                <ItemDescription>Exclua o cliente apenas se tiver realmente certeza disso, essa ação é irreversível</ItemDescription>
            </ItemContent>
            <ItemActions>
                <Button
                    disabled={isPending}
                    variant={"destructive"}
                    size={"icon"}
                    onClick={() => handleDeleteClient(client?.id)}
                >
                    <Trash />
                </Button>
            </ItemActions>
        </Item>
    )
}