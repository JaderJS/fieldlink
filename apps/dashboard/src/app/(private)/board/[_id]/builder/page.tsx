import { KanbanBuilder } from "@/components/kanban/builder/builder";

export default async function Page(props: { params: Promise<{ _id: string }> }) {
    const params = await props.params;
    return (
        <>
            {/* <KanbanBuilder boardId={params._id} /> */}
        </>
    )
}