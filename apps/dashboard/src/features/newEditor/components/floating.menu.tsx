'use client'

import { cn } from "@/lib/utils"
import { FloatingMenuProps, FloatingMenu } from "@tiptap/react/menus"
import { BubbleMenuButton, EditorButtonProps } from "@/features/newEditor/components/bubble.menu"
import { useCurrentEditor } from "@tiptap/react"
import { BoldIcon, CheckIcon, ExternalLinkIcon, Heading1Icon, ItalicIcon, StrikethroughIcon, TableIcon, TrashIcon } from "lucide-react"
import { FormEventHandler, useEffect, useRef, useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"

export type EditorFloatingMenuProps = Omit<FloatingMenuProps, 'editor'>

export const EditorFloatingMenu = ({ className, ...props }: EditorFloatingMenuProps) => (
    <FloatingMenu
        className={cn('flex items-center bg-secondary', className)}
        editor={null}
        {...props}
    />
)

export type EditorNodeHeading1Props = Pick<EditorButtonProps, 'hideName'>

export const EditorNodeHeading1 = ({ hideName = false }: Pick<EditorButtonProps, 'hideName'>) => {
    const { editor } = useCurrentEditor()

    if (!editor) {
        return null
    }

    return (
        <BubbleMenuButton
            command={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            hideName={hideName}
            icon={Heading1Icon}
            isActive={() => editor.isActive('heading', { level: 1 }) ?? false}
            name="Heading 1"
        />
    )
}

export type EditorNodeTableProps = Pick<EditorButtonProps, 'hideName'>

export const EditorNodeTable = ({ hideName = false, }: Pick<EditorButtonProps, 'hideName'>) => {
    const { editor } = useCurrentEditor()

    if (!editor) {
        return null
    }

    return (
        <BubbleMenuButton
            command={() =>
                editor
                    .chain()
                    .focus()
                    .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
                    .run()
            }
            hideName={hideName}
            icon={TableIcon}
            isActive={() => editor.isActive('table') ?? false}
            name="Table"
        />
    )
}

export type EditorFormatBoldProps = Pick<EditorButtonProps, 'hideName'>

export const EditorFormatBold = ({ hideName = false }: Pick<EditorButtonProps, 'hideName'>) => {
    const { editor } = useCurrentEditor()

    if (!editor) {
        return null
    }

    return (
        <BubbleMenuButton
            command={() => editor.chain().focus().toggleBold().run()}
            hideName={hideName}
            icon={BoldIcon}
            isActive={() => editor.isActive('bold') ?? false}
            name="Bold"
        />
    )
}

export type EditorFormatItalicProps = Pick<EditorButtonProps, 'hideName'>

export const EditorFormatItalic = ({ hideName = false }: Pick<EditorButtonProps, 'hideName'>) => {
    const { editor } = useCurrentEditor()

    if (!editor) {
        return null
    }

    return (
        <BubbleMenuButton
            command={() => editor.chain().focus().toggleItalic().run()}
            hideName={hideName}
            icon={ItalicIcon}
            isActive={() => editor.isActive('italic') ?? false}
            name="Italic"
        />
    )
}

export type EditorFormatStrikeProps = Pick<EditorButtonProps, 'hideName'>

export const EditorFormatStrike = ({ hideName = false }: Pick<EditorButtonProps, 'hideName'>) => {
    const { editor } = useCurrentEditor()

    if (!editor) {
        return null
    }

    return (
        <BubbleMenuButton
            command={() => editor.chain().focus().toggleStrike().run()}
            hideName={hideName}
            icon={StrikethroughIcon}
            isActive={() => editor.isActive('strike') ?? false}
            name="Strikethrough"
        />
    )
}

export type EditorLinkSelectorProps = {
    open?: boolean
    onOpenChange?: (open: boolean) => void
}

export const EditorLinkSelector = ({ open, onOpenChange }: EditorLinkSelectorProps) => {
    const [url, setUrl] = useState<string>('')
    const inputReference = useRef<HTMLInputElement>(null)
    const { editor } = useCurrentEditor()

    const isValidUrl = (text: string): boolean => {
        try {
            new URL(text)
            return true
        } catch {
            return false
        }
    }

    const getUrlFromString = (text: string): string | null => {
        if (isValidUrl(text)) {
            return text
        }
        try {
            if (text.includes('.') && !text.includes(' ')) {
                return new URL(`https://${text}`).toString()
            }

            return null
        } catch {
            return null
        }
    }

    useEffect(() => {
        inputReference.current?.focus()
    }, [])

    if (!editor) {
        return null
    }

    const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault()

        const href = getUrlFromString(url)

        if (href) {

            editor.chain().focus().setLink({ href, class: 'text-blue-600 underline cursor-pointer' }).run()
            onOpenChange?.(false)
        }
    }

    const defaultValue = (editor.getAttributes('link') as { href?: string }).href

    return (
        <Popover modal onOpenChange={onOpenChange} open={open}>
            <PopoverTrigger asChild>
                <Button
                    className="gap-2 rounded-none border-none"
                    size="sm"
                    variant="ghost"
                >
                    <ExternalLinkIcon size={12} />
                    <p
                        className={cn(
                            'text-xs underline decoration-text-muted underline-offset-4',
                            {
                                'text-primary': editor.isActive('link'),
                            }
                        )}
                    >
                        Link
                    </p>
                </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-60 p-0" sideOffset={10}>
                <form className="flex p-1" onSubmit={handleSubmit}>
                    <input
                        aria-label="Link URL"
                        className="flex-1 bg-background p-1 text-sm outline-none"
                        defaultValue={defaultValue ?? ''}
                        onChange={(event) => setUrl(event.target.value)}
                        placeholder="Paste a link"
                        ref={inputReference}
                        type="text"
                        value={url}
                    />
                    {editor.getAttributes('link').href ? (
                        <Button
                            className="flex h-8 items-center rounded-sm p-1 text-destructive transition-all hover:bg-destructive-foreground dark:hover:bg-destructive"
                            onClick={() => {
                                editor.chain().focus().unsetLink().run()
                                onOpenChange?.(false)
                            }}
                            size="icon"
                            type="button"
                            variant="outline"
                        >
                            <TrashIcon size={12} />
                        </Button>
                    ) : (
                        <Button className="h-8" size="icon" variant="secondary">
                            <CheckIcon size={12} />
                        </Button>
                    )}
                </form>
            </PopoverContent>
        </Popover>
    )
}