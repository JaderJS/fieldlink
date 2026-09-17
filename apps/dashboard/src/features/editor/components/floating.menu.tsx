'use client'

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { Editor } from "@tiptap/react"
import { FloatingMenu } from "@tiptap/react/menus"
import { Bold, ChevronDown, Code, Dot, Heading1, Heading2, Heading3, Image, Italic, ListOrdered, Strikethrough, Text, Type } from "lucide-react"
import { ReactNode, useCallback } from "react"

interface MenuProps {
    editor: Editor
}

export const FloatingComponent = ({ editor }: MenuProps) => {

    const handleImage = useCallback(() => {
        const url = window.prompt("Enter image URL")
        if (url) {
            editor?.chain().focus().setImage({ src: url }).run()
        }
    }, [editor])

    return (
        <>
            <FloatingMenu
                editor={editor}
                shouldShow={({ state }) => {
                    const { $from } = state.selection
                    // const currentLineText = $from.nodeBefore?.textContent
                    const textBefore = $from.parent.textBetween(0, $from.parentOffset)
                    return textBefore === "/"
                }}
                className="bg-background border rounded-lg overflow-hidden flex flex-col divide-y p-1"
            >

                <MyButton
                    data-isActive={editor.isActive('heading', { level: 1 })}
                    onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}
                >
                    <Type className="w-28 h-28" />
                    <div className="flex flex-col items-start">
                        <span className="text-sm">Texto</span>
                        <span className="text-xs">Texto padrão</span>
                    </div>
                </MyButton>

                <MyButton
                    data-isActive={editor.isActive('heading', { level: 1 })}
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                >
                    <Heading1 className="w-28 h-28" />
                    <div className="flex flex-col items-start">
                        <span className="text-sm">H1</span>
                        <span className="text-xs">Titulo 1</span>
                    </div>
                </MyButton>
                <MyButton
                    data-isActive={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                >
                    <Heading2 className="w-28 h-28" />
                    <div className="flex flex-col items-start">
                        <span className="text-sm">H2</span>
                        <span className="text-xs">Titulo 2</span>
                    </div>
                </MyButton>
                <MyButton
                    data-isActive={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                >
                    <Heading3 className="w-28 h-28" />
                    <div className="flex flex-col items-start">
                        <span className="text-sm">H3</span>
                        <span className="text-xs">Titulo 3</span>
                    </div>
                </MyButton>
                <MyButton
                    data-isActive={editor.isActive('bulletList') ? 'is-active' : ''}
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                >
                    <Dot className="w-28 h-28" />
                    <div className="flex flex-col items-start">
                        <span className="text-sm">Marcador</span>
                        <span className="text-xs">Lista com marcadores</span>
                    </div>
                </MyButton>

                <MyButton
                    data-isActive={editor.isActive('orderedList') ? 'is-active' : ''}
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                >
                    <ListOrdered className="w-28 h-28" />
                    <div className="flex flex-col items-start">
                        <span className="text-sm">Marcador</span>
                        <span className="text-xs">Lista com marcadores enumerados</span>
                    </div>
                </MyButton>

                <Separator />
                <MyButton
                    data-isActive={editor.isActive('orderedList') ? 'is-active' : ''}
                    onClick={handleImage}
                >
                    <Image className="w-28 h-28" />
                    <div className="flex flex-col items-start">
                        <span className="text-sm">Imagem</span>
                        <span className="text-xs">Adicione a imagem desejada</span>
                    </div>
                </MyButton>

            </FloatingMenu>
        </>
    )
}

interface MyButtonProps extends React.ComponentProps<"button"> {
    children?: ReactNode
}

const MyButton = ({ onClick, children, ...props }: MyButtonProps) => {
    return (
        <Button
            className="flex items-center justify-start gap-2 p-2 h-auto data-[isActive=true]:text-violet-400"
            variant={"ghost"}
            onClick={onClick}
        >
            {children}

        </Button>
    )
}