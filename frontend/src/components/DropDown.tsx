import { JSX } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";

interface DropDownProps {
  children: JSX.Element | JSX.Element[] | string;
  button: JSX.Element;
  buttonId: string;
  inputId: string;
  fixed?: boolean;
  right?: boolean;
}

export function DropDown({
  children,
  buttonId,
  button,
  inputId,
  fixed,
  right,
}: DropDownProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const refPopoverWrapper = useRef<HTMLDivElement>(null);
  const refPopoverController = useRef<HTMLDivElement>(null);
  const refBackdrop = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const buttonController = document.getElementById(buttonId) as
      | HTMLButtonElement
      | undefined;

    const inputController = document.getElementById(inputId) as
      | HTMLInputElement
      | undefined;

    const popoverController = refPopoverController.current;

    if (
      buttonController != undefined &&
      inputController != undefined &&
      popoverController != null &&
      refBackdrop.current != null
    ) {
      const toggleExpanded = () => {
        const expanded = !isExpanded;
        setIsExpanded(expanded);

        inputController.ariaExpanded = expanded ? "true" : "false";
        popoverController.ariaHidden = !expanded ? "true" : "false";
        refBackdrop.current!.ariaHidden = !expanded ? "true" : "false";
      };

      const clickBackdrop = () => {
        if (isExpanded == true) {
          setIsExpanded(false);
        }
      };

      const handleKeyDown = (event: KeyboardEvent) => {
        switch (event.key) {
          case "Enter": {
            event.preventDefault();
            toggleExpanded();
            break;
          }
          case " ": {
            event.preventDefault();
            toggleExpanded();
            break;
          }
        }
      };

      const PressEsc = (event: KeyboardEvent) => {
        if (event.key == "Escape" && isExpanded == true) {
          event.preventDefault();
          setIsExpanded(false);
        }
      };
      buttonController.addEventListener("click", toggleExpanded);
      buttonController.addEventListener("keydown", handleKeyDown);
      if (refBackdrop.current != null)
        refBackdrop.current.addEventListener("click", clickBackdrop);
      window.addEventListener("keydown", PressEsc);

      return () => {
        buttonController.removeEventListener("click", toggleExpanded);
        buttonController.addEventListener("keydown", handleKeyDown);
        if (refBackdrop.current != null)
          refBackdrop.current.removeEventListener("click", clickBackdrop);
        window.removeEventListener("keydown", PressEsc);
      };
    }
  }, [isExpanded]);

  return (
    <>
      <div ref={refPopoverWrapper} class="w-full sm:relative">
        {button}
        <div
          ref={refBackdrop}
          aria-hidden="true"
          class={
            "z-[80] fixed inset-0 bg-black/10" + (!isExpanded ? " hidden" : "")
          }
        ></div>
        <div
          ref={refPopoverController}
          class={`z-[80] min-w-60 w-full sm:max-w-80 mt-2 fixed ${
            fixed ? "" : "sm:absolute"
          } bottom-0 left-0 right-0 sm:bottom-auto sm:left-auto ${
            right ? "sm:right-auto" : ""
          }`}
        >
          {isExpanded && children}
        </div>
      </div>
    </>
  );
}
