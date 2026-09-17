import { UpsertEquipmentSchema } from "../schemas/upsert.equipment.schema";

export const defaultNewEquipment = (): UpsertEquipmentSchema => {
    return ({
        id: -1,
        nickname: "novo-equipamento",
        sn: "xxxx",
        productId: -1,
        identifier: 0,
    })
}