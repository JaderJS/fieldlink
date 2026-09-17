'use client'

import { PluginKey } from '@tiptap/pm/state'
import type { DOMOutputSpec, Node as ProseMirrorNode } from '@tiptap/pm/model'
import Suggestion, { type SuggestionOptions } from '@tiptap/suggestion'
import { mergeAttributes, Node } from '@tiptap/core'
import type { Editor, Range } from '@tiptap/core'
import { CheckSquareIcon, CodeIcon, Heading1Icon, Heading2Icon, Heading3Icon, ListIcon, ListOrderedIcon, LucideIcon, TableIcon, TextIcon, TextQuoteIcon } from 'lucide-react'

export interface SuggestionItem {
    title: string
    description: string
    icon: LucideIcon
    searchTerms: string[]
    command: (props: { editor: Editor; range: Range }) => void
}

interface SlashNodeAttrs {
    id: string | null
    label?: string | null
}

type SlashOptions<SlashOptionSuggestionItem = unknown, Attrs = SlashNodeAttrs> = {
    HTMLAttributes: Record<string, unknown>
    renderText: (props: {
        options: SlashOptions<SlashOptionSuggestionItem, Attrs>
        node: ProseMirrorNode
    }) => string
    renderHTML: (props: {
        options: SlashOptions<SlashOptionSuggestionItem, Attrs>
        node: ProseMirrorNode
    }) => DOMOutputSpec
    deleteTriggerWithBackspace: boolean
    suggestion: Omit<
        SuggestionOptions<SlashOptionSuggestionItem, Attrs>,
        'editor'
    >
}

const SlashPluginKey = new PluginKey('slash')

export const Slash = Node.create<SlashOptions>({
    name: 'slash',
    priority: 101,
    addOptions() {
        return {
            HTMLAttributes: {},
            renderText({ options, node }) {
                return `${options.suggestion.char}${node.attrs.label ?? node.attrs.id}`
            },
            deleteTriggerWithBackspace: false,
            renderHTML({ options, node }) {
                return [
                    'span',
                    mergeAttributes(this.HTMLAttributes, options.HTMLAttributes),
                    `${options.suggestion.char}${node.attrs.label ?? node.attrs.id}`,
                ];
            },
            suggestion: {
                char: '/',
                pluginKey: SlashPluginKey,
                command: ({ editor, range, props }) => {
                    // increase range.to by one when the next node is of type "text"
                    // and starts with a space character
                    const nodeAfter = editor.view.state.selection.$to.nodeAfter
                    const overrideSpace = nodeAfter?.text?.startsWith(' ')

                    if (overrideSpace) {
                        range.to += 1;
                    }

                    editor
                        .chain()
                        .focus()
                        .insertContentAt(range, [
                            {
                                type: this.name,
                                attrs: props,
                            },
                            {
                                type: 'text',
                                text: ' ',
                            },
                        ])
                        .run()

                    // get reference to `window` object from editor element, to support cross-frame JS usage
                    editor.view.dom.ownerDocument.defaultView
                        ?.getSelection()
                        ?.collapseToEnd()
                },
                allow: ({ state, range }) => {
                    const $from = state.doc.resolve(range.from)
                    const type = state.schema.nodes[this.name]
                    const allow = !!$from.parent.type.contentMatch.matchType(type)

                    return allow
                },
            },
        };
    },

    group: 'inline',

    inline: true,

    selectable: false,

    atom: true,

    addAttributes() {
        return {
            id: {
                default: null,
                parseHTML: (element) => element.getAttribute('data-id'),
                renderHTML: (attributes) => {
                    if (!attributes.id) {
                        return {};
                    }

                    return {
                        'data-id': attributes.id,
                    }
                },
            },

            label: {
                default: null,
                parseHTML: (element) => element.getAttribute('data-label'),
                renderHTML: (attributes) => {
                    if (!attributes.label) {
                        return {};
                    }

                    return {
                        'data-label': attributes.label,
                    }
                },
            },
        }
    },

    parseHTML() {
        return [
            {
                tag: `span[data-type="${this.name}"]`,
            },
        ]
    },

    renderHTML({ node, HTMLAttributes }) {
        const mergedOptions = { ...this.options }

        mergedOptions.HTMLAttributes = mergeAttributes(
            { 'data-type': this.name },
            this.options.HTMLAttributes,
            HTMLAttributes
        )
        const html = this.options.renderHTML({
            options: mergedOptions,
            node,
        })

        if (typeof html === 'string') {
            return [
                'span',
                mergeAttributes(
                    { 'data-type': this.name },
                    this.options.HTMLAttributes,
                    HTMLAttributes
                ),
                html,
            ]
        }
        return html
    },

    renderText({ node }) {
        return this.options.renderText({
            options: this.options,
            node,
        })
    },

    addKeyboardShortcuts() {
        return {
            Backspace: () =>
                this.editor.commands.command(({ tr, state }) => {
                    let isMention = false
                    const { selection } = state
                    const { empty, anchor } = selection

                    if (!empty) {
                        return false
                    }

                    state.doc.nodesBetween(anchor - 1, anchor, (node, pos) => {
                        if (node.type.name === this.name) {
                            isMention = true
                            tr.insertText(
                                this.options.deleteTriggerWithBackspace
                                    ? ''
                                    : this.options.suggestion.char || '',
                                pos,
                                pos + node.nodeSize
                            )

                            return false;
                        }
                    })

                    return isMention
                }),
        }
    },

    addProseMirrorPlugins() {
        return [
            Suggestion({
                editor: this.editor,
                ...this.options.suggestion,
            }),
        ]
    },
})

