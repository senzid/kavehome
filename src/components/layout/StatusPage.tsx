import type { ReactNode } from "react"

type StatusPageProps = {
  title: string
  description: ReactNode
  actions: ReactNode
}

export default function StatusPage({
  title,
  description,
  actions,
}: StatusPageProps) {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col items-center justify-center px-6 py-16 md:py-24">
      <h1 className="mt-2 text-3xl md:text-4xl">{title}</h1>
      <p className="mt-4 max-w-md text-center text-xl text-neutral-600">
        {description}
      </p>
      <div className="mt-8 flex flex-wrap gap-3">{actions}</div>
    </main>
  )
}