import { UpsertProduct } from "@/features/product/components/upsert.product";
import { getProductById } from "@/features/product/services/crud";

export default async function PageUpsertProductById({ params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id
    const data = await getProductById(id)

    return (
        <main className="p-4">
            <UpsertProduct product={data.product} />
        </main>
    )
}