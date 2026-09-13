import type { Metadata } from "next"
import Link from "next/link"
import { noIndexRobots } from "@/lib/seo"

export const metadata: Metadata = {
  title: "Página no encontrada",
  description: "La página que buscas no existe o ya no está disponible.",
  robots: noIndexRobots,
}

export default function NotFound() {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center items-center px-6 py-16 md:py-24">
      <h1 className="mt-2 text-3xl md:text-4xl">No encontramos lo que buscas,</h1>
      <p className="mt-4 max-w-md text-xl text-neutral-600">
        pero esto puede interesarte
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/products"
          className="border border-neutral-300 px-5 py-3 text-sm font-medium text-neutral-800 hover:border-neutral-400"
        >
          Ver productos
        </Link>
        <Link
          href="/"
          className="bg-neutral-800 px-5 py-3 text-sm font-medium text-white hover:bg-neutral-600"
        >
          Ir al inicio
        </Link>
      </div>
    </main>
  )
}
