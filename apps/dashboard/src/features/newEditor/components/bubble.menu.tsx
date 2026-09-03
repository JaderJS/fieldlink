"use client"

import { useCurrentEditor } from '@tiptap/react'
import { BubbleMenu, type BubbleMenuProps } from '@tiptap/react/menus'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { CheckIcon, Heading1Icon, LucideIcon, LucideProps, TextIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export type EditorBubbleMenuProps = Omit<BubbleMenuProps, 'editor'>

export const EditorBubbleMenu = ({ children, className, ...props }: EditorBubbleMenuProps) => {
    const { editor } = useCurrentEditor()

    if (!editor) return null

    return (
        <BubbleMenu
            options={{ strategy: 'absolute',placement:"top-start" }}
            className={cn(
                'flex rounded-xl border bg-background p-0.5 shadow',
                '[&>*:first-child]:rounded-l-[9px]',
                '[&>*:last-child]:rounded-r-[9px]',
                className
            )}
            editor={editor}
            {...props}
        >
            {children && Array.isArray(children) ? children.reduce((acc: ReactNode[], child, index) => {
                if (index === 0) return [child]

                // biome-ignore lint/suspicious/noArrayIndexKey: "only iterator we have"
                acc.push(<Separator key={index} orientation="vertical" />)
                acc.push(child)
                return acc
            }, []) : children}
        </BubbleMenu>
    )
}

export type EditorButtonProps = {
    name: string
    isActive: () => boolean
    command: () => void
    icon: LucideIcon | ((props: LucideProps) => ReactNode)
    hideName?: boolean
}

export const BubbleMenuButton = ({
    name,
    isActive,
    command,
    icon: Icon,
    hideName,
}: EditorButtonProps) => (
    <Button
        className="flex gap-4"
        onClick={() => command()}
        size="sm"
        variant="ghost"
    >
        <Icon className="shrink-0 text-muted-foreground" size={12} />
        {!hideName && <span className="flex-1 text-left">{name}</span>}
        {isActive() ? (
            <CheckIcon className="shrink-0 text-muted-foreground" size={12} />
        ) : null}
    </Button>
)

export const EditorNodeText = ({ hideName = false, }: Pick<EditorButtonProps, 'hideName'>) => {
    const { editor } = useCurrentEditor()

    if (!editor) {
        return null
    }

    return (
        <BubbleMenuButton
            command={() =>
                editor.chain().focus().toggleNode('paragraph', 'paragraph').run()
            }
            hideName={hideName}
            // I feel like there has to be a more efficient way to do this – feel free to PR if you know how!
            icon={TextIcon}
            isActive={() =>
                (editor &&
                    !editor.isActive('paragraph') &&
                    !editor.isActive('bulletList') &&
                    !editor.isActive('orderedList')) ??
                false
            }
            name="Text"
        />
    )
}

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