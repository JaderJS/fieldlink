'use client'
import { PDFDownloadLink } from "../.."
import { Nf } from "../nf"

export const ViewNf = () => {


    return (
        <PDFDownloadLink
            document={
                <></>
                // <Nf
                //     cliente="Fazenda São Geronimo"
                //     cidade="Nova Canaã do Norte"
                //     estado="MT"
                //     cnpj="00.000.000/0000-00"
                //     propriedade="Fazenda São Geronimo"
                //     data="junho de 2025 sábado"
                //     itens={[
                //         { name: 'Rádio Vertex VHF', qtd: 2, value: 1499.90 },
                //     ]}
                // />
            }
            fileName="orcamento.pdf"
        >
            {({ loading }) => (loading ? 'Carregando PDF...' : 'Baixar Orçamento')}
        </PDFDownloadLink>
    )
}