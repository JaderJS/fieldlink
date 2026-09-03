import { cn } from "@/lib/utils"
import StartKit from "@tiptap/starter-kit"
import Typography from '@tiptap/extension-typography'
import Placeholder from '@tiptap/extension-placeholder'
import CharacterCount from '@tiptap/extension-character-count'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import Link from "@tiptap/extension-link"
import Subscript from '@tiptap/extension-subscript'
import Superscript from '@tiptap/extension-superscript'
import { Table } from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import { TaskItem } from '@tiptap/extension-task-item'
import { TaskList } from '@tiptap/extension-task-list'
import { TextStyle } from '@tiptap/extension-text-style'
import { all, createLowlight } from 'lowlight'
import { defaultSlashSuggestions, Slash, SuggestionItem } from "@/features/newEditor/components/slash"
import Fuse from 'fuse.js'
import tippy, { type Instance as TippyInstance } from 'tippy.js'
import { ReactRenderer, EditorProvider as TiptapEditorProvider, type EditorProviderProps as TiptapEditorProviderProps, useCurrentEditor } from '@tiptap/react'
import { Command, CommandEmpty, CommandItem, CommandList } from "@/components/ui/command"
import type { Editor, Range } from '@tiptap/core'

const lowlight = createLowlight(all)

type EditorSlashMenuProps = {
    items: SuggestionItem[]
    command: (item: SuggestionItem) => void
    editor: Editor
    range: Range
}

const handleCommandNavigation = (event: KeyboardEvent) => {
    if (['ArrowUp', 'ArrowDown', 'Enter'].includes(event.key)) {
        const slashCommand = document.querySelector('#slash-command')

        if (slashCommand) {
            event.preventDefault()

            slashCommand.dispatchEvent(
                new KeyboardEvent('keydown', {
                    key: event.key,
                    cancelable: true,
                    bubbles: true,
                })
            )
            return true
        }
    }
}

