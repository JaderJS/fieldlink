import { UpsertPropertySchema } from "../schemas/upsert.property.schema";

export const defaultNewProperty = ({ clientId = -1 }: { clientId?: number } = {}): UpsertPropertySchema => {
    return ({
        title: "Nova propriedade",
        city: "Desconhecida",
        clientId: clientId
    })
}