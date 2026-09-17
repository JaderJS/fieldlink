"use client"
import { cn } from '@/lib/utils'
import { EditorContent as TiptapEditorContent, useCurrentEditor } from '@tiptap/react'


export const EditorContentArea = ({ className }: { className?: string }) => {
    const { editor } = useCurrentEditor()

    if (!editor) return null

    return (
        <div className={cn('prose dark:prose-invert max-w-none border rounded-2xl p-4', className)}>
            <TiptapEditorContent editor={editor} />
        </div>
    )
}

