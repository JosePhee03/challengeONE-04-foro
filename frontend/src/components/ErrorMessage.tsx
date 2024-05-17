import { Button } from "./Button";
import { Icon } from "./Icon";

export function ErrorMessage() {
  return (
    <div class="flex w-full flex-col gap-2 justify-center  items-center py-8">
      <svg aria-hidden class="size-16 stroke-primary-text stroke-2">
        <use href={`/icons.svg#wifi-off`}></use>
      </svg>
      <span class="text-primary-text text-lg">Error de conexión</span>
      <div class="flex gap-4">
        <Button
          title="Volver hacia atrás"
          type="button"
          variant="secondary"
          onClick={() => history.back()}
        >
          <Icon name="arrow-left" size="md" />
          Atrás
        </Button>
        <Button
          title="Recargar página"
          type="button"
          variant="secondary"
          onClick={() => location.reload()}
        >
          <Icon name="reload" size="md" />
          Recargar
        </Button>
      </div>
    </div>
  );
}
