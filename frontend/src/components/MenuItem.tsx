import { Icon, IconProps } from "./Icon";

interface MenuItemProps {
  icon?: IconProps["name"];
  text: string;
  textColor?: string;
  type: "anchor" | "button";
  href?: string;
  onClick?: () => void;
}

export function MenuItem({
  text,
  type,
  href,
  icon,
  onClick,
  textColor,
}: MenuItemProps) {
  switch (type) {
    case "anchor":
      return (
        <AnchorMenuItem
          text={text}
          type={type}
          href={href}
          icon={icon}
          onClick={onClick}
          textColor={textColor}
        />
      );
    case "button":
      return (
        <ButtonMenuItem
          text={text}
          type={type}
          href={href}
          icon={icon}
          onClick={onClick}
          textColor={textColor}
        />
      );
  }
}

const ButtonMenuItem = (props: MenuItemProps) => (
  <button
    role="menuitem"
    type="buttom"
    onClick={props.onClick}
    class={`flex w-full items-center text-md select-none gap-2 cursor-pointer px-1 py-2 rounded focus:outline-primary focus:bg-primary-10 hover:bg-primary-10 ${
      props.textColor ?? "text-body"
    }`}
  >
    <Icon
      name={props.icon ?? "check"}
      size="md"
      strokeColor={props.icon ? "stroke-current" : "stroke-transparent"}
    />
    {props.text}
  </button>
);

const AnchorMenuItem = (props: MenuItemProps) => (
  <a
    role="menuitem"
    class={`flex w-full items-center text-md select-none gap-2 cursor-pointer px-1 py-2 rounded focus:outline-primary focus:bg-primary-10 hover:bg-primary-10 ${
      props.textColor ?? "text-body"
    }`}
    href={props.href}
  >
    <Icon
      name={props.icon ?? "check"}
      size="md"
      strokeColor={props.icon ? "stroke-current" : "stroke-transparent"}
    />
    {props.text}
  </a>
);