export const defaultExtensions = [
    Link.configure({
        HTMLAttributes: {
            class: cn('text-blue-600 underline cursor-pointer'),
        },
        openOnClick: true,   // abre o link no navegador ao clicar
        autolink: true,      // detecta URLs automaticamente
        linkOnPaste: true,   // cria link ao colar
    }),
    StartKit.configure({
        codeBlock: false,
        bulletList: {
            HTMLAttributes: {
                class: cn('list-outside list-disc pl-4'),
            }
        },
        orderedList: {
            HTMLAttributes: {
                class: cn('list-outside list-decimal pl-4'),
            },
        },
        listItem: {
            HTMLAttributes: {
                class: cn('leading-normal'),
            },
        },
        blockquote: {
            HTMLAttributes: {
                class: cn('border-l border-l-2 pl-2'),
            },
        },
        code: {
            HTMLAttributes: {
                class: cn('rounded-md bg-muted px-1.5 py-1 font-medium font-mono'),
                spellcheck: 'false',
            },
        },
        horizontalRule: {
            HTMLAttributes: {
                class: cn('mt-4 mb-6 border-muted-foreground border-t'),
            },
        },
        dropcursor: {
            color: 'var(--border)',
            width: 4,
        },
    }),
    Typography,
    Placeholder,
    CharacterCount.configure({
        limit: 0
    }),
    CodeBlockLowlight.configure({
        lowlight,
        HTMLAttributes: {
            class: cn(
                'rounded-md border p-4 text-sm',
                'bg-background text-foreground',
                '[&_.hljs-doctag]:text-[#d73a49] [&_.hljs-keyword]:text-[#d73a49] [&_.hljs-meta_.hljs-keyword]:text-[#d73a49] [&_.hljs-template-tag]:text-[#d73a49] [&_.hljs-template-variable]:text-[#d73a49] [&_.hljs-type]:text-[#d73a49] [&_.hljs-variable.language_]:text-[#d73a49]',
                '[&_.hljs-title.class_.inherited__]:text-[#6f42c1] [&_.hljs-title.class_]:text-[#6f42c1] [&_.hljs-title.function_]:text-[#6f42c1] [&_.hljs-title]:text-[#6f42c1]',
                '[&_.hljs-attr]:text-[#005cc5] [&_.hljs-attribute]:text-[#005cc5] [&_.hljs-literal]:text-[#005cc5] [&_.hljs-meta]:text-[#005cc5] [&_.hljs-number]:text-[#005cc5] [&_.hljs-operator]:text-[#005cc5] [&_.hljs-selector-attr]:text-[#005cc5] [&_.hljs-selector-class]:text-[#005cc5] [&_.hljs-selector-id]:text-[#005cc5] [&_.hljs-variable]:text-[#005cc5]',
                '[&_.hljs-meta_.hljs-string]:text-[#032f62] [&_.hljs-regexp]:text-[#032f62] [&_.hljs-string]:text-[#032f62]',
                '[&_.hljs-built_in]:text-[#e36209] [&_.hljs-symbol]:text-[#e36209]',
                '[&_.hljs-code]:text-[#6a737d] [&_.hljs-comment]:text-[#6a737d] [&_.hljs-formula]:text-[#6a737d]',
                '[&_.hljs-name]:text-[#22863a] [&_.hljs-quote]:text-[#22863a] [&_.hljs-selector-pseudo]:text-[#22863a] [&_.hljs-selector-tag]:text-[#22863a]',
                '[&_.hljs-subst]:text-[#24292e]',
                '[&_.hljs-section]:font-bold [&_.hljs-section]:text-[#005cc5]',
                '[&_.hljs-bullet]:text-[#735c0f]',
                '[&_.hljs-emphasis]:text-[#24292e] [&_.hljs-emphasis]:italic',
                '[&_.hljs-strong]:font-bold [&_.hljs-strong]:text-[#24292e]',
                '[&_.hljs-addition]:bg-[#f0fff4] [&_.hljs-addition]:text-[#22863a]',
                '[&_.hljs-deletion]:bg-[#ffeef0] [&_.hljs-deletion]:text-[#b31d28]'
            ),
        },
    }),
    Superscript,
    Subscript,
    Table.configure({
        HTMLAttributes: {
            class: cn(
                'relative m-0 mx-auto my-3 w-full table-fixed border-collapse overflow-hidden rounded-none text-sm'
            ),
        },
        allowTableNodeSelection: true,
    }),
    TableRow.configure({
        HTMLAttributes: {
            class: cn(
                'relative box-border min-w-[1em] border p-1 text-start align-top'
            ),
        },
    }),
    TableCell.configure({
        HTMLAttributes: {
            class: cn(
                'relative box-border min-w-[1em] border p-1 text-start align-top'
            ),
        },
    }),
    TableHeader.configure({
        HTMLAttributes: {
            class: cn(
                'relative box-border min-w-[1em] border bg-secondary p-1 text-start align-top font-medium font-semibold text-muted-foreground'
            ),
        },
    }),
    TaskList.configure({
        HTMLAttributes: {
            // 17px = the width of the checkbox + the gap between the checkbox and the text
            class: 'before:translate-x-[17px]',
        },
    }),
    TaskItem.configure({
        HTMLAttributes: {
            class: 'flex items-start gap-1',
        },
        nested: true,
    }),
    TextStyle.configure({ mergeNestedSpanStyles: true }),
    Slash.configure({
        suggestion: {
            items: async ({ editor, query }) => {
                const items = typeof defaultSlashSuggestions === 'function'
                    ? await defaultSlashSuggestions({ editor, query })
                    : []

                if (!query) {
                    return items
                }

                const slashFuse = new Fuse(items, {
                    keys: ['title', 'description', 'searchTerms'],
                    threshold: 0.2,
                    minMatchCharLength: 1,
                })

                const results = slashFuse.search(query)

                return results.map((result) => result.item)
            },
            char: '/',
            render: () => {
                let component: ReactRenderer<EditorSlashMenuProps>
                let popup: TippyInstance

                return {
                    onStart: (onStartProps) => {
                        component = new ReactRenderer(EditorSlashMenu, {
                            props: onStartProps,
                            editor: onStartProps.editor,
                        })

                        popup = tippy(document.body, {
                            getReferenceClientRect: () =>
                                onStartProps.clientRect?.() || new DOMRect(),
                            appendTo: () => document.body,
                            content: component.element,
                            showOnCreate: true,
                            interactive: true,
                            trigger: 'manual',
                            placement: 'bottom-start',
                        })
                    },

                    onUpdate(onUpdateProps) {
                        component.updateProps(onUpdateProps)

                        popup.setProps({
                            getReferenceClientRect: () =>
                                onUpdateProps.clientRect?.() || new DOMRect(),
                        })
                    },

                    onKeyDown(onKeyDownProps) {
                        if (onKeyDownProps.event.key === 'Escape') {
                            popup.hide()
                            component.destroy()

                            return true
                        }

                        return handleCommandNavigation(onKeyDownProps.event) ?? false
                    },

                    onExit() {
                        popup.destroy()
                        component.destroy()
                    },
                }
            },
        },
    }),
]

const EditorSlashMenu = ({ items, editor, range }: EditorSlashMenuProps) => (
    <Command
        className="border shadow"
        id="slash-command"
        onKeyDown={(e) => {
            e.stopPropagation()
        }}
    >
        <CommandEmpty className="flex w-full items-center justify-center p-4 text-muted-foreground text-sm">
            <p>Sem resultados</p>
        </CommandEmpty>
        <CommandList>
            {items.map((item) => (
                <CommandItem
                    className="flex items-center gap-3 pr-3"
                    key={item.title}
                    onSelect={() => item.command({ editor, range })}
                >
                    <div className="flex size-9 shrink-0 items-center justify-center rounded border bg-secondary">
                        <item.icon className="text-muted-foreground" size={16} />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-medium text-sm">{item.title}</span>
                        <span className="text-muted-foreground text-xs">
                            {item.description}
                        </span>
                    </div>
                </CommandItem>
            ))}
        </CommandList>
    </Command>
)