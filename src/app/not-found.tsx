import type { Metadata } from "next"
import StatusPage from "@/components/layout/StatusPage"
import ButtonLink from "@/components/ui/ButtonLink"
import { noIndexRobots } from "@/lib/seo"

export const metadata: Metadata = {
  title: "Página no encontrada",
  description: "La página que buscas no existe o ya no está disponible.",
  robots: noIndexRobots,
}

export default function NotFound() {
  return (
    <StatusPage
      title="No encontramos lo que buscas,"
      description="pero esto puede interesarte"
      actions={
        <>
          <ButtonLink href="/products" variant="outline" tone="onLight" size="sm">
            Ver productos
          </ButtonLink>
          <ButtonLink href="/" variant="solid" tone="onLight" size="sm">
            Ir al inicio
          </ButtonLink>
        </>
      }
    />
  )
}
