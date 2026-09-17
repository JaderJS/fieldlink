import { cn } from "@/lib/utils"
import { Button } from "../ui/button"
import { FormControl } from "../ui/form"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { CalendarIcon } from "lucide-react"
import { addDays, format } from "date-fns"
import { Calendar } from "../ui/calendar"
import { ptBR } from "date-fns/locale"
import { forwardRef, InputHTMLAttributes, useState } from "react"
import { DateRange, DaySelectionMode } from "react-day-picker"

interface InputCalendarProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value' | 'disabled'> {
    mode?: 'single' | 'range'
    onChange: (data: Date) => void
    value: Date
    disabled?: [Date, Date]
}


const InputCalendar = forwardRef<HTMLDivElement, InputCalendarProps>(({ className, onChange, value, disabled, mode = 'single', ...props }, ref) => {

    const handleDisabled = (date: Date) => {
        const upDate = disabled?.[0] ?? new Date("2030-01-01")
        const downDate = disabled?.[1] ?? new Date("1900-01-01")
        return (date > upDate || date < downDate)
    }

    return (
        <div className={cn(className)}>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant={"outline"}
                        className={cn(
                            "w-full pl-3 text-left font-normal",
                            !value && "text-muted-foreground"
                        )}
                    >
                        {value ? (
                            format(value, "P", { locale: ptBR })
                        ) : (
                            <span>Selecione a data</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="center">
                    <Calendar
                        mode='single'
                        selected={value}
                        locale={ptBR}
                        onSelect={(date) => {
                            if (date) {
                                onChange(date)
                            }
                        }}
                        disabled={handleDisabled}
                        initialFocus
                    />
                </PopoverContent>
            </Popover>
        </div>

    )
})
InputCalendar.displayName = 'InputCalendar'

export { InputCalendar }