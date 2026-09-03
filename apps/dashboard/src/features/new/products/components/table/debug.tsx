import { MOCK_PRODUCTS } from "../../constants/generated";
import { ProductTableProps, ProductTableRoot } from "../../providers/provider.products";
import { ProductTable_ } from "./table";



export default function ProductTable({ initialData = MOCK_PRODUCTS, className, pageSize = 10 }: ProductTableProps) {

    const data = MOCK_PRODUCTS

    return (
        <ProductTableRoot
            initialData={initialData}
            data={data}
            // onDataChange={console.log}
        >
            <ProductTable_
                className={className}
                pageSize={pageSize}
            />
        </ProductTableRoot>
    );
}

