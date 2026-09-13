"use client"

import { useEffect } from "react"
import Link from "next/link"

type ErrorPageProps = {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col items-center justify-center px-6 py-16 md:py-24">
      <h1 className="mt-2 text-3xl md:text-4xl">Algo ha ido mal</h1>
      <p className="mt-4 max-w-md text-center text-xl text-neutral-600">
        No hemos podido cargar esta página. Puedes intentarlo de nuevo o volver
        al inicio.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={reset}
          className="border border-neutral-300 px-5 py-3 text-sm font-medium text-neutral-800 hover:border-neutral-400"
        >
          Reintentar
        </button>
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
