'use client'

import { format, formatDistanceToNow } from "date-fns"
import { useProperties } from "../hooks/use.properties"
import { Station } from "@/features/station/types"
import { ptBR } from "date-fns/locale"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MapPin, Pointer, Speaker, SpeakerIcon, Volume } from "lucide-react"
import { CardsProvider, ContainerCards, GroupBodyCards, GroupHeaderCards, HeaderContainer } from "@/features/card"
import { useUpsertProperty } from "../hooks/use.upsert.property"
import { defaultNewProperty } from "../constants/default.new.property"
import { useClients } from "@/features/client/hooks/useClients"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ReactNode } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

interface ViewPropertiesProps {
    filters?: {
        stationId?: number
        clientId?: number
    }
}

export const ViewProperties = ({ filters }: ViewPropertiesProps) => {

    const { push } = useRouter()
    const { data: properties } = useProperties({ filters })
    const { mutateAsync: upsertPropertyFn } = useUpsertProperty()
    type ICardProperties = NonNullable<typeof properties>[number]

    const handleNewProperty = (clientId: number) => {
        const promise = upsertPropertyFn(defaultNewProperty({ clientId })).then((res) => {
            push(`/properties/${res.property.id}`)
        })
        toast.promise(promise, { loading: "Criando nova propriedade", success: "Cliente criado com sucesso!" })
    }

    if (!properties) return null

    return (
        <CardsProvider
            initialCards={properties}
        >
            <HeaderContainer />
            <ContainerCards<ICardProperties>>
                {([group, clients]) => (
                    <div key={group}>
                        <GroupHeaderCards groupKey={group}>{group}</GroupHeaderCards>
                        <DialogSelectClient
                            onSelect={handleNewProperty}
                        >
                            <Button variant={"outline"} className="w-full p-2">Nova propriedade</Button>
                        </DialogSelectClient>
                        <div className="grid">
                            {properties.map((property) => (
                                <GroupBodyCards key={property.id} groupKey={group} className="p-2">
                                    <article key={property.id} className="p-4 border rounded-lg shadow-sm bg-background">
                                        <header className="flex items-start justify-between gap-4">
                                            <div>
                                                <h3 className="text-md font-semibold">{property.title}</h3>
                                                <div className="text-sm text-muted-foreground">{property.city}</div>
                                                <div className="mt-2 text-xs text-muted-foreground">Criada: {format(new Date(), 'dd/MM/yyyy')}</div>
                                            </div>


                                            <div className="text-right">
                                                <div className="text-sm">Estação(s): <span className="font-medium">{property.stations.length}</span></div>
                                                <div className="text-sm">Ativas: <span className="font-medium">{property.stations.filter((s) => s.isActive).length}</span></div>
                                                {/* {avgFreq !== null && <div className="text-sm">Freq. media <span className="font-medium">{() / 1E6} MHz</span></div>} */}
                                            </div>
                                        </header>


                                        <main className="mt-4 space-y-3">
                                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                                                <div>Atualizado: {format(new Date(property.updateAt), "dd/MM/yyyy HH:mm")}</div>
                                                <div title={formatDistanceToNow(new Date(property.updateAt), { addSuffix: true, locale: ptBR })}>{formatDistanceToNow(new Date(property.updateAt), { addSuffix: true, locale: ptBR })}</div>
                                            </div>


                                            <details className="group">
                                                <summary className="cursor-pointer p-2 rounded-md bg-accent hover:bg-accent/80">Ver estações</summary>
                                                <div className="mt-2 space-y-2">
                                                    {property.stations.map((s) => (
                                                        <StationItem key={s.id} station={s} />
                                                    ))}
                                                </div>
                                            </details>
                                        </main>

                                        <Button asChild variant={"outline"} className="w-full">
                                            <Link href={`/properties/${property.id}`}>Ver mais</Link>
                                        </Button>
                                        <footer className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                                            <div>ClientId: {property.clientId}</div>
                                            <div className="text-right">ID: {property.id}</div>
                                        </footer>
                                    </article>
                                </GroupBodyCards>
                            ))}
                        </div>
                    </div>
                )}
            </ContainerCards>
        </CardsProvider>
    )

}

const StationItem = ({ station }: { station: Station }) => {
    const coords = station.latitude && station.longitude ? `${station.latitude.toFixed(6)}, ${station.longitude.toFixed(6)}` : '—'
    const updatedRelative = formatDistanceToNow(new Date(station.updateAt), { addSuffix: true, locale: ptBR })

    return (
        <div className="flex items-stretch justify-between gap-4 border p-0 rounded-md group h-14">
            <Button
                asChild
                className="h-full rounded-r-none"
            >
                <Link href={`/stations/${station.id}`} prefetch>Ver mais</Link>
            </Button>
            <div className="flex items-start gap-3">
                <div>
                    <div className="text-sm font-medium flex-nowrap">RX {station.rx / 1E6} MHz · TX {station.tx / 1E6} MHz</div>
                    {station.analog && <div className="flex">
                        <Volume className="w-4 h-4" />
                        <div className="text-xs font-normal flex-nowrap">{station.analog?.silent} · {station.analog.encoder}Hz {station.analog.decoder}Hz</div>
                    </div>}
                    <div className="flex">
                        {!!station.latitude && !!station.longitude && <MapPin className="w-4 h-4" />}
                        <span className="text-xs text-muted-foreground">{coords}</span>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-3 p-1">
                <div className="text-xs text-muted-foreground">{updatedRelative}</div>
                <StatusPill active={station.isActive} />
                {station.latitude && station.longitude ? (
                    <a
                        className="text-xs underline"
                        target="_blank"
                        rel="noreferrer"
                        href={`https://www.google.com/maps/search/?api=1&query=${station.latitude},${station.longitude}`}
                    >
                        Ver mapa
                    </a>
                ) : null}
            </div>
        </div>
    )
}

const StatusPill = ({ active }: { active: boolean }) => (
    <span className={`inline-flex items-center gap-2 px-2 py-0.5 text-xs font-medium rounded-full ${active ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
        <span className={`h-2.5 w-2.5 rounded-full ${active ? 'bg-emerald-600' : 'bg-rose-600'}`} />
        {active ? 'Ativa' : 'Inativa'}
    </span>
)

const DialogSelectClient = ({ onSelect, children }: { onSelect: (clientId: number) => void, children: ReactNode }) => {

    const { data: clients } = useClients()
    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    {children}
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Criar nova propriedade</DialogTitle>
                        <DialogDescription>Informe o cliente ao qual a propriedade será atribuída</DialogDescription>
                    </DialogHeader>
                    <Select
                        onValueChange={(value) => onSelect(Number(value))}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Selecione o cliente" />
                        </SelectTrigger>
                        <SelectContent>
                            {clients?.map((client) => (
                                <SelectItem value={String(client.id)} key={client.id}>{client.title} - {client.moreInfos?.city ?? "Cadastro incompleto"}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <p className="text-muted-foreground text-xs">Não encontrou o cliente?
                        <span className="underline">
                            <Link href={'/clients'}>Crie aqui</Link>
                        </span>
                    </p>
                </DialogContent>

            </Dialog>
        </>
    )
}