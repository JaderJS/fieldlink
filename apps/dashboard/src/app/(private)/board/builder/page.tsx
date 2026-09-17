import { KanbanBuilder } from "@/components/kanban/builder/builder";
import { Column } from "@/components/kanban/types";
import { faker } from "@faker-js/faker";

export default function BoardUpsert({ params }: { params: Promise<{ _id: string }> }) {

    return (
        <main className="w-full h-full flex gap-x-4 p-2">
            {/* <KanbanBuilder/> */}
        </main>
    )
}