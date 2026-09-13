"use client"

import { useEffect } from "react"
import StatusPage from "@/components/layout/StatusPage"
import Button from "@/components/ui/Button"
import ButtonLink from "@/components/ui/ButtonLink"

type ErrorPageProps = {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <StatusPage
      title="Algo ha ido mal"
      description="No hemos podido cargar esta página. Puedes intentarlo de nuevo o volver al inicio."
      actions={
        <>
          <Button variant="outline" tone="onLight" size="sm" onClick={reset}>
            Reintentar
          </Button>
          <ButtonLink href="/" variant="solid" tone="onLight" size="sm">
            Ir al inicio
          </ButtonLink>
        </>
      }
    />
  )
}
