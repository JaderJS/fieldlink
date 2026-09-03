import { UpsertOrderSchema } from "../schema/upsert.schema";

type IDefaultNewArchive = {
    path: string
    pathUrl: string
    type: string,
    title?: string
    description?: string
}

export const defaultNewArchive = ({ path, pathUrl, type, title = "Novo arquivo", description }: IDefaultNewArchive): NonNullable<NonNullable<UpsertOrderSchema['works']>[number]['archives']>[number] => {
    return ({
        title,
        path,
        type,
        pathUrl,
        description
    })
}