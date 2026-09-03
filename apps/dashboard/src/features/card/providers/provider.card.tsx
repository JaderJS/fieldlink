'use client'

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useMemo, useState } from "react";

export type ICard = {
    id: string | number
    title: string
    content?: ReactNode
    metadata?: Record<string, unknown>
} & Record<string, unknown>

export type KeysOfType<T, V> = { [K in keyof T]: T[K] extends V ? K : never }[keyof T]
export type GroupKey<T> = Extract<KeysOfType<T, string | number>, string | number>

export interface CardsContextProps<T> {
    cards: T[]
    setCards: Dispatch<SetStateAction<T[]>>
    addCard: (card: T) => void
    removeCard: (id: string | number) => void

    search: string
    setSearch: Dispatch<SetStateAction<string>>

    activeGroupField?: string | number | undefined
    setActiveGroupField?: (f: string | number) => void

    sample?: T | undefined

    collapsedGroups: Record<string, boolean>
    toggleGroup: (groupKey: string) => void
    collapseAllGroups: () => void
    expandAllGroups: () => void
}

export const CardsContext = createContext<CardsContextProps<any> | undefined>(undefined)

export const CardsProvider = <T extends Record<string, any>,>({
    children,
    initialCards = []
}: {
    children: ReactNode,
    initialCards: T[],
}) => {
    const searchParams = useSearchParams()
    const search_ = searchParams.get('search')


    const [cards, setCards] = useState<T[]>(initialCards.map(c => ({ ...c, id: String((c as any).id) } as unknown as T)))
    const [search, setSearch] = useState<string>(search_ || "")
    const [activeGroupField, setActiveGroupFieldState] = useState<GroupKey<T> | undefined>(undefined)
    const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>({})

    const handleSearch = (search: string) => {

    }

    const toggleGroup = (groupKey: string) => {
        setCollapsedGroups((prev) => ({ ...prev, [groupKey]: !prev[groupKey] }))
    }

    const collapseAllGroups = () => {
        setCollapsedGroups(prev => {
            const newState: Record<string, boolean> = {}
            Object.keys(prev).forEach(key => {
                newState[key] = true
            })
            return newState
        })
    }

    const expandAllGroups = () => {
        setCollapsedGroups(prev => {
            const newState: Record<string, boolean> = {}
            Object.keys(prev).forEach(key => {
                newState[key] = false
            })
            return newState
        })
    }


    const value = useMemo(() => ({
        cards,
        setCards,
        addCard: (card: T) => setCards(prev => [...prev, { ...(card as any), id: String((card as any).id) } as T]),
        removeCard: (id: string | number) => setCards(prev => prev.filter(c => String(c.id) !== String(id))),

        search,
        setSearch,

        activeGroupField,
        setActiveGroupField: (f?: string | number) => setActiveGroupFieldState(f as GroupKey<T>),

        sample: cards.length ? cards[0] : undefined,

        collapsedGroups,
        toggleGroup,
        collapseAllGroups,
        expandAllGroups
    }), [initialCards, cards, search, activeGroupField, collapsedGroups])

    useEffect(() => {
        setCards(initialCards.map(c => ({ ...c, id: String((c as any).id) } as unknown as T)))
    }, [initialCards])

    return (
        <CardsContext.Provider value={value}>
            {children}
        </CardsContext.Provider>
    )
}