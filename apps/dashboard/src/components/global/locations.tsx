'use client'

import { KEYS } from "@/core/keys"
import { getCoordinateByCity } from "@/functions/global"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { Button } from "../ui/button"
import { Check, ChevronsUpDown, Loader, Pin } from "lucide-react"
import { Input } from "../ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../ui/command"
import { cn } from "@/lib/utils"
import { Label } from "../ui/label"

interface LocationProps {
    onChange?: (data: any) => void
}

const Location = ({ onChange, ...props }: LocationProps) => {
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState("")
    const [input, setInput] = useState("")
    const [location, setLocation] = useState<[number, number]>([0, 0])
    const { data: city, isFetching } = useQuery({
        queryKey: KEYS.location.getByName({ cityName: input }),
        initialData: [],
        queryFn: getCoordinateByCity,
        enabled: input.length > 3
    })

    const getCurrentLocation = () => {

    }
    return (
        <>
            <Button variant='ghost' onClick={getCurrentLocation}><Pin /></Button>
            <div className="w-full">
                <Label>Se quiser pode selecionar uma cidade em especifico</Label>
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className="w-full justify-between"
                        >
                            {value
                                ? city.find((city) => city.name === value)?.name
                                : "Selecione uma cidade..."}

                            {isFetching ? <Loader className="animate-spin" /> : <ChevronsUpDown className="opacity-50" />}

                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                        <Command>
                            <CommandInput
                                placeholder="Nenhuma cidade encontrada..."
                                onChangeCapture={(e) => setInput((e.target as HTMLInputElement).value)}
                            />
                            <CommandList>
                                <CommandEmpty>Nenhuma cidade encontrada.</CommandEmpty>

                                <CommandGroup>
                                    {!isFetching && city.map((city) => (
                                        <CommandItem
                                            key={city.place_id}
                                            value={city.name}
                                            onSelect={(currentValue) => {
                                                setValue(currentValue === value ? "" : currentValue)
                                                setLocation([city.lon, city.lat])
                                                onChange?.({ lat: city.lat, lon: city.lon })
                                                setOpen(false)
                                            }}
                                        >
                                            {city.name}
                                            <Check
                                                className={cn(
                                                    "ml-auto",
                                                    value === city.name ? "opacity-100" : "opacity-0"
                                                )}
                                            />
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                                <CommandGroup>
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>
            </div>
            <div className="w-full">
                <Label>Latitude</Label>
                <Input
                    placeholder="Latitude"
                    value={location[1]}
                    defaultValue=""
                    onChange={(e) => {
                        setLocation((prev) => [prev[0], +e.target.value])
                        onChange?.({ lat: location[1], lon: location[0] })
                    }}
                />
            </div>
            <div className="w-full">
                <Label>Longitude</Label>
                <Input
                    placeholder="Longitude"
                    value={location[0]}
                    defaultValue=""
                    onChange={(e) => {
                        setLocation((prev) => [+e.target.value, prev[1]])
                        onChange?.({ lat: location[1], lon: location[0] })
                    }}
                />
            </div>
        </>
    )
}
export { Location }