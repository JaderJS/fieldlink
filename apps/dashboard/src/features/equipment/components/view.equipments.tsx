'use client'

import { Button } from "@/components/ui/button"
import { useEquipments } from "../hooks/use.equipments"
import { useUpsertEquipment } from "../hooks/use.upsert.quipment"
import { defaultNewEquipment } from "../constants/default.equipment"
import Link from "next/link"

export const ViewEquipments = () => {

    const { data: equipments } = useEquipments()
    const { mutateAsync: upsertEquipmentFn } = useUpsertEquipment()

    return (
        <>
            <Button
                onClick={() => upsertEquipmentFn(defaultNewEquipment())}
            >
                Adicionar novo
            </Button>

            {equipments?.map((equipment) => (
                <div key={equipment.id}>
                    <Link href={`/equipments/${equipment.id}`}>{equipment.identifier}</Link>
                </div>
            ))}
        </>
    )
}