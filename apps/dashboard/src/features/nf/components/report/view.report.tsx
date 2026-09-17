import { Document, Page, View } from "@react-pdf/renderer"
import { styles } from "./styles"
import Header from "./header"
import OrderSummary from "./summary"
import SectionTitle from "./section"
import WorkBlock from "./work"
// import OtherValuesBlock from "./components/OtherValuesBlock"
// import TotalsBlock from "./components/TotalsBlock"
// import SignatureBlock from "./components/SignatureBlock"
import { Order } from "@/features/order/types"
import OtherValuesBlock from "./other.values"
import TotalsBlock from "./total"

export default function ViewReportPDF({ order }: { order: Order }) {
    return (
        <Document>
            <Page size="A4" style={styles.page}>

                <Header logo={"logoBase64"} order={order} />

                <SectionTitle title="Resumo da Ordem" />
                <OrderSummary order={order} />

                <SectionTitle title="Serviços Executados" />
                {order.works.map(work => (
                    <WorkBlock key={work.id} work={work} />
                ))}

                {order.otherValues.length > 0 && (
                    <>
                        <SectionTitle title="Outros Valores" />
                        <OtherValuesBlock otherValues={order.otherValues} />
                    </>
                )}

                <SectionTitle title="Totais" />
                <TotalsBlock order={order} />

                {/* <SignatureBlock /> */}

            </Page>
        </Document>
    )
}
