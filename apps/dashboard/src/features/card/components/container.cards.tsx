'use client'

import { HTMLAttributes, ReactNode, useMemo } from "react"
import { useCards } from "@/features/card/hooks/hook.cards"
import { AnimatePresence } from "framer-motion"
import { ICard } from "@/features/card/providers/provider.card"
import { matchSearch } from "@/features/card/utils/search"

type KeysOfType<T, V> = { [K in keyof T]: T[K] extends V ? K : never }[keyof T]

export interface ContainerCardsProps<T extends ICard = ICard> extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
    // children: (card: T) => ReactNode
    children: (groupCard: [string, T[]]) => ReactNode
    groupByField?: KeysOfType<T, string | number>
    groupBy?: (item: T) => string | number | undefined
    groupOrder?: Array<string | number>
    filter?: (item: T) => boolean
    renderEmpty?: ReactNode
    renderGroupHeader?: (group: string) => ReactNode
}

export const ContainerCards = <T extends ICard>({
    children,
    renderEmpty,
    groupBy,
    groupByField,
    groupOrder,
    filter,
    renderGroupHeader,
    ...props
}: ContainerCardsProps<T>) => {

    const { cards, activeGroupField, search } = useCards()

    const baseData = useMemo(() => (filter ? cards.filter(filter) : cards), [cards, filter])

    const effectiveGroupField = (groupByField ?? activeGroupField) as KeysOfType<T, string | number> | undefined

    const data = useMemo(() => {
        const search_ = String(search ?? "").trim().toLowerCase()
        if (!search_) return baseData

        return baseData.filter(item => {
            const title = (item as any).title
            if (typeof title === 'string' && title.toLowerCase().includes(search_)) return true
            return matchSearch(item, search)
        })
    }, [baseData, search])

    const getKey = (item: T) => {
        if (groupBy) return String(groupBy(item) ?? "outros")
        if (effectiveGroupField) return String((item as any)[effectiveGroupField] ?? 'outros')
        return "all"
    }

    const grouped = useMemo(() => {
        return data.reduce<Record<string, T[]>>((acc, card) => {
            const key = getKey(card)
            acc[key] ??= []
            acc[key].push(card)
            return acc
        }, {})
    }, [data, groupBy, effectiveGroupField])

    const orderedGroups = useMemo(() => {
        if (!groupBy && !effectiveGroupField) return [['all', grouped['all'] ?? data] as [string, T[]]]
        if (groupOrder?.length) {
            const set = new Set(groupOrder.map(String))
            const ordered: [string, T[]][] = []
            for (const g of groupOrder) {
                if (grouped[String(g)]) ordered.push([String(g), grouped[String(g)]])
            }
            for (const [k, v] of Object.entries(grouped)) if (!set.has(k)) ordered.push([k, v])
            return ordered
        }
        return Object.entries(grouped)
    }, [grouped, data, groupBy, groupOrder, effectiveGroupField])

    return (
        <div {...props}>
            {data.length > 0 ? (
                orderedGroups.map((groupCard) => children(groupCard))
            ) : (
                <div className="col-span-full text-center text-muted-foreground">
                    Nenhum item encontrado
                </div>
            )}
        </div>
    )

}
