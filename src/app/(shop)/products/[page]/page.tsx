import type { Metadata } from "next"
import { notFound, permanentRedirect } from "next/navigation"
import PageHeader from "@/components/layout/PageHeader"
import { buildPageMetadata } from "@/lib/seo"
import {
  getProductsPage,
  Pagination,
  ProductsGrid,
  PRODUCTS_PRERENDER_PAGES,
} from "@/modules/products"

export const revalidate = 86400 // 24h
export const dynamicParams = true

const PRODUCTS_DESCRIPTION =
  "Explora la colección de mobiliario y decoración Kave Home: diseño, confort y piezas para cada espacio."

type Props = {
  params: Promise<{ page: string }>
}

function parsePage(pageParam: string): number | null {
  const page = Number(pageParam)
  if (!Number.isInteger(page) || page < 2) return null
  return page
}

export async function generateStaticParams() {
  const staticPages = []
  for (let p = 2; p <= PRODUCTS_PRERENDER_PAGES; p++) {
    staticPages.push({ page: String(p) })
  }
  return staticPages
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { page: pageParam } = await params
  const page = parsePage(pageParam)

  if (!page) return {}

  return buildPageMetadata({
    title: `Productos · Página ${page}`,
    description: PRODUCTS_DESCRIPTION,
    path: `/products/${page}`,
  })
}

export default async function ProductsPage({ params }: Props) {
  const { page: pageParam } = await params

  if (pageParam === "1") {
    permanentRedirect("/products")
  }

  const page = parsePage(pageParam)
  if (!page) notFound()

  const { products, totalPages, page: currentPage } = await getProductsPage(page).catch(() => {
    notFound()
  })

  if (page > totalPages && totalPages > 0) {
    notFound()
  }

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
