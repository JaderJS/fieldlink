import { Text, View } from "@react-pdf/renderer"
import { styles } from "./styles"
import { formatToBRL } from "@/components/utils"
import { Product } from "@/features/products"
import { Order } from "@/features/order/types"

export default function ProductsTable({ products }: { products: Order['sales'][number]['productsOnSale'] }) {
    if (!products.length) return <Text>Nenhum produto utilizado.</Text>

    return (
        <View style={styles.table}>
            {products.map((p, i) => (
                <View key={i} style={styles.tableRow}>
                    <Text style={styles.col1}>{p.product.name}</Text>
                    <Text style={styles.col2}>{p.quantity}</Text>
                    <Text style={styles.col3}>{formatToBRL(p.price)}</Text>
                    <Text style={styles.col4}>{formatToBRL(p.price * p.quantity)}</Text>
                </View>
            ))}
        </View>
    )
}
