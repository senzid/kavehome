import type { Metadata } from "next"
import PageHeader from "@/components/layout/PageHeader"
import { noIndexRobots } from "@/lib/seo"
import { FavoritesView } from "@/modules/products"

export const metadata: Metadata = {
  title: "Favoritos",
  robots: noIndexRobots,
}

export default function FavoritesPage() {
  return (
    <PageHeader
      title="Favoritos"
      description="Guarda los productos que más te gustan y vuelve a ellos cuando quieras."
      descriptionClassName="text-neutral-600"
    >
      <FavoritesView />
    </PageHeader>
  )
}
