'use client'

import { ContainerCards } from "@/features/card/components/container.cards"
import { CardsProvider, ICard } from "@/features/card/providers/provider.card"
import { HeaderContainer } from "@/features/card/components/header.container.card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GroupHeaderCards } from "./group.header.card"
import { GroupBodyCards } from "./group.body.cards"

type Purchase = {
    id: string
    title: string
    status?: 'pendente' | 'pago' | 'cancelado'
    category?: string
    amount?: number
}

export const DebugCustomCard = () => {
    const data: Purchase[] = Array.from({ length: 100 }).map((_, i) => ({
        id: String(i),
        title: `title-${i}`,
        status: i % 3 === 0 ? 'pendente' : i % 3 === 1 ? 'pago' : 'cancelado',
        category: i % 2 === 0 ? 'A' : 'B',
        amount: i * 10
    }))

    return (
        <>
            <CardsProvider<Purchase>
                initialCards={data}
            >
                <HeaderContainer>
                </HeaderContainer>
                <ContainerCards<Purchase>
                    className="grid grid-cols-2"
                >

                    {([group, cards]) => (
                        <div key={group}>
                            <GroupHeaderCards
                                className="capitalize"
                                showToggleButton
                                itemCount={cards.length}
                                groupKey={group}
                            >
                                {group}
                            </GroupHeaderCards>
                            <div className="grid grid-cols-3">
                                {cards.map((card) => (
                                    <GroupBodyCards
                                        key={card.id}
                                        groupKey={group}
                                    >
                                        <Card key={card.id}>{card.title}</Card>
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