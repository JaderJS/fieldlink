"use client"

import React, { useState, ElementType, ComponentType, SVGProps, useEffect } from "react"
import { Check, ChevronsUpDown, Plus } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

interface ComboboxProps {
    enableSearch?: boolean
    placeholder?: string
    options: { icon?: Element, value: string, label: string }[]
    onSelect?: (value: string) => void
    onCreate?: (value: string) => void
}

const Combobox = ({ onSelect, onCreate, options: options_, placeholder = "Selecione uma opção...", enableSearch = false }: ComboboxProps) => {
    const [open, setOpen] = useState(false)
    const [options, setOptions] = useState<{ icon?: Element, value: string, label: string }[]>(options_)
    const [values, setValues] = useState<{ value: string, label: string }[]>([])
    const [search, setSearch] = useState<string>()

    useEffect(() => {
        setOptions(options_)
    }, [options_])
    
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                >
                    {values.length !== 0
                        ? options.find(({ icon: Icon, value, label }) => value === value)?.label
                        : placeholder}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    {enableSearch && <CommandInput placeholder="Busca..." onValueChange={(search) => setSearch(() => search)} />}
                    <CommandList >
                        <CommandEmpty>Nenhuma opção encontrada</CommandEmpty>
                        <CommandGroup>
                            {options.map(({ value, label }) => (
                                <CommandItem
                                    key={value}
                                    value={value}
                                    onSelect={(currentValue) => {
                                        const c = options.filter(({ value }) => value === currentValue)
                                        setValues(c)
                                        onSelect?.(currentValue)
                                        setOpen(false)
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            !!options.find(({ value: v }) => v === value) ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    {label}
                                </CommandItem>
                            ))}
                            {enableSearch && !!search && <CommandItem value={search} onSelect={(value) => onCreate?.(value)}>
                                <Plus className={cn("mr-2 h-4 w-4 text-emerald-700")} />{search ?? "Novo item"}
                            </CommandItem>}
                        </CommandGroup>

                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}

export {
    Combobox,
}
