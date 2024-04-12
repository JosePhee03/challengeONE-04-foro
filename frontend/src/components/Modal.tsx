import { useEffect, useRef } from "preact/compat";
import { Button } from "./Button";
import { Icon } from "./Icon";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: any;
}

export function Modal({ open, onClose, children }: ModalProps) {
  if (!open) return null;

  const dialogRef = useRef<HTMLDivElement>(null);

  const keyDownHandler = (e: KeyboardEvent) => {
    const focusableModalElements = dialogRef.current!.querySelectorAll(
      "a[href], button:not([disabled]), textarea, input, select"
    );

    const firstElement = focusableModalElements[0] as HTMLElement;
    const lastElement = focusableModalElements[
      focusableModalElements.length - 1
    ] as HTMLElement;

    if (e.key === "Escape") {
      return onClose();
    }

    if (e.key !== "Tab") return;

    if (!e.shiftKey && document.activeElement === lastElement) {
      firstElement.focus();
      return e.preventDefault();
    }

    if (e.shiftKey && document.activeElement === firstElement) {
      lastElement.focus();
      e.preventDefault();
    }
  };

  useEffect(() => {
    const focusableModalElements = dialogRef.current!.querySelectorAll(
      "a[href], button:not([disabled]), textarea, input, select"
    );

    const firstElement = focusableModalElements[0] as HTMLElement;

    firstElement.focus();
  }, []);

  const stopPropagation = (e: MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      ref={dialogRef}
      onClick={onClose}
      onKeyDown={keyDownHandler}
      class="fixed inset-0 z-50 w-full bg-black/50 h-full flex justify-center sm:items-center items-end"
    >
      <div
        onClick={stopPropagation}
        class="w-full h-full sm:max-w-[500px] sm:h-auto sm:max-h-[600px] bg-base rounded"
      >
        {children}
      </div>
    </div>
  );
}

interface HeaderModalProps {
  onClose: () => void;
  title: string;
}

export function HeaderModal({ onClose, title }: HeaderModalProps) {
  return (
    <header class="flex flex-row-reverse border-b border-contrast-10 px-6 py-4 items-center justify-between">
      <Button
        tabIndex={0}
        title="Cerrar ventana emergente"
        type="button"
        variant="tertiary"
        onClick={onClose}
        id="button-close-modal"
      >
        <Icon strokeColor="stroke-primary-text" name="exit" size="lg" />
      </Button>
      <h5 class="text-2xl text-heading">{title}</h5>
    </header>
  );
}

interface ContentModalProps {
  children: any;
}

export function ContentModal({ children }: ContentModalProps) {
  return (
    <div class="shadow-scroll w-full px-6 py-6 overflow-y-auto">{children}</div>
  );
}

interface FooterModalProps {
  children: any;
}

export function FooterModal({ children }: FooterModalProps) {
  return (
    <footer class="flex px-6 py-4 border-t border-contrast-10 items-center justify-between">
      {children}
    </footer>
  );
}
