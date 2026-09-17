import { UpsertProductSchema } from "../schema/schema.product";

export const defaultNewProduct = (): UpsertProductSchema => {
    return ({
        cost: 0,
        price: 0,
        name: "Novo produto",
        pictureUrl: "http://server:9000/fieldlink/assets/no-image.jpg",
        description: "Novo produto"
    })
}