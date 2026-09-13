import type { Metadata } from "next"
import { FavoritesView } from "@/modules/products"

export const metadata: Metadata = {
  title: "Kavehome — Favoritos",
  alternates: {
    canonical: "/favorites",
  },
}

export default function FavoritesPage() {
  return (
    <main className="mx-auto w-full max-w-7xl">
      <div className="flex flex-col gap-4 px-6 pt-10 pb-8">
        <h1 className="text-2xl md:text-3xl">Favoritos</h1>
        <p className="text-sm text-neutral-600">
          Guarda los productos que más te gustan y vuelve a ellos cuando
          quieras.
        </p>
      </div>
      <FavoritesView />
    </main>
  )
}
