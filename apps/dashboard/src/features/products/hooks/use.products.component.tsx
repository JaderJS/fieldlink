import { useContext } from "react"
import { ProductsContext } from "../providers/provider.products"

export const useProductsComponent = () => {
    const ctx = useContext(ProductsContext)
    if (!ctx) throw Error("Do not product provider attributed")
    return ctx
}