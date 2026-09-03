'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useCards } from "@/features/card/hooks/hook.cards"
import { useIsMobile } from "@/hooks/use-mobile"
import { ChevronsDown, ChevronsUp, Search } from "lucide-react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useMemo, HTMLAttributes } from "react"

export interface HeaderContainerProps extends HTMLAttributes<HTMLDivElement> {
    availableGroups?: string[]
    activeGroupFilter?: string | null
    collapseAll?: boolean
}

export const HeaderContainer = <T,>({ availableGroups, children, ...props }: HeaderContainerProps) => {
    const isMobile = useIsMobile()
    const { cards, setActiveGroupField, sample, search, setSearch, collapseAllGroups, expandAllGroups } = useCards()

    const router = useRouter()
    const searchParams = useSearchParams()


    const groups = useMemo(() => {
        const src = cards.length ? cards[0] : undefined
        if (!src) return [] as string[]
        return Object.keys(src).filter(k => {
            const v = (src as any)[k]
            return typeof v === 'string' || typeof v === 'number'
        })
    }, [sample, cards])

    const options = availableGroups ?? groups

    const handleSearch = (str: string) => {
        setSearch(str)
        const params = new URLSearchParams(searchParams)
        params.set('search', str)
        router.push(`?${params.toString()}`, { scroll: false })
    }

    return (
        <div
            {...props}
            className="flex flex-col gap-1 p-1 rounded-xl"
        >
            <div className="flex">
                <InputGroup>
                    <InputGroupInput
                        value={search}
                        onChange={(e) => { handleSearch(e.target.value) }}
                        placeholder="Buscar..."
                    />
                    <InputGroupAddon>
                        <Search />
                    </InputGroupAddon>
                </InputGroup>
            </div>

            <div className="flex flex-wrap gap-2 justify-end">
                <Select
                    onValueChange={(value) => {
                        setActiveGroupField?.(value)
                    }}
                >
                    <SelectTrigger className="flex-1">
                        <SelectValue placeholder="Agrupar por?" />
                    </SelectTrigger>
                    <SelectContent>
                        {options.map((item, index) => (
                            <SelectItem value={item} key={item}>{item}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Button
                    variant="outline"
                    onClick={expandAllGroups}
                    className="flex items-center gap-x-1"
                >
                    <ChevronsDown className="h-4 w-4" />
                    Expandir
                </Button>
                <Button
                    variant="outline"
                    onClick={collapseAllGroups}
                    className="flex items-center gap-x-1"
                >
                    <ChevronsUp className="h-4 w-4" />
                    Recolher
                </Button>
            </div>
            {children}
        </div>
    )
}