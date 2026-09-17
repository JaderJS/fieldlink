import { Text } from "@react-pdf/renderer"
import { styles } from "./styles"

export default function SectionTitle({ title }: { title: string }) {
    return <Text style={styles.sectionTitle}>{title}</Text>
}
