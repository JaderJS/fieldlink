"use client"

import { useId, useState } from "react"
import { CheckIcon, ChevronDownIcon, PlusIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command"
import { Label } from "@/components/ui/label"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

interface CustomSelectOrderStatusProps {
    onValueChange: (value: { id?: number | string, label: string, color?: string }) => void
    onCreate?: (value: { label: string, color?: string }) => void
    options: { label: string, id: number | string, color?: string }[]
    values: { label: string, id: number | string, color?: string }[]
    label: string
}

export function CustomSelectOrderStatus({ label, options = [], values, onValueChange, onCreate }: CustomSelectOrderStatusProps) {
    const id = useId()
    const [open, setOpen] = useState<boolean>(false)
    const [search, setSearch] = useState<string>("")

    const exists = options.some((option) => option.label.toLowerCase() === search.toLowerCase())
    const filteredOptions = options.filter(options => options.label.toLowerCase().includes(search.toLowerCase()))

    return (
        <div className="*:not-first:mt-2">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        id={id}
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="bg-background hover:bg-background border-input w-full justify-between px-3 font-normal outline-offset-0 outline-none focus-visible:outline-[3px]"
                    >
                        <div className="flex items-center gap-2">
                            {values.length > 0 && (
                                <div
                                    className="w-3 h-3 rounded-full"
                                    style={{
                                        backgroundColor:
                                            options.find((opt) => values.some((v) => v.id === opt.id))?.color ||
                                            "#808080",
                                    }}
                                />
                            )}
                            <span className={cn("truncate font-semibold", !values && "text-muted-foreground")}>
                                {values
                                    ? options.find((option) => values.map(v => v.id).includes(option.id))?.label
                                    : `Selecione o ${label}`}
                            </span>
                        </div>
                        <ChevronDownIcon
                            size={16}
                            className="text-muted-foreground/80 shrink-0"
                            aria-hidden="true"
                        />
                    </Button>
                </PopoverTrigger>
                <PopoverContent
                    className="border-input w-full min-w-[var(--radix-popper-anchor-width)] p-0"
                    align="start"
                >
                    <Command shouldFilter={false}>
                        <CommandInput
                            placeholder={`Encontre ${label}`}
                            value={search}
                            onValueChange={setSearch}
                        />
                        <CommandList>
                            <CommandEmpty>{`Nenhum ${label} encontrada.`}</CommandEmpty>
                            <CommandGroup>
                                {filteredOptions.map((option) => (
                                    <CommandItem
                                        key={option.id}
                                        value={String(option.id)}
                                        onSelect={(currentValue) => {
                                            onValueChange(option)
                                            setOpen(false)
                                        }}
                                    >
                                        <div
                                            className="w-3 h-3 rounded-full mr-2"
                                            style={{ backgroundColor: option.color || "#808080" }}
                                        />
                                        {option.label}
                                        {values.map(v => v.id).includes(option.id) && (
                                            <CheckIcon size={16} className="ml-auto" />
                                        )}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                            {!exists && search.trim() && (
                                <>
                                    <CommandSeparator />
                                    <CommandGroup>
                                        <Button
                                            variant="ghost"
                                            className="w-full justify-start font-normal"
                                            onClick={() => {
                                                onCreate?.({
                                                    label: search.trim(),
                                                    color: "#808080",
                                                })
                                                onValueChange({
                                                    label: search.trim(),
                                                    color: "#808080",
                                                })
                                                setOpen(false)
                                            }}
                                        >
                                            <PlusIcon
                                                size={16}
                                                className="-ms-2 opacity-60"
                                                aria-hidden="true"
                                            />
                                            Criar “{search}”
                                        </Button>
                                    </CommandGroup>
                                </>
                            )}
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    )
}
