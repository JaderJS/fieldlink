import { ColumnDef, createColumnHelper } from "@tanstack/react-table"
import { CellActions, CellBank, CellBilled, CellExpand, CellIndex, CellMoney, CellPeriod, CellSelect, CellTitle, CellViewMore } from "./cells"
import { formatToBRL } from "@/functions/utils"
import { Transaction } from "@/features/transaction/types"
// import { formatToBRL } from "../utils"

const columnHelper = createColumnHelper<Transaction>()

export const columns = [
    columnHelper.display({
        id: 'view',
        cell: CellExpand,
    }),
    columnHelper.accessor('id', {
        header: "#",
        cell: CellIndex,
        enableGrouping: false,
        aggregationFn: 'extent'
    }),
    columnHelper.accessor('title', {
        header: 'Titulo',
        cell: CellTitle,
        enableGrouping: false,
    }),
    columnHelper.accessor('type', {
        header: 'Tipo?',
        cell: CellSelect
    }),
    columnHelper.accessor('bank', {
        header: 'Banco',
        cell: CellBank
    }),
    columnHelper.accessor((row) => {
        const periods = row.installments.map(i => i.period.name)
        return periods
    }, {
        id: 'period',
        header: 'Período',
        cell: CellPeriod,
    }),
    columnHelper.accessor('total', {
        header: "Total",
        cell: CellMoney,
        enableGrouping: false,
        aggregatedCell: ({ getValue, row }) => `Balanço ${formatToBRL(getValue())}`
    }),
    columnHelper.display({
        header: "Pago?",
        cell: CellBilled
    }),
    columnHelper.display({
        header: 'Mais',
        cell: CellViewMore
    }),
    columnHelper.display({
        header: 'Ações',
        cell: CellActions
    })
] 