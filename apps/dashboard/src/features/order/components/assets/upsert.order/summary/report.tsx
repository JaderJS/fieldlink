import { Button } from "@/components/ui/button"
import { PDFDownloadLink } from "@/features/nf"
import ViewReportPDF from "@/features/nf/components/report/view.report"
import { fetchBase64 } from "@/features/order/helpers/base64"
import { Order } from "@/features/order/types"
import { useEffect, useState } from "react"

export const ViewReportSummary = ({ order }: { order: Order }) => {
    const [orderWithB64, setOrderWithB64] = useState<Order | null>(null)

    useEffect(() => {
        if (!order) return

        async function loadImages() {
            const works = await Promise.all(
                order.works.map(async w => {
                    const archives = await Promise.all(
                        w.archives.map(async a => {
                            const base64 = a.pathUrl
                                ? await fetchBase64(a.pathUrl)
                                : ""

                            return { ...a, base64 }
                        })
                    )

                    return { ...w, archives }
                })
            )

            setOrderWithB64({ ...order, works })
        }

        loadImages()
    }, [order])

    if (!orderWithB64) {
        return (
            <Button className="w-full" disabled>Preparando imagens...</Button>
        )
    }
    console.log(orderWithB64)
    return (
        <>
            {orderWithB64 && <PDFDownloadLink
                document={<ViewReportPDF order={orderWithB64} />}
            >
                {({ loading }) => (
                    <Button className="w-full" disabled={loading}>
                        {loading ? "Gerando..." : "Gerar Relatório"}
                    </Button>
                )}
            </PDFDownloadLink>}
        </>
    )
}
