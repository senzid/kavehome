import type { ComponentProps } from "react"
import {
  buttonSurfaceClassName,
  type ButtonSurfaceProps,
} from "./buttonStyles"

type ButtonProps = ButtonSurfaceProps & ComponentProps<"button">

export default function Button({
  variant = "solid",
  tone = "onDark",
  size = "md",
  className = "",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonSurfaceClassName({ variant, tone, size, className })}
      {...props}
    />
  )
}
