import { Station } from "@/features/station/types"
import { useGroups } from "../hooks/use.groups"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useUpsertGroup } from "../hooks/use.upsert.group"
import { defaultNewGroup } from "../constants/default.new.group"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { UpsertGroupSchema, upsertGroupSchema } from "../schema/group.schema"
import { UpsertGroup } from "./upsert.group"

interface ViewGroupsProps {
    station?: Pick<Station, "id">
}

export const ViewGroups = ({ station }: ViewGroupsProps) => {

    const { data } = useGroups({ filters: { station } })
    const { mutateAsync: upsertGroupFn } = useUpsertGroup()

    const handleNewGroup = () => {
        upsertGroupFn(defaultNewGroup())
    }

    return (
        <>
            <Button
                onClick={handleNewGroup}
            >
                Novo
            </Button>
            {data?.length ? (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {data.map((group) => (
                        <UpsertGroup key={group.id} group={group} />
                    ))}
                </div>
            ) : (
                <p className="text-muted-foreground italic">Nenhum grupo cadastrado.</p>
            )}
        </>
    )
}