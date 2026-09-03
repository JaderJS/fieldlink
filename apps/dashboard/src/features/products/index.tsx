import { ProductsProvider as ProviderProducts, SelectedProduct } from "./providers/provider.products"
import { ViewProducts } from "./components/view.products"
import { MoreActions } from "./components/view/more.actions"
import { ActionItem } from "./components/view/action.item"
import { Header } from "./components/view/header"
import { HeaderSearch } from "./components/view/header"
import { Product } from "./types"
import { useProducts } from "../products/hooks/use.products"

export { ProviderProducts, ViewProducts, MoreActions, ActionItem, Header, HeaderSearch }
//API hooks
export { useProducts }
export type { Product, SelectedProduct }