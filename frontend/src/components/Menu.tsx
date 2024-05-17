import { JSX } from "preact/jsx-runtime";

export interface MenuProps {
  popoverId: string;
  buttonId: string;
  children: JSX.Element | JSX.Element[];
}

export function Menu({ children, popoverId, buttonId }: MenuProps) {
  return (
    <div class="w-full h-auto sm:min-w-48 px-4 py-8 sm:p-1 bg-base rounded shadow-[0_0_8px_4px_rgb(0,0,0,0.2)]">
      <ul
        id={popoverId}
        aria-labelledby={buttonId}
        role="menu"
        class="flex flex-col"
      >
        {Array.isArray(children) ? (
          children.map((item) => <li>{item}</li>)
        ) : (
          <li>{children}</li>
        )}
      </ul>
    </div>
  );
}
