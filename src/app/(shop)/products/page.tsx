import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { buildPageMetadata } from "@/lib/seo"
import {
  getProductsPage,
  Pagination,
  ProductsGrid,
} from "@/modules/products"

export const revalidate = 86400 // 24h

type ProductsSearchParams = Promise<{ page?: string }>

type Props = {
  searchParams: ProductsSearchParams
}

const PRODUCTS_DESCRIPTION =
  "Explora la colección de mobiliario y decoración Kave Home: diseño, confort y piezas para cada espacio."

function parsePage(pageParam: string | undefined): number {
  const page = Number(pageParam)
  if (!Number.isFinite(page) || page < 1) return 1
  return Math.floor(page)
}

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const { page: pageParam } = await searchParams
  const page = parsePage(pageParam)
  const title = page > 1 ? `Productos · Página ${page}` : "Productos"
  const path = page > 1 ? `/products?page=${page}` : "/products"

  return buildPageMetadata({
    title,
    description: PRODUCTS_DESCRIPTION,
    path,
  })
}

export default async function Products({ searchParams }: Props) {
  const { page: pageParam } = await searchParams
  const page = parsePage(pageParam)
  const { products, totalPages, page: currentPage } =
    await getProductsPage(page)

  if (page > totalPages && totalPages > 0) {
    notFound()
  }

  return (
    <main className="mx-auto w-full max-w-7xl">
      <div className="px-6 pt-10 pb-8 flex flex-col gap-4">
        <h1 className="text-2xl md:text-3xl">Productos</h1>
        <p className="text-sm">
          Descubre nuestra exclusiva gama de productos, diseñados para aportar
          elegancia y confort a cualquier ambiente. Desde mesas de comedor
          sofisticadas hasta opciones de jardín duraderas, cada pieza fusiona
          funcionalidad con un diseño atractivo. Encuentra el articulo ideal
          que complemente tu estilo.
        </p>
      </div>
      <ProductsGrid products={products} />
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </main>
  )
}
