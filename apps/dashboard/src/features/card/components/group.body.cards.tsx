// components/group-body-cards.tsx
'use client'

import { ReactNode } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { useCards } from "@/features/card/hooks/hook.cards"

export interface GroupBodyCardsProps {
    children: ReactNode
    groupKey: string
    className?: string
}

export const GroupBodyCards = ({
    children,
    groupKey,
    className = ""
}: GroupBodyCardsProps) => {
    const { collapsedGroups } = useCards()
    const isCollapsed = collapsedGroups[groupKey] ?? false
    
    return (
        <AnimatePresence initial={false} >
            {!isCollapsed && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className={cn("overflow-hidden", className)}
                >
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    )
}