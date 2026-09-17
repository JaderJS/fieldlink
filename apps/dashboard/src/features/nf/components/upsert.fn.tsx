'use client'

import { Form } from "@/components/ui/form"
import { ReusableForm, generateDescribe, generateChildrenWithZod, ReusableFormRef } from "@/features/form/index"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMemo, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Nf, PDFViewer } from ".."
import { NfProps } from "./nf"
import debounce from "lodash.debounce"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useQuery } from "@tanstack/react-query"
import { KEYS } from "@/core/keys"
import { getClients } from "@/features/client/service/client.crud"
import { getProducts } from "@/features/product/services/crud"

const schema = z.object({
    client: z.object({
        id: z.coerce.number().optional().describe(generateDescribe({ label: "Selecione o cliente" })),
        property: z.string().min(1).describe(generateDescribe({ label: "Propriedade" })),
        name: z.string().min(1).describe(generateDescribe({ label: "Nome responsável" })),
        cnpj: z.string().min(11),
        town: z.string().min(1).describe(generateDescribe({ label: "Cidade" })),
        state: z.string().min(1).describe(generateDescribe({ label: "Estado" })),
    }).describe(generateDescribe({ label: "Cliente" })),
    type: z.enum(['Orçamento', 'Venda', 'Manutenção', 'Manutenção/venda']),
    itens: z.array(z.object({
        id: z.coerce.number().optional(),
        qtd: z.coerce.number(),
        und: z.enum(['und', 'm', 'g', 'l']).default('und'),
        name: z.string().min(1),
        value: z.coerce.number()
    })),
    otherValues: z.array(z.object({
        id: z.coerce.number().optional(),
        qtd: z.coerce.number(),
        name: z.string().min(1),
        value: z.coerce.number()
    }))
})

type Schema = z.infer<typeof schema>

export const UpsertNf = () => {

    const [data, setData] = useState<NfProps>()

    const { data: clients } = useQuery({
        queryKey: KEYS.client.getAll(),
        queryFn: getClients,
        select: data => data.clients
    })

    const { data: products } = useQuery({
        queryKey: KEYS.product.getAll(),
        queryFn: getProducts,
        select: data => data.products
    })

    const form = useForm<Schema>({
        resolver: zodResolver(schema), defaultValues: {
            client: {
                name: "Desconhecido",
                cnpj: "000.000.000-00",
                id: 0,
                property: "Desconhecido",
                state: "MT",
                town: "Sinop"
            },
            type: 'Orçamento',
            itens: Array.from({ length: 4 }).map((_, index) => ({ id: index, name: "Debug", qtd: 10, value: 1000 })),
            otherValues: Array.from({ length: 2 }).map((_, index) => ({ id: index, name: "Outros valores podem ser adicionados", qtd: 2, value: 100 })),
        }
    })
    const formRef = useRef<ReusableFormRef>(null)

    const handleSubmit = (data: Schema) => {
        console.log(data)
        setData({
            emitter: { cnpj: "42.244.637/0001-73", name: "Link Network" },
            client: data.client,
            itens: data.itens,
            otherValues: data.otherValues,
            type: data.type,
            // discount: {
            //     percent: 2,
            //     value: 100
            // }
        })
    }

    const handleSubmitWithDebounce = useMemo(() => debounce(handleSubmit, 1000), [])

    const children_ = useMemo(() => generateChildrenWithZod({
        schema,
        form,
        formRef: formRef!,
        customFields: {
            replace: {
                "client.id": ({ field }) => (
                    <Select onValueChange={(value) => {
                        const newClient = clients?.find(({ id }) => String(id) === value)
                        if (!newClient) {
                            return
                        }
                        form.setValue("client", { id: newClient.id, cnpj: "000.000.000-000", name: newClient.name, property: newClient.name, state: "MT", town: "Desconhecido" })
                        form.handleSubmit(handleSubmitWithDebounce)()
                    }}>
                        <SelectTrigger>
                            <SelectValue placeholder="Selecione o cliente" />
                        </SelectTrigger>
                        <SelectContent>
                            {clients?.map((client, index) => (
                                <SelectItem key={client.id} value={String(client.id)}>{client.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                )
            },
            add: [
                {
                    name: "new_product",
                    render: ({ field }) => (
                        <Select onValueChange={(value) => {
                            const product = products?.find(({ id }) => String(id) === value)
                            if (!product) return
                            const oldItens = form.getValues('itens')
                            form.setValue("itens", [...oldItens, { id: product.id, name: product.name, qtd: 1, und: 'und', value: product.price }])
                            form.handleSubmit(handleSubmitWithDebounce)()
                        }}>
                            <SelectTrigger>
                                <SelectValue placeholder="Selecione o cliente" />
                            </SelectTrigger>
                            <SelectContent>
                                {products?.map((client, index) => (
                                    <SelectItem key={client.id} value={String(client.id)}>{client.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    ),
                    position: "after",
                    relativeTo: "type"
                }
            ]
        }
    }), [clients, products])

    return (
        <div className="p-12">
            <Form {...form}>
                <ReusableForm
                    schema={schema}
                    methods={form}
                    children={children_}
                    onSubmit={handleSubmitWithDebounce}
                    ref={formRef}
                />
            </Form>
            <Dialog>
                <DialogTrigger asChild>
                    <Button disabled={!data}>Visualizar</Button>
                </DialogTrigger>
                <DialogHeader>
                    <DialogTitle />
                    <DialogDescription />
                </DialogHeader>
                <DialogContent className="h-2/3 w-[90vw] p-12">
                    {data && <PDFViewer key={JSON.stringify(data)} className="w-full h-full">
                        <Nf
                            client={data?.client}
                            itens={data?.itens}
                            emitter={data.emitter}
                            discount={data.discount}
                            otherValues={data.otherValues}
                            type={data.type}
                        />
                    </PDFViewer>}
                </DialogContent>
            </Dialog>
        </div>
    )
}