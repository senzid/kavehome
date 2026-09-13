import type { ReactNode } from "react"

type PageHeaderProps = {
  title: string
  description?: string
  descriptionClassName?: string
  children?: ReactNode
}

export default function PageHeader({
  title,
  description,
  descriptionClassName = "",
  children,
}: PageHeaderProps) {
  return (
    <main className="mx-auto w-full max-w-7xl">
      <div className="flex flex-col gap-4 px-6 pt-10 pb-8">
        <h1 className="text-2xl md:text-3xl">{title}</h1>
        {description ? (
          <p className={["text-sm", descriptionClassName].filter(Boolean).join(" ")}>
            {description}
          </p>
        ) : null}
      </div>
      {children}
    </main>
  )
}