export const defaultSlashSuggestions: SuggestionOptions<SuggestionItem>['items'] = () => [
    {
        title: 'Text',
        description: 'Basta começar a digitar com texto simples.',
        searchTerms: ['p', 'paragraph'],
        icon: TextIcon,
        command: ({ editor, range }) => {
            editor
                .chain()
                .focus()
                .deleteRange(range)
                .toggleNode('paragraph', 'paragraph')
                .run()
        },
    },
    {
        title: 'To-do List',
        description: 'Acompanhe tarefas com uma lista de tarefas.',
        searchTerms: ['todo', 'task', 'list', 'check', 'checkbox'],
        icon: CheckSquareIcon,
        command: ({ editor, range }) => {
            editor.chain().focus().deleteRange(range).toggleTaskList().run()
        },
    },
    {
        title: 'Heading 1',
        description: 'Título de seção grande.',
        searchTerms: ['title', 'big', 'large'],
        icon: Heading1Icon,
        command: ({ editor, range }) => {
            editor
                .chain()
                .focus()
                .deleteRange(range)
                .setNode('heading', { level: 1 })
                .run()
        },
    },
    {
        title: 'Heading 2',
        description: 'Título da seção média.',
        searchTerms: ['subtitle', 'medium'],
        icon: Heading2Icon,
        command: ({ editor, range }) => {
            editor
                .chain()
                .focus()
                .deleteRange(range)
                .setNode('heading', { level: 2 })
                .run()
        },
    },
    {
        title: 'Heading 3',
        description: 'Título de seção pequena.',
        searchTerms: ['subtitle', 'small'],
        icon: Heading3Icon,
        command: ({ editor, range }) => {
            editor
                .chain()
                .focus()
                .deleteRange(range)
                .setNode('heading', { level: 3 })
                .run()
        },
    },
    {
        title: 'Bullet List',
        description: 'Crie uma lista com marcadores simples.',
        searchTerms: ['unordered', 'point'],
        icon: ListIcon,
        command: ({ editor, range }) => {
            editor.chain().focus().deleteRange(range).toggleBulletList().run()
        },
    },
    {
        title: 'Numbered List',
        description: 'Crie uma lista com numeração.',
        searchTerms: ['ordered'],
        icon: ListOrderedIcon,
        command: ({ editor, range }) => {
            editor.chain().focus().deleteRange(range).toggleOrderedList().run()
        },
    },
    {
        title: 'Quote',
        description: 'Capture uma citação.',
        searchTerms: ['blockquote'],
        icon: TextQuoteIcon,
        command: ({ editor, range }) =>
            editor
                .chain()
                .focus()
                .deleteRange(range)
                .toggleNode('paragraph', 'paragraph')
                .toggleBlockquote()
                .run(),
    },
    {
        title: 'Code',
        description: 'Capture um trecho de código.',
        searchTerms: ['codeblock'],
        icon: CodeIcon,
        command: ({ editor, range }) =>
            editor.chain().focus().deleteRange(range).toggleCodeBlock().run(),
    },
    {
        title: 'Table',
        description: 'Adicione uma visualização de tabela para organizar dados.',
        searchTerms: ['table'],
        icon: TableIcon,
        command: ({ editor, range }) =>
            editor
                .chain()
                .focus()
                .deleteRange(range)
                .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
                .run(),
    },
]
