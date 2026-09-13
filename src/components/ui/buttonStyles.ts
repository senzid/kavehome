export type ButtonVariant = "solid" | "outline"
export type ButtonTone = "onDark" | "onLight"
export type ButtonSize = "md" | "sm"

const surfaces: Record<ButtonTone, Record<ButtonVariant, string>> = {
  onDark: {
    solid: "bg-white text-black border border-transparent hover:opacity-80",
    outline: "bg-transparent border border-white text-white hover:opacity-80",
  },
  onLight: {
    solid:
      "bg-neutral-800 text-white border border-transparent hover:bg-neutral-600",
    outline:
      "bg-transparent border border-neutral-300 text-neutral-800 hover:border-neutral-400",
  },
}

const sizes: Record<ButtonSize, string> = {
  md: "px-5 py-2 min-h-10",
  sm: "px-5 py-3 text-sm font-medium",
}

export type ButtonSurfaceProps = {
  variant?: ButtonVariant
  tone?: ButtonTone
  size?: ButtonSize
  className?: string
}

export function buttonSurfaceClassName({
  variant = "solid",
  tone = "onDark",
  size = "md",
  className = "",
}: ButtonSurfaceProps = {}) {
  return [
    "inline-flex items-center justify-center whitespace-nowrap",
    sizes[size],
    surfaces[tone][variant],
    className,
  ].join(" ")
}
