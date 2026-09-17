import { Image, Text, View } from "@react-pdf/renderer"
import { styles } from "./styles"
import { Order } from "@/features/order/types"

export default function Header({ logo, order }: { logo: any, order: Order }) {
    return (
        <View style={styles.header}>
            <Image src={logo} style={styles.logo} />
            <View style={{ flex: 1 }}>
                <Text style={styles.headerTitle}>Laudo Técnico</Text>
                <Text style={styles.headerSubtitle}>Ordem #{order.id} — {order.title}</Text>
            </View>
        </View>
    )
}
