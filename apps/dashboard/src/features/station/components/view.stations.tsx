'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Clock, MapPin, Radio, Wifi } from "lucide-react"
import { AvatarStack } from "@/components/ui/kibo-ui/avatar-stack"
import { CardsProvider, ContainerCards, GroupBodyCards, GroupHeaderCards, HeaderContainer } from "@/features/card"
import { useStations } from "../hooks/use.stations"
import { cn } from "@/lib/utils"
import { useUpsertStation } from "../hooks/use.upsert.station"
import { defaultNewStation } from "../constants/default.new.station"
import { toast } from "sonner"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

export const ViewStations = () => {
    const { data: stations } = useStations()
    const { mutateAsync: upsertStationFn } = useUpsertStation()
    type CardType = Omit<NonNullable<typeof stations>[number], "content">

    const handleNewStation = () => {
        // const promise = upsertStationFn(defaultNewStation({ propertyId: 0 }))
        // toast.promise(promise, { loading: "Criando nova estação...", success: "Estação criada com sucesso." })
    }

    if (stations?.length === 0) {
        return (
            <div className="flex-1 h-full flex flex-col justify-center items-center">
                <p>Ainda não existe nenhuma estação cadastrada...</p>
            </div>
        )
    }


    return (
        <>
            <Dialog>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Nova estação</DialogTitle>
                        <DialogDescription>Insira os dados para criar a estação.</DialogDescription>
                    </DialogHeader>
                </DialogContent>
                <DialogFooter>
                    <DialogClose>Cancel</DialogClose>
                    <Button variant={"ghost"}>Salvar</Button>
                </DialogFooter>
            </Dialog>
            {stations?.length && (
                <CardsProvider initialCards={stations}>
                    <HeaderContainer>
                        <Button onClick={handleNewStation}>Nova estação</Button>
                    </HeaderContainer>

                    <ContainerCards<CardType> className="grid">
                        {([group, cards]) => (
                            <div key={group}>
                                <GroupHeaderCards className="capitalize" groupKey={group} itemCount={cards.length} showToggleButton>
                                    {group}
                                </GroupHeaderCards>

                                <div className="grid grid-cols-2 gap-3">
                                    {cards.map((station) => {
                                        const lat = station.latitude?.toFixed(4)
                                        const lng = station.longitude?.toFixed(4)
                                        const mapsUrl = lat && lng
                                            ? `https://www.google.com/maps?q=${lat},${lng}`
                                            : null

                                        return (
                                            <GroupBodyCards key={station.id} groupKey={group} className="h-full">
                                                <Card className="h-full flex flex-col">
                                                    <CardHeader>
                                                        <div className="flex justify-between items-center">
                                                            <CardTitle className="truncate">
                                                                {station.property?.title ?? "Sem propriedade"}
                                                            </CardTitle>
                                                            <Badge
                                                                className={`inline-flex items-center gap-2 px-2 py-0.5 text-xs font-medium rounded-full ${station.isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}
                                                                variant="outline"
                                                            >
                                                                {station.isActive ? 'Ativa' : 'Inativa'}
                                                            </Badge>
                                                        </div>

                                                        <CardDescription className="flex items-center gap-2 mt-1">
                                                            <Radio className="h-4 w-4 text-muted-foreground" />
                                                            RX {station.rx / 1e6} MHz · TX {station.tx / 1e6} MHz
                                                        </CardDescription>

                                                        {lat && lng && (
                                                            <CardDescription className="flex items-center gap-2 mt-1">
                                                                <MapPin className="h-4 w-4 text-muted-foreground" />
                                                                {lat}, {lng}
                                                                {mapsUrl && (
                                                                    <Button asChild variant="link" size="sm" className="px-1 h-auto text-xs">
                                                                        <a href={mapsUrl} target="_blank" rel="noopener noreferrer">
                                                                            Ver no mapa
                                                                        </a>
                                                                    </Button>
                                                                )}
                                                            </CardDescription>
                                                        )}
                                                    </CardHeader>

                                                    <CardContent className="flex flex-col gap-3 flex-1">
                                                        <div className="flex justify-between items-center">
                                                            <AvatarStack>
                                                                {station.equipments.slice(0, 5).map((eq) => (
                                                                    <Avatar key={eq.id}>
                                                                        <AvatarImage src={eq.product.pictureUrl} />
                                                                        <AvatarFallback>{eq.nickname}</AvatarFallback>
                                                                    </Avatar>
                                                                ))}
                                                            </AvatarStack>
                                                            {station.equipments.length > 5 && (
                                                                <span className="text-xs text-muted-foreground">
                                                                    +{station.equipments.length - 5}
                                                                </span>
                                                            )}
                                                        </div>

                                                        <Button className="w-full" variant="secondary" asChild>
                                                            <Link href={`/stations/${station.id}`} key={station.id}>
                                                                Ver detalhes
                                                            </Link>
                                                        </Button>
                                                    </CardContent>

                                                    <CardFooter className="flex justify-between gap-x-2 text-xs text-muted-foreground">
                                                        <span>#{station.id}</span>
                                                        <span className="flex items-center gap-1">
                                                            <Clock className="w-3 h-3" />
                                                            {formatDistanceToNow(new Date(station.createAt), { locale: ptBR })}
                                                        </span>
                                                    </CardFooter>
                                                </Card>
                                            </GroupBodyCards>
                                        )
                                    })}
                                </div>
                            </div>
                        )}
                    </ContainerCards>
                </CardsProvider>
            )}
        </>
    )
}
