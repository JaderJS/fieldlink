import { UpsertClientSchema } from "../schemas/upsert.client.schema"

export const defaultNewClient = (): UpsertClientSchema => {
    return ({
        name: "Novo cliente",
        propertyIds: [],
        moreInfos: {
            city: "Desconhecido",
            state: "Desconhecido"
        }
    })
}