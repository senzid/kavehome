import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { buildPageMetadata, noIndexRobots } from "@/lib/seo"
import { getProductBySku, ProductDetailView } from "@/modules/products"

export const revalidate = 86400 // 24h

type Props = {
  params: Promise<{ sku: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { sku } = await params
  const product = await getProductBySku(sku)

  if (!product) {
    return { robots: noIndexRobots }
  }

  const description = product.description.slice(0, 160)

  return buildPageMetadata({
    title: product.title,
    description,
    path: `/products/p/${product.sku}`,
    images: [product.image, ...product.images],
  })
}

export default async function ProductPage({ params }: Props) {
  const { sku } = await params
  const product = await getProductBySku(sku)

  if (!product) {
    notFound()
  }

  return (
    <main>
      <ProductDetailView product={product} />
    </main>
  )
}
