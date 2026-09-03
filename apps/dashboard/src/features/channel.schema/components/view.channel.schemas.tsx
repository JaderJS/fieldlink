'use client'

import { Button } from "@/components/ui/button"
import { useUpsertChannelSchema } from "../hooks/use.upsert.channel.schema"
import { defaultNewChannelSchema } from "../constants/default.new.channel.schema"
import { Station } from "@/features/station/types"
import { useChannelsSchemas } from "../hooks/use.channels.schemas"
import { Card } from "@/components/ui/card"
import { UpsertChannelSchema } from "./upsert.channel.schema"

export const ViewChannelsSchemas = ({ station }: { station: Pick<Station, "id"> }) => {

    const { data } = useChannelsSchemas({ filters: { stationId: station.id } })
    const { mutateAsync: upsertChannelSchemaFn } = useUpsertChannelSchema()

    const handleNewChannelSchema = () => {
        upsertChannelSchemaFn(defaultNewChannelSchema({ stationId: station.id }))
    }

    return (
        <>
            <Button
                onClick={handleNewChannelSchema}
            >
                Novo esquema de canal
            </Button>
            
            {data?.map((channelSchema) => (
                <div key={channelSchema.id} className="p-3 border rounded-xl">
                    <UpsertChannelSchema channelSchema={channelSchema} />
                </div>
            ))}
        </>
    )
} 