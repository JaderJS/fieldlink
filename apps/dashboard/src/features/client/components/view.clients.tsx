'use client'

import { CardsProvider, ContainerCards, HeaderContainer, GroupBodyCards, GroupHeaderCards } from "@/features/card"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useClients } from "../hooks/useClients"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ViewProperties } from "@/features/properties/components/view.properties"
import { useUpsertClient } from "../hooks/use.upsert.client"
import { defaultNewClient } from "../constants/new.default.client"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export const ViewClients = () => {

    const { push } = useRouter()

    const { data: clients } = useClients()
    const { mutateAsync: upsertClientFn } = useUpsertClient()

    if (!clients) return null

    type ICardClient = NonNullable<typeof clients>[number]

    const handleNewClient = () => {
        const promise = upsertClientFn(defaultNewClient()).then(({ client }) => {
            push(`/clients/${client.id}`)
        })
        toast.promise(promise, { loading: "Configurando novo cliente...", success: "Cliente criado com sucesso" })
    }

    return (
        <>
            <CardsProvider
                initialCards={clients}
            >
                <HeaderContainer />
                <ContainerCards<ICardClient>>
                    {([group, clients]) => (
                        <div key={group}>
                            <GroupHeaderCards groupKey={group}>{group}</GroupHeaderCards>
                            <Button variant={"outline"} className="w-full p-2" onClick={handleNewClient}>Novo cliente</Button>
                            <div className="grid grid-cols-1 lg:grid-cols-2">
                                {clients.map((client) => (
                                    <GroupBodyCards key={client.id} groupKey={group} className="p-2">
                                        <Card>
                                            <CardHeader>
                                                <CardTitle className="capitalize">{client.name}</CardTitle>
                                                <CardDescription>{client.orders.length} serviços executado(s)</CardDescription>
                                            </CardHeader>

                                            <CardContent className="grid grid-cols-3 gap-4 pt-2">
                                                <div className="flex flex-col items-center p-2 bg-green-50 rounded-xl">
                                                    <span className="text-xs text-muted-foreground">Gasto</span>
                                                    <span className="text-green-600 font-bold">
                                                        R$ {client.summary.total.spent.toFixed(2)}
                                                    </span>
                                                </div>

                                                <div className="flex flex-col items-center p-2 bg-blue-50 rounded-xl">
                                                    <span className="text-xs text-muted-foreground">Aberto</span>
                                                    <span className="text-blue-600 font-bold">
                                                        R$ {client.summary.total.open.toFixed(2)}
                                                    </span>
                                                </div>

                                                <div className="flex flex-col items-center p-2 bg-red-50 rounded-xl">
                                                    <span className="text-xs text-muted-foreground">Aberto</span>
                                                    <span className="text-red-600 font-bold">
                                                        R$ {(0 as number).toFixed(2)}
                                                    </span>
                                                </div>

                                                <div className="col-span-full">
                                                    <ViewProperties filters={{ clientId: client.id }} />
                                                </div>

                                                <Button asChild variant={"outline"} className="w-full col-span-3">
                                                    <Link href={`clients/${client.id}`}>Ver mais</Link>
                                                </Button>
                                            </CardContent>

                                            <CardFooter className="flex justify-between pt-4 border-t">
                                                <p className="text-xs text-muted-foreground line-clamp-1">
                                                    Primeira ordem:{" "}
                                                    <span className="font-medium">
                                                        {client.summary.firstOrder?.id ? <>
                                                            <Link href={`/order/${client.summary.firstOrder?.id}`}>
                                                                {client.summary.firstOrder?.title}
                                                            </Link>
                                                        </> : "Nenhuma"}
                                                    </span>
                                                </p>
                                                <p className="text-xs text-muted-foreground line-clamp-1">
                                                    Última ordem:{" "}
                                                    <span className="font-medium">
                                                        {client.summary.lastOrder?.id ? <>
                                                            <Link href={`/order/${client.summary.lastOrder?.id}`}>
                                                                {client.summary.lastOrder?.title}
                                                            </Link>
                                                        </> : "Nenhuma"}
                                                    </span>
                                                </p>
                                            </CardFooter>
                                        </Card>
                                    </GroupBodyCards>
                                ))}
                            </div>
                        </div>
                    )}
                </ContainerCards>
            </CardsProvider>

        </>
    )
}