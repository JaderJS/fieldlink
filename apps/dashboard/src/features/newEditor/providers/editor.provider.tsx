'use client'

import {
    useEditor,
    EditorContext as TiptapEditoContext,
    EditorProvider as TiptapEditorProvider,
    type EditorProviderProps as TiptapEditorProviderProps,
    type Editor,
} from "@tiptap/react"

import { createContext, ReactNode, useMemo, useState } from "react"
import { defaultExtensions } from "../constants/editor.default"
import { cn } from "@/lib/utils"
import { TooltipProvider } from "@/components/ui/tooltip"


type EditorProps = {
    editor: Editor
    onCallbackJSON?: (data: Object) => void
}

export const EditorContext = createContext<EditorProps | null>(null)

type EditorProviderProps = TiptapEditorProviderProps & {
    className?: string
    limit?: number
    placeholder?: string
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

export const EditorProvider = ({ className, limit, extensions, placeholder, ...props }: EditorProviderProps) => {


    return (
        <TooltipProvider>
            <div className={cn(className, '[&_.ProseMirror-focused]:outline-none prose prose-a:text-blue-600 prose-a:underline')}>
                <TiptapEditorProvider
                    immediatelyRender={false}
                    editorProps={{
                        handleKeyDown: (_view, event) => {
                            handleCommandNavigation(event);
                        },
                    }}
                    extensions={[...defaultExtensions, ...(extensions ?? [])]}
                    {...props}
                >
                </TiptapEditorProvider>
            </div>
        </TooltipProvider>

    )
}