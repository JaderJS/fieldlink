'use client'

import { getDatabase } from "@/functions/kanban"
import { useQuery } from "@tanstack/react-query"
import { Board } from "../builder/types/board.types"
import { BoardComponent } from "./board"

const ViewBoard = ({ boardId }: { boardId: string }) => {


    return(
        <>NOT IMPLEMENTED</>
    )
    // const { data } = useQuery({ queryKey: [QUERY_KEY.getDatabase, { _id: boardId }], queryFn: getDatabase })

    // if (!data) return null

    // const board: Board = {
    //     _id: data.database._id,
    //     title: data.database.name,
    //     columns: data.database.columns.map(({ _id, title, cards, fields }) => ({
    //         _id, title,
    //         cards: cards.map(({ _id, content, title, ...card }) => ({ _id, content, title, fields, ...card })),
    //         fields
    //     }))
    // }

    // return (
    //     <>
    //         {!!data?.database && <BoardComponent board={board} />}
    //     </>
    // )
}

export { ViewBoard }