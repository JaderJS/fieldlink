'use client'
import { useContext } from "react"
import { CardsContext } from "@/features/card/providers/provider.card"


export const useCards = () => {
    const context = useContext(CardsContext)
    if (!context) {
        throw new Error('useCards must be used within a CardsProvider')
    }
    return context
}