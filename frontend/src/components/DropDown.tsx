import { JSX } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";

interface DropDownProps {
  children: JSX.Element | JSX.Element[] | string;
  button: JSX.Element;
  buttonId: string;
}

export function DropDown({ children, buttonId, button }: DropDownProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const refPopoverWrapper = useRef<HTMLDivElement>(null);
  const refPopoverController = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const buttonController = document.getElementById(buttonId) as
      | HTMLButtonElement
      | undefined;

    const popoverController = refPopoverController.current;

    if (buttonController != undefined && popoverController != null) {
      const toggleExpanded = () => {
        const expanded = !isExpanded;
        setIsExpanded(expanded);

        buttonController.ariaExpanded = expanded ? "true" : "false";
        popoverController.ariaHidden = !expanded ? "true" : "false";
      };

      const clickOusite = (event: MouseEvent) => {
        const targetElement = event.target as Node;
        if (!refPopoverWrapper.current?.contains(targetElement)) {
          setIsExpanded(false);
        }
      };

      buttonController.addEventListener("click", toggleExpanded);
      document.addEventListener("click", clickOusite);

      return () => {
        buttonController.removeEventListener("click", toggleExpanded);
        document.removeEventListener("click", clickOusite);
      };
    }
  }, [isExpanded]);

  return (
    <div ref={refPopoverWrapper} class="relative">
      {button}
      <div
        ref={refPopoverController}
        class={`z-50 mt-2 absolute right-0 ${isExpanded ? "" : "hidden"}`}
      >
        {children}
      </div>
    </div>
  );
}
