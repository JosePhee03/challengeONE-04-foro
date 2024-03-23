import { Button } from "./Button";
import { Icon } from "./Icon";

export function ButtonsPanel() {
  return (
    <span class="flex w-full justify-between sm:w-auto sm:justify-start sm:gap-4">
      <Button title="Mis publicaciones" type="button" variant="primary">
        Mis publicaciones
      </Button>
      <a href="/create" class="button button-primary">
        <Icon name="plus" size="lg" />
        Crear
      </a>
    </span>
  );
}
