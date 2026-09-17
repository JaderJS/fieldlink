import { useContext } from "react"
import { ProductsTableContext } from "../components/view.products"

export const useProductsTable = () => {
    const ctx = useContext(ProductsTableContext)
    if (!ctx) throw Error("Do not product table provider attributed")
    return ctx
}