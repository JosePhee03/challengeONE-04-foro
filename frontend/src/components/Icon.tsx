
interface IconProps {
  size: keyof typeof iconsSize
  name: NameIcon
  fillColor?: string
  strokeColor?: string
}

export function Icon({ size, name, fillColor, strokeColor }: IconProps) {

  return (
    <svg aria-hidden class={`${strokeColor ?? "stroke-current"} ${iconsSize[size]} ${fillColor ?? "fill-none"}`}>
      <use href={`/icons.svg#${name}`}></use>
    </svg>
  )

}

const iconsSize = {
  sm: "size-3 stroke-2",
  md: "size-4 stroke-2",
  lg: "size-6 stroke-2",
  xl: "size-8 stroke-[2.5px]"
}

type NameIcon =
  | "logo"
  | "arrow-left"
  | "check"
  | "chevron-down"
  | "chevron-right"
  | "chevron-up"
  | "exit"
  | "eye"
  | "filter"
  | "log-out"
  | "message"
  | "moon"
  | "more-vertical"
  | "pencil"
  | "plus"
  | "reload"
  | "search"
  | "user"