import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Editor } from "@tiptap/react"
import { BubbleMenu } from "@tiptap/react/menus"
import { Bold, ChevronDown, Code, Italic, Strikethrough, Text } from "lucide-react"

interface MenuProps {
    editor: Editor
}

export const Menu = ({ editor }: MenuProps) => {

    return (
        <>
            <BubbleMenu editor={editor} className="bg-background border rounded-lg overflow-hidden divide-x flex p-1">
                <Button
                    className=""
                    variant={"ghost"}
                    onClick={() => editor.chain().focus().toggleBold().run()}
                >
                    Texto
                    <ChevronDown />
                </Button>

                <Button
                    className=""
                    variant={"ghost"}
                    onClick={() => editor.chain().focus().toggleBold().run()}
                >
                    Comentário
                    <Text />
                </Button>

                <Button
                    className={cn(editor.isActive('bold') && "text-violet-400")}
                    variant={"ghost"}
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    size={'icon'}
                >
                    <Bold strokeWidth={3} />
                </Button>
                <Button className="" variant={"ghost"} onClick={() => editor.chain().focus().toggleItalic().run()} size={'icon'}><Italic /></Button>
                <Button className="" variant={"ghost"} onClick={() => editor.chain().focus().setStrike().run()} size={'icon'}><Strikethrough /></Button>
                <Button className="" variant={"ghost"} onClick={() => editor.chain().focus().toggleCode().run()} size={'icon'}><Code /></Button>
            </BubbleMenu>
        </>
    )
}