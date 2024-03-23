import { JSX } from "preact/jsx-runtime";

export interface MenuProps {
  popoverId: string;
  buttonId: string;
  children: JSX.Element[];
}

export function Menu({ children, popoverId, buttonId }: MenuProps) {
  return (
    <div class="min-w-48 p-1 bg-base rounded shadow-[0_0_8px_4px_rgb(0,0,0,0.2)]">
      <ul
        id={popoverId}
        aria-labelledby={buttonId}
        role="menu"
        class="flex flex-col"
      >
        {children.map((item) => (
          <li>{item}</li>
        ))}
      </ul>
    </div>
  );
}
