import { createColumnHelper } from "@tanstack/react-table";
const columnHelper = createColumnHelper<Product>()
export const columns = [
    columnHelper.accessor('id', {
        header: '#',
        // cell: CellIndex,
        enableGrouping: false,
    }),
]