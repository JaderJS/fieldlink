'use client'

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { formatToBRL, getBgColorByWord } from "@/components/utils"
import { cn } from "@/lib/utils"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import Image from "next/image"
import Link from "next/link"
import { getProducts, upsertProduct } from "../services/crud"
import { DEFAULT_NEW_PRODUCT } from "../constants/new.product"
import { KEYS } from "@/core/keys"
import { CardsProvider, ContainerCards, GroupBodyCards, GroupHeaderCards, HeaderContainer } from "@/features/card"
import { Info, TrendingUp } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export const ViewCardProducts = () => {

    const queryClient = useQueryClient()

    const { data: products } = useQuery({
        queryKey: KEYS.product.getAll(),
        queryFn: getProducts,
        select: data => data.products.map((product) => ({ ...product, title: product.name }))
    })

    const { mutateAsync: upsertProductFn } = useMutation({
        mutationFn: upsertProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: KEYS.product.getAll() })
        }
    })

    type CardType = NonNullable<typeof products>[number]

    return (
        <>
            <section>
                {products?.length && <CardsProvider
                    initialCards={products}
                >
                    <HeaderContainer>
                        <Button
                            className="w-full"
                            onClick={() => upsertProductFn(DEFAULT_NEW_PRODUCT)}
                        >
                            Novo produto
                        </Button>
                    </HeaderContainer>
                    <ContainerCards<CardType>>
                        {([group, products]) => (
                            <div key={group}>
                                <GroupHeaderCards
                                    className="capitalize"
                                    itemCount={products.length}
                                    groupKey={group}
                                >
                                    {group}
                                </GroupHeaderCards>
                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                                    {products.map((product) => (
                                        <GroupBodyCards key={product.id} groupKey={group}>
                                            <CardProduct product={product} />
                                        </GroupBodyCards>
                                    ))}
                                </div>
                            </div>
                        )}
                    </ContainerCards>
                </CardsProvider>}
            </section>
        </>
    )
}

const CardProduct = ({ product }: { product: Product }) => {
    return (
        <Card className="h-full flex flex-col">
            <CardHeader>
                <CardTitle className="line-clamp-2">{product.name}</CardTitle>
                <CardDescription className="line-clamp-1">{product.name}</CardDescription>
                <div className="flex justify-between gap-1">
                    <div className="flex gap-1">
                        {product.categories?.slice(0, 2)?.map(({ name, id }) => (
                            <Badge key={id} className={cn("text-xs truncate", getBgColorByWord(name))}>
                                {name}
                            </Badge>
                        ))}
                    </div>
                    {product.summary.variation !== 0 && (
                        <Badge variant={"outline"} className="text-xs truncate">
                            <TrendingUp />
                            {product.summary.variation.toFixed(2)}%
                        </Badge>
                    )}
                    <ProductsMoreInfos product={product} />
                </div>
            </CardHeader>
            <CardContent className="relative aspect-square p-2 flex-1">
                {product.pictureUrl && (
                    <Image
                        alt={product.name}
                        src={product.pictureUrl}
                        fill
                        className="object-contain p-2"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                )}
            </CardContent>
            <CardFooter className="p-4 pt-2 flex flex-col gap-2">
                <div className="flex justify-between items-center w-full">
                    <span className="text-sm font-bold text-green-600">
                        {formatToBRL(product.price)}
                    </span>
                    <span className="text-xs text-muted-foreground line-through">
                        {formatToBRL(product.cost)}
                    </span>
                </div>

                <div className="flex justify-between items-center w-full">
                    <span className={`text-xs ${product.stock > 0 ? 'text-blue-600' : 'text-red-600'}`}>
                        {product.stock > 0 ? `${product.stock} em estoque` : 'Esgotado'}
                    </span>
                </div>

                <span className="text-xs text-muted-foreground truncate">
                    {`Unidade: ${product.stock}`}
                </span>

                <Button variant={"outline"} className="w-full" asChild >
                    <Link href={`/product/${product.id}`}>
                        Ver mais
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    )
}

const ProductsMoreInfos: React.FC<{ product: Product }> = ({ product }) => {
    const s = product.summary ?? {
        maxPrice: 0,
        minPrice: 0,
        avgPrice: 0,
        variation: 0,
        total: { out: 0, in: 0 },
        _count: { sales: 0 }
    }

    const sold = s._count?.sales ?? s.total?.out ?? product.salesOnProduct.reduce((acc, s) => acc + s.quantity, 0)
    const avgPrice = s.avgPrice ?? (sold > 0 ? (product.salesOnProduct.reduce((acc, it) => acc + (it.price * it.quantity), 0) / sold) : product.price)
    const estRevenue = avgPrice * sold

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant={"ghost"} size={"icon-sm"}>
                    <Info />
                </Button>
            </PopoverTrigger>


            <PopoverContent className="w-72">
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <div className="text-sm font-semibold">Resumo</div>
                        <div className="text-xs text-muted-foreground">Atualizado: {new Date(product.updatedAt).toLocaleDateString()}</div>
                    </div>


                    <div className="grid grid-cols-2 gap-3 text-xs">
                        <div className="rounded-md p-2 bg-muted/5">
                            <div className="text-muted-foreground text-[11px]">Máx</div>
                            <div className="font-medium">{formatToBRL(s.maxPrice)}</div>
                        </div>


                        <div className="rounded-md p-2 bg-muted/5">
                            <div className="text-muted-foreground text-[11px]">Mín</div>
                            <div className="font-medium">{formatToBRL(s.minPrice)}</div>
                        </div>


                        <div className="rounded-md p-2 bg-muted/5">
                            <div className="text-muted-foreground text-[11px]">Média</div>
                            <div className="font-medium">{formatToBRL(avgPrice)}</div>
                        </div>


                        <div className="rounded-md p-2 bg-muted/5 text-right">
                            <div className="text-muted-foreground text-[11px]">Variação</div>
                            <div className={s.variation >= 0 ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>{s.variation.toFixed(2)}%</div>
                        </div>
                    </div>


                    <div className="h-px bg-muted/10" />


                    <div className="text-xs">
                        <div className="flex justify-between">
                            <div className="text-muted-foreground">Saídas</div>
                            <div className="font-medium">{s.total?.out ?? 0}</div>
                        </div>
                        <div className="flex justify-between">
                            <div className="text-muted-foreground">Entradas</div>
                            <div className="font-medium">{s.total?.in ?? 0}</div>
                        </div>
                        <div className="flex justify-between">
                            <div className="text-muted-foreground">Vendas (linhas)</div>
                            <div className="font-medium">{s._count?.sales ?? 0}</div>
                        </div>
                    </div>


                    <div className="h-px bg-muted/10" />


                    <div className="text-xs text-muted-foreground">Receita estimada</div>
                    <div className="text-sm font-semibold">{formatToBRL(estRevenue)}</div>


                </div>
            </PopoverContent>
        </Popover>
    )
}