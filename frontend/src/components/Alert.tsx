import { createPortal } from "preact/compat";
import { Icon } from "./Icon";

interface AlertProps {
  isOpen: boolean;
  type: "loading" | "success" | "error";
  text: string;
}

export function Alert({ isOpen, type, text }: AlertProps) {
  if (!isOpen) return null;

  const typeAlert = () => {
    switch (type) {
      case "loading":
        return alertLoading(text);
      case "success":
        return alertSuccess(text);
      case "error":
        return alertError(text);
    }
  };

  return createPortal(typeAlert(), document.getElementById("portal")!);
}

const alertLoading = (text: string) => (
  <div
    role="alert"
    class="z-50 min-w-80 fixed right-4 bottom-4 shadow-[0_4px_16px_rgb(0,0,0,0.4)] rounded bg-primary p-4 "
  >
    <div class="flex gap-4">
      <div
        class="inline-block size-6 animate-spin rounded-full border-2 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"
      >
        <span class="sr-only">Cargando</span>
      </div>

      <div class="flex-1">
        <strong class="block text-md font-bold text-primary-contrast">
          Cargando
        </strong>
        <p class="mt-1 text-sm text-primary-contrast">{text}</p>
      </div>
    </div>
  </div>
);

const alertSuccess = (text: string) => (
  <div
    role="alert"
    class="z-50 min-w-80 fixed right-4 bottom-4 shadow-[0_4px_16px_rgb(0,0,0,0.4)] rounded bg-success p-4 "
  >
    <div class="flex gap-4">
      <Icon name="check" size="lg" strokeColor="stroke-primary-contrast" />

      <div class="flex-1">
        <strong
          role="status"
          class="block text-md font-bold text-primary-contrast"
        >
          Éxito
        </strong>
        <p class="mt-1 text-sm text-primary-contrast">{text}</p>
      </div>
    </div>
  </div>
);

const alertError = (text: string) => (
  <div
    role="alert"
    class="z-50 min-w-80 fixed right-4 bottom-4 shadow-[0_4px_16px_rgb(0,0,0,0.4)] rounded bg-error p-4 "
  >
    <div class="flex gap-4">
      <Icon name="exit" size="lg" strokeColor="stroke-primary-contrast" />

      <div class="flex-1">
        <strong
          role="status"
          class="block text-md font-bold text-primary-contrast"
        >
          Error
        </strong>
        <p class="mt-1 text-sm text-primary-contrast">{text}</p>
      </div>
    </div>
  </div>
);
