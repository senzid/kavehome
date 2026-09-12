import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Header from "@/components/layout/header/Header"
import { getProductsPage } from "@/modules/products/products"
import ProductsGrid from "@/modules/products/list/ProductsGrid"
import Pagination from "@/modules/products/list/Pagination"

export const revalidate = 86400 // 24h

type ProductsSearchParams = Promise<{ page?: string }>

type Props = {
  searchParams: ProductsSearchParams
}

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
  const title =
    page > 1 ? `Kavehome — Productos | Página ${page}` : "Kavehome — Productos"
  const canonical = page > 1 ? `/products?page=${page}` : "/products"

  return {
    title,
    alternates: {
      canonical,
    },
  }
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
    <>
      <Header />
      <main className="mx-auto w-full max-w-7xl">
        <div className="px-6 pt-10 pb-8 flex flex-col gap-4">
            <h1 className="text-2xl md:text-3xl">Productos</h1>
            <p className="text-sm">Descubre nuestra exclusiva gama de productos, diseñados para aportar elegancia y confort a cualquier ambiente. Desde mesas de comedor sofisticadas hasta opciones de jardín duraderas, cada pieza fusiona funcionalidad con un diseño atractivo. Encuentra el articulo ideal que complemente tu estilo.</p>
        </div>
        <ProductsGrid products={products} />
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      </main>
    </>
  )
}
