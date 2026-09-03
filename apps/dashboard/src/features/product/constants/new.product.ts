import { UpsertProductSchema } from "../schema/schema";

export const DEFAULT_NEW_PRODUCT: UpsertProductSchema = {
    name: "Novo produto",
    price: 10,
    cost: 5,
    pictureUrl:"http://server:9000/fieldlink/assets/no-image.jpg"
}
