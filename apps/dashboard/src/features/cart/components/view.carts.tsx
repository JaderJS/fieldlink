'use client'

import { KEYS } from "@/core/keys"
import { useMutation, useQuery, useQueryClient, useSuspenseQuery } from "@tanstack/react-query"
import { deleteCart, getCarts, upsertCart } from "../services/crud"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { formatDistanceToNow, isFuture, isPast } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Button } from "@/components/ui/button"
import { defaultNewCart } from "../constants/new.cart"
import Link from "next/link"
import { AvatarStack } from "@/components/ui/kibo-ui/avatar-stack"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { formatToBRL } from "@/functions/utils"
import { Check, Trash } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuth } from "@/providers/auth"
import { getBanks } from "@/features/adm/services/bank.crud"
import { getPeriods } from "@/features/adm/services/period.crud"

import { CardsProvider, ContainerCards, GroupBodyCards, GroupHeaderCards, HeaderContainer } from "@/features/card"
import { useUpsertCart } from "../hooks/use.upsert.cart"
import { useCarts } from "../hooks/use.carts"
import { useBanks } from "@/features/bank/hooks/useBanks"
import { usePeriods } from "@/features/period/hooks/usePeriods"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"

export const ViewCarts = () => {

    const { user, hasPermission } = useAuth()

    const { data: carts } = useCarts()
    const { mutateAsync: upsertCartFn } = useUpsertCart()

    const handleNewCart = () => {
        const promise = upsertCartFn({ ...defaultNewCart() })
        toast.promise(promise, { loading: "Adicionando nova compra...", success: "Compra adicionada", error: (error) => `Erro ao adicionar compra ${error}` })
    }

    const authorizedDeleteCart = !!user && hasPermission(user, 'cart', 'delete')

    type CardType = NonNullable<typeof carts>[number]

    if (!carts?.length) {
        return (
            <div className="flex-1 h-full flex flex-col justify-center items-center">
                <p>Ainda não existe nenhuma compra... Deseja criar uma compra?</p>
                <Button onClick={handleNewCart} variant="link">Criar nova compra</Button>
            </div>
        )
    }

    return (
        <CardsProvider
            initialCards={carts}
        >
            <HeaderContainer>
                <Button onClick={handleNewCart}>Nova compra</Button>
            </HeaderContainer>

            <ContainerCards<CardType> className="grid">
                {([group, cards]) => (
                    <div key={group} className="space-y-3">
                        <GroupHeaderCards groupKey={group} itemCount={cards.length} showToggleButton>
                            {group}
                        </GroupHeaderCards>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                            {cards.map((cart) => (
                                <GroupBodyCards
                                    key={cart.id}
                                    groupKey={group}
                                    className="h-full rounded-xl"
                                >
                                    <Card className="h-full flex flex-col">
                                        <CardHeader>
                                            <CardTitle className="line-clamp-1">{cart.title}</CardTitle>
                                        </CardHeader>

                                        <CardContent className="flex flex-col gap-4 flex-1">
                                            {/* Produtos no carrinho */}
                                            <div className="flex justify-between items-center">
                                                <AvatarStack>
                                                    {cart.productsOnCart.slice(0, 5).map((p) => (
                                                        <Avatar key={p.productId}>
                                                            <AvatarImage src={p.product.pictureUrl} />
                                                            <AvatarFallback>{p.product.name[0]}</AvatarFallback>
                                                        </Avatar>
                                                    ))}
                                                </AvatarStack>
                                                {cart.productsOnCart.length > 5 && (
                                                    <span className="text-muted-foreground text-xs">
                                                        + {cart.productsOnCart.length - 5} itens
                                                    </span>
                                                )}
                                            </div>

                                            <Separator />

                                            {/* Parcelas */}
                                            <div className="space-y-1">
                                                {cart.transaction.installments.map(
                                                    ({ id, value, billed, dueAt }, idx) => (
                                                        <Button
                                                            key={id}
                                                            variant="ghost"
                                                            size="sm"
                                                            className="w-full justify-start"
                                                            asChild
                                                        >
                                                            <Link href={`/installments/${id}`}>
                                                                <span
                                                                    className={cn(
                                                                        "flex items-center gap-1 text-xs",
                                                                        billed && "text-emerald-700"
                                                                    )}
                                                                >
                                                                    {billed && (
                                                                        <Check className="w-4 h-4 shrink-0" />
                                                                    )}
                                                                    {idx + 1} x {formatToBRL(value)}
                                                                    {!billed && (
                                                                        <span
                                                                            className={cn(
                                                                                isPast(dueAt) && "text-red-600"
                                                                            )}
                                                                        >
                                                                            {" "}
                                                                            {isPast(dueAt) ? "há" : "em"}{" "}
                                                                            {formatDistanceToNow(dueAt, { locale: ptBR })}
                                                                        </span>
                                                                    )}
                                                                </span>
                                                            </Link>
                                                        </Button>
                                                    )
                                                )}
                                            </div>
                                        </CardContent>

                                        <CardFooter className="flex flex-col gap-2 p-3 border-t">
                                            <Button className="w-full" variant="outline" asChild>
                                                <Link href={`/cart/${cart.id}`}>Ver detalhes</Link>
                                            </Button>

                                            <div className="flex justify-between items-center w-full text-xs text-muted-foreground">
                                                {user?.role === "ROOT" && <span>#{cart.id}</span>}
                                                <span>
                                                    {formatDistanceToNow(cart.createdAt, { locale: ptBR })}
                                                </span>
                                            </div>
                                        </CardFooter>
                                    </Card>
                                </GroupBodyCards>
                            ))}
                        </div>
                    </div>
                )}
            </ContainerCards>
        </CardsProvider>
    )

}