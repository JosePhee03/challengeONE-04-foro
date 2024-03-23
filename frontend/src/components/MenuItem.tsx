import { Icon, IconProps } from "./Icon";

interface MenuItemProps {
  icon?: IconProps["name"];
  text: string;
  textColor?: string;
}

export function MenuItem({ text, icon, textColor }: MenuItemProps) {
  return (
    <a
      tabIndex={0}
      role="menuitem"
      class={`flex items-center text-md select-none gap-2 cursor-pointer px-1 py-2 rounded focus:outline-primary focus:bg-primary-10 hover:bg-primary-10 ${
        textColor ?? "text-body"
      }`}
    >
      <Icon
        name={icon ?? "check"}
        size="md"
        strokeColor={icon ? "stroke-current" : "stroke-transparent"}
      />
      {text}
    </a>
  );
}
