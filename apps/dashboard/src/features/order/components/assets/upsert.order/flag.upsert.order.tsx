import {
    Combobox, ComboboxContent, ComboboxCreateNew, ComboboxEmpty,
    ComboboxGroup, ComboboxInput, ComboboxItem, ComboboxList,
    ComboboxTrigger
} from "@/components/ui/kibo-ui/combobox"
import { KEYS } from "@/core/keys"
import { getOrders } from "@/features/order/services/crud.order"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useMemo, useState } from "react"

interface FlagUpsertOrderProps {
    value?: string
    onSelect?: (value: string) => void
    onCreateNew?: (value: string) => void
    className?: string
}

export const FlagUpsertOrder = ({
    value: propValue,
    onSelect,
    onCreateNew,
    className
}: FlagUpsertOrderProps) => {
    const { data: ordersFlag, isLoading, isError } = useQuery({
        queryKey: KEYS.order.getAll(),
        queryFn: getOrders,
        select: data => data.orders,
        staleTime: 60 * 1000 // 1 minuto
    })

    const [internalValue, setInternalValue] = useState(propValue || '')

    const frameworks = useMemo(() => {
        const flags = Array.from(new Set(ordersFlag?.map(o => o.flag) || []))
        return flags.map(value => ({
            value,
            label: value
        }))
    }, [ordersFlag])

    useEffect(() => {
        setInternalValue(propValue || '')
    }, [propValue])

    const handleValueChange = (newValue: string) => {
        setInternalValue(newValue)
        onSelect?.(newValue)
    }

    const handleCreateNew = (newValue: string) => {
        if (!newValue.trim()) return

        const normalizedValue = newValue.toLowerCase().replace(/\s+/g, '-')

        onCreateNew?.(normalizedValue)
        handleValueChange(normalizedValue)
    }

    if (isLoading) return <ComboboxSkeleton/>

    return (
        <Combobox
            type="flag"
            value={internalValue}
            onValueChange={handleValueChange}
            data={frameworks}
        >
            <ComboboxTrigger className={className} />
            <ComboboxContent>
                <ComboboxInput placeholder="Select or create a flag" />
                <ComboboxEmpty>
                    <ComboboxCreateNew onCreateNew={handleCreateNew} />
                </ComboboxEmpty>
                <ComboboxList>
                    <ComboboxGroup>
                        {frameworks.map(({ label, value }) => (
                            <ComboboxItem key={value} value={value}>
                                {label}
                            </ComboboxItem>
                        ))}
                    </ComboboxGroup>
                </ComboboxList>
            </ComboboxContent>
        </Combobox>
    )
}

const ComboboxSkeleton = () => (
    <div className="animate-pulse h-10 w-full rounded-md bg-muted" />
)

const ComboboxError = () => (
    <div className="text-destructive text-sm">Failed to load flags</div>
)