import type { ReactNode } from "react"
import { FavoritesProvider } from "@/modules/products"

export default function ShopLayout({ children }: { children: ReactNode }) {
  return <FavoritesProvider>{children}</FavoritesProvider>
}
