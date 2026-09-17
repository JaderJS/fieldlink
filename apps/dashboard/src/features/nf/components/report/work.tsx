'use client'

import { Text, View } from "@react-pdf/renderer"
import { styles } from "./styles"
import ProductsTable from "./products"
import { Order } from "@/features/order/types"
import { formatToBRL } from "@/functions/utils"
import { generateText } from "@tiptap/core"
import { StarterKit } from "@tiptap/starter-kit"
import WorkImagesBlock from "./images"

export default function WorkBlock({ work }: { work: Order['works'][number] }) {
    return (
        <View style={styles.workBlock}>

            <Text style={styles.workTitle}>{work.title}</Text>

            <Text>Código interno: {work.id}</Text>
            {/* <Text>Flag: {work.flag}</Text> */}
            <Text>Data: {new Date(work.updatedAt).toLocaleDateString()}</Text>
            <Text>Valor total do serviço: {formatToBRL(work.total)}</Text>
            {work.content && (
                <Text>{generateText(work.content, [StarterKit])}</Text>
                // <RichTextPDF content={work.content} />
            )}

            {work.archives && work.archives.length > 0 && (
                <WorkImagesBlock archives={work.archives} />
            )}

            <View style={{ marginTop: 6 }}>
                <Text style={styles.subSection}>Produtos utilizados:</Text>
                <ProductsTable products={work.sales.flatMap(s => s.productsOnSale)} />
            </View>

            {work.otherValues?.length > 0 && (
                <View style={{ marginTop: 6 }}>
                    <Text style={styles.subSection}>Outros itens:</Text>
                    {work.otherValues.map((item, i) => (
                        <Text key={i}>{item.name} — {formatToBRL(item.price)}</Text>
                    ))}
                </View>
            )}

        </View>
    )
}
