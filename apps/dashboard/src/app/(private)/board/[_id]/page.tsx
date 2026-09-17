
import { ViewBoard } from "@/components/kanban/board/view.board"
import { ViewColumn } from "@/components/kanban/column/view.column"
import { getDatabase } from "@/functions/kanban"
import { useQuery } from "@tanstack/react-query"

export default async function Page(props: { params: Promise<{ _id: string }> }) {
    const params = await props.params;

    return (
        <>
            {/* <ViewBoard boardId={params._id} /> */}
        </>
    )
}