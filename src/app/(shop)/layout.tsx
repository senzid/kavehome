import type { ReactNode } from "react"
import { FavoritesProvider } from "@/modules/products/favorites/FavoritesContext"

export default function ShopLayout({ children }: { children: ReactNode }) {
  return <FavoritesProvider>{children}</FavoritesProvider>
}
