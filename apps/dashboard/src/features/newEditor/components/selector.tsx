'use client'

import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { useCurrentEditor } from "@tiptap/react"
import { ChevronDownIcon } from "lucide-react"
import { HTMLAttributes } from "react"

export type EditorSelectorProps = HTMLAttributes<HTMLDivElement> & {
    open?: boolean
    onOpenChange?: (open: boolean) => void
    title: string
}

export const EditorSelector = ({
    open,
    onOpenChange,
    title,
    className,
    children,
    ...props
}: EditorSelectorProps) => {
    const { editor } = useCurrentEditor()

    if (!editor) {
        return null
    }

    return (
        <Popover modal onOpenChange={onOpenChange} open={open}>
            <PopoverTrigger asChild>
                <Button
                    className="gap-2 rounded-none border-none"
                    size="sm"
                    variant="ghost"
                >
                    <span className="whitespace-nowrap text-xs">{title}</span>
                    <ChevronDownIcon size={12} />
                </Button>
            </PopoverTrigger>
            <PopoverContent
                align="start"
                className={cn('w-48 p-1', className)}
                sideOffset={5}
                {...props}
            >
                {children}
            </PopoverContent>
        </Popover>
    )
}