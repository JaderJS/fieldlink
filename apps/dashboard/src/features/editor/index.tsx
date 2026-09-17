'use client'

import { useEditor, EditorContent, JSONContent, } from "@tiptap/react"
import ListItem from '@tiptap/extension-list-item'
import OrderedList from '@tiptap/extension-ordered-list'
import BulletList from '@tiptap/extension-bullet-list'
import Image from '@tiptap/extension-image'
import ImageResize from 'tiptap-extension-resize-image';
import StarterKit from "@tiptap/starter-kit"

import { initialContent } from "./constants/data"
import { useEffect, useMemo } from "react"
import { Menu } from "./components/bubble.menu"
import { FloatingComponent } from "./components/floating.menu"
import { cn } from "@/lib/utils"
import { ProductSection } from "./extensions/products.node"

interface EditorProps {
    onCallback?: (data: string) => void
    onCallbackJSON?: (data: Object) => void
    content?: string | JSONContent
    disabled?: boolean
    className?: string
}

function debounce<T extends (...args: any[]) => void>(func: T, delay: number) {
    let timer: NodeJS.Timeout
    return (...args: Parameters<T>) => {
        clearTimeout(timer)
        timer = setTimeout(() => func(...args), delay)
    }
}

export function Editor({ content, disabled, className, onCallback, onCallbackJSON }: EditorProps) {

    const debouncedCallback = useMemo(() => debounce((html: string) => {
        onCallback?.(html)
    }, 2000), [onCallback])

    const debouncedCallbackJSON = useMemo(() => debounce((json: Object) => {
        onCallbackJSON?.(json)
    }, 2000), [onCallback])

    const editor = useEditor({
        extensions: [StarterKit, ListItem, OrderedList, BulletList, Image, ImageResize],
        immediatelyRender: false,
        content: content,
        editorProps: {
            attributes: {
                class: "prose focus:outline-hidden outline-hidden p-4 min-h-[100px]"
            }
        },
        onUpdate({ editor }) {
            debouncedCallback(editor.getHTML())
            debouncedCallbackJSON(editor.getJSON())
        },
    })
    useEffect(() => {
        if (!editor || !content) return

        if (typeof content === 'object' && JSON.stringify(content) !== JSON.stringify(editor.getJSON())) {
            editor.commands.setContent(content)
        }

        //  if (editor && content !== editor.getHTML()) {
        //             editor.commands.setContent(content || "", false)
        //         }
    }, [editor, content])

    return (
        <>
            <EditorContent
                className={cn(className)}
                editor={editor}
                disabled={disabled}
            />
            {editor && (
                <Menu editor={editor} />
            )}
            {editor && (
                <FloatingComponent editor={editor} />
            )}
        </>
    )
}