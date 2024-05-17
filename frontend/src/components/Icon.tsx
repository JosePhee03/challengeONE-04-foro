export interface IconProps {
  size: keyof typeof iconsSize;
  name: NameIcon;
  fillColor?: string;
  strokeColor?: string;
  className?: string;
}

export function Icon({
  size,
  name,
  fillColor,
  strokeColor,
  className,
}: IconProps) {
  return (
    <svg
      aria-hidden
      class={`${strokeColor ?? "stroke-current"} ${iconsSize[size]} ${
        fillColor ?? "fill-none"
      } ${className ?? ""}`}
    >
      <use href={`/icons.svg#${name}`}></use>
    </svg>
  );
}

const iconsSize = {
  sm: "size-3 stroke-2",
  md: "size-4 stroke-2",
  lg: "size-6 stroke-2",
  xl: "size-8 stroke-[3px]",
};

type NameIcon =
  | "trash"
  | "wifi-off"
  | "arrow-up-wide-narrow"
  | "logo"
  | "bird"
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
  | "settings";
