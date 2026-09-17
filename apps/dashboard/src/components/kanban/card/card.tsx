import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Grip, Trash } from "lucide-react"
import { ReactNode, useCallback, useRef } from "react"
import { FieldsType, FormElements, FormFieldInstance } from "../builder/types/field.types"
import debounce from "lodash.debounce"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteCard, ResponseGetDatabase, upsertCard } from "@/functions/kanban"
import { KEYS } from "@/core/keys"
import { CardInstance } from "../builder/types/card.types"
import { UserProps } from "@/functions/user"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/providers/auth"
import { resolvePromiseIn } from "@/components/utils"

interface CardComponentProps {
    id: string
    boardId: string
    columnId: string
    title: string
    fields: FormFieldInstance[]
    children?: ReactNode
    card: Omit<CardInstance, 'fields'> & { content: any }
}

interface ICard {
    _id: string
    title: string
    fields: FormFieldInstance[]
    isDelete: boolean
    createdAt: string
    updatedAt: string
    createdBy: UserProps
    updatedBy: UserProps
    content: {
        [key: string]: string
    }
}

const CardComponent = ({ id, title, children, fields, card: cardContent, ...props }: CardComponentProps) => {

    const card = cardContent as ICard
    const { user } = useAuth()


    const queryClient = useQueryClient()
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id, data: { type: 'card', _id: card._id } })
    const { mutateAsync: upsertCardFn, isSuccess, isPending } = useMutation({ mutationFn: upsertCard })
    const { mutateAsync: deleteCardFn } = useMutation({ mutationFn: deleteCard })

    const cardValues = useRef<{ [key: string]: any }>({})
    const submitValue = useCallback((key: string, value: string) => {
        cardValues.current[key] = value

        upsertCardFn({ _id: id, column_id: props.columnId, board_id: props.boardId, content: cardValues.current }).then(({ card: newCard }) => {
            const query = queryClient.getQueryData<ResponseGetDatabase>(KEYS.database.getById(props.boardId))
            if (!query) return

            const board = query.database.columns.map((column) => (column._id === props.columnId ?
                { ...column, cards: [...column.cards.filter(card => card._id !== newCard._id), newCard] } : column))

            queryClient.setQueryData(KEYS.database.getById(props.boardId), board)
        })
    }, [])

    return (
        <>
            <div
                {...attributes}
                ref={setNodeRef}
                style={{ transition, transform: CSS.Translate.toString(transform) }}
                className={cn('w-full h-full p-4 bg-muted rounded-xl flex flex-col gap-y-4 border shadow-xs', isDragging && 'opacity-50')}
            >
                <div className="flex items-center justify-between">
                    <p>{title}</p>
                    {/* <Input value={title} /> */}
                    <Button {...listeners} size="icon" className="bg-fieldlink-secondary hover:bg-fieldlink-secondary/80"><Grip /></Button>
                </div>
                {fields.map((field) => {
                    const Field = FormElements[field.type].formComponent
                    const defaultValue = card.content && card.content[field._id]
                    return (
                        <Field
                            key={field._id}
                            fieldInstance={field}
                            submitValue={submitValue}
                            defaultValue={defaultValue}
                            isLoading={isPending}
                            isSuccess={isSuccess}
                        />
                    )
                })}

                {children}

                <div>
                    <Button
                        // disabled={id.toString().length === 5}
                        size={"icon"}
                        onClick={() => deleteCardFn(id)}
                    >
                        <Trash />
                    </Button>
                </div>
                {/* <Avatar>
                    <AvatarFallback>{card.updatedBy.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                    <AvatarImage src={`https://github.com/jader.js`} />
                </Avatar> */}
                {/* {user?.role === 'USER' && <p className="text-xs text-muted-foreground text-right">{card._id}</p>} */}
            </div>
        </>
    )
}

export { CardComponent }