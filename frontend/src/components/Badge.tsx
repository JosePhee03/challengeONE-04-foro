import { Icon } from "./Icon";

interface BadgeProps {
  name: string;
  withIcon?: boolean;
  title: string;
  onClick: (ev: MouseEvent) => void;
}

export default function Badge({ name, withIcon, title, onClick }: BadgeProps) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      class={`flex ${
        withIcon ? "font-medium rounded" : "rounded-full"
      }  text-sm gap-2 items-center bg-primary-10 px-2 py-1 text-primary-text`}
    >
      {name}
      {withIcon && <Icon name="exit" size="md" />}
    </button>
  );
}
