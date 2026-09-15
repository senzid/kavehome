import type { Metadata } from "next"
import PageHeader from "@/components/layout/PageHeader"
import { buildPageMetadata } from "@/lib/seo"
import {
  getProductsPage,
  Pagination,
  ProductsGrid,
} from "@/modules/products"

export const revalidate = 86400 // 24h

const PRODUCTS_DESCRIPTION =
  "Explora la colección de mobiliario y decoración Kave Home: diseño, confort y piezas para cada espacio."

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    title: "Productos",
    description: PRODUCTS_DESCRIPTION,
    path: "/products",
  })
}

export default async function Products() {
  const { products, totalPages, page: currentPage } = await getProductsPage(1)

  return (
    <PageHeader
      title="Productos"
      description="Descubre nuestra exclusiva gama de productos, diseñados para aportar elegancia y confort a cualquier ambiente. Desde mesas de comedor sofisticadas hasta opciones de jardín duraderas, cada pieza fusiona funcionalidad con un diseño atractivo. Encuentra el articulo ideal que complemente tu estilo."
    >
      <ProductsGrid products={products} />
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </PageHeader>
  )
}
