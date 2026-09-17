import { Text, View } from "@react-pdf/renderer"
import { styles } from "./styles"
import { formatToBRL } from "@/functions/utils"
import { Order } from "@/features/order/types"

export default function OrderSummary({ order }: { order: Order }) {
    return (
        <View style={styles.block}>
            <Text>Cliente: {order.client.name}</Text>
            <Text>Status: {order.status?.name ?? "Desconhecido"}</Text>
            <Text>Criado em: {new Date(order.createdAt).toLocaleDateString()}</Text>
            <Text>Total Bruto: {formatToBRL(order.total)}</Text>
            <Text>Desconto: {formatToBRL(order.discount)}</Text>
        </View>
    )
}
