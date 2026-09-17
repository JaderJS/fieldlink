import { createColumnHelper } from "@tanstack/react-table"
import { Installment } from "../types"
import { CellActions, CellBank, CellBilled, CellDescription, CellDueAt, CellIndex, CellPeriod, CellStatus, CellType, CellValue } from "../components/cells/cells.columns.installments"

const columnHelper = createColumnHelper<Installment>()

export const columns = [
    columnHelper.accessor('id', {
        header: "#",
        cell: CellIndex,
        enableGrouping: false,
    }),
    columnHelper.display({
        header: "Descrição",
        cell: CellDescription,
        enableGrouping: false,
    }),
    columnHelper.accessor('transaction.type', {
        header: "Tipo",
        cell: CellType
    }),
    columnHelper.accessor('transaction.bank.id', {
        header: "Banco",
        cell: CellBank
    }),
    columnHelper.accessor('period.id', {
        header: 'Período',
        cell: CellPeriod
    }),
    columnHelper.accessor('value', {
        header: 'Valor',
        cell: CellValue,
        enableGrouping: false
    }),
    columnHelper.accessor('status', {
        header: 'Status',
        cell: CellStatus
    }),
    // columnHelper.accessor('paymentMethod', {
    //     header: 'Método de Pagamento',
    // }),
    columnHelper.accessor('billed', {
        header: "Faturado",
        cell: CellBilled
    }),
    columnHelper.accessor('dueAt', {
        header: "Data",
        cell: CellDueAt,
        enableGrouping: false,
    }),
    columnHelper.display({
        header: 'Ações',
        cell: CellActions,
        enableGrouping: false,
    })
] 