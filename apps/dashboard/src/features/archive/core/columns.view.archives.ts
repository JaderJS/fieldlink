import { ColumnDef, createColumnHelper } from "@tanstack/react-table"
import { CellActions, CellIndex, CellLastUpdatedAt, CellLinkTo } from "../components/assets/cells.view.archives"
import { Archive } from "../types"

const columnHelper = createColumnHelper<Archive>()

export const columns = [
    columnHelper.accessor('cuid', {
        header: "#",
        cell: CellIndex,
        enableGrouping: false
    }),
    columnHelper.accessor('pathUrl', {
        header: "Nome",
        cell: CellLinkTo,
        enableGrouping: false
    }),
    columnHelper.accessor('size', {
        header: "Tamanho",
        enableGrouping: false
    }),
    columnHelper.accessor('updatedAt', {
        header: "Ultima modificação",
        cell: CellLastUpdatedAt,
        enableGrouping: false
    }),
] 