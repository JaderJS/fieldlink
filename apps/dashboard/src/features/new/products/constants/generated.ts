// mockProducts.ts
import { faker } from "@faker-js/faker";
import { IProduct } from "../providers/provider.products";

export const MOCK_PRODUCTS: IProduct[] = Array.from({ length: 50 }).map(() => {
    const costPrice = faker.number.float({ min: 10, max: 300, fractionDigits: 2 });
    const salePrice = faker.number.float({
        min: costPrice * 1.2,
        max: costPrice * 1.8,
        fractionDigits: 2,
    });

    const now = faker.date.recent({ days: 30 });

    return {
        id: faker.string.uuid(),
        sku: faker.string.alphanumeric({ length: 8, casing: "upper" }),
        name: faker.commerce.productName(),
        stock: faker.number.int({ min: 0, max: 1000 }),
        price: salePrice,

        pictureUrl: faker.image.urlPicsumPhotos({
            width: 300,
            height: 300,
        }),

        unit: faker.helpers.arrayElement(["m", "l", "g"]),

        createdAt: now,
        updatedAt: faker.date.between({ from: now, to: new Date() }),

        description: faker.commerce.productDescription(),

        content: {
            type: "doc",
            content: [
                {
                    type: "paragraph",
                    content: [
                        {
                            type: "text",
                            text: faker.lorem.sentences(2),
                        },
                    ],
                },
            ],
        },

        order: {
            name: "Sugestão automática",
            quantity: faker.number.int({ min: 1, max: 100 }),
            value: costPrice,
        },

        details: {
            thumbUrl: faker.image.urlPicsumPhotos({
                width: 80,
                height: 80,
            }),
            costPrice,
            salePrice,
            avgPrice: faker.number.float({
                min: costPrice * 0.95,
                max: salePrice * 0.95,
                fractionDigits: 2,
            }),

            history: Array.from({ length: faker.number.int({ min: 3, max: 10 }) }).map(
                () =>
                ({
                    id: faker.string.uuid(),
                    sku: faker.string.alphanumeric({ length: 8 }),
                    name: faker.commerce.productName(),
                    stock: faker.number.int({ min: 0, max: 500 }),
                    price: faker.number.float({ min: 10, max: 300, fractionDigits: 2 }),
                    pictureUrl: "",
                    unit: faker.helpers.arrayElement(["m", "l", "g"]),
                    createdAt: faker.date.past(),
                    updatedAt: faker.date.recent(),
                } as IProduct)
            ),
        },
    };
});
