import { Icon } from "./Icon";

export function ButtonsPanel() {
  return (
    <span class="flex w-full justify-between sm:w-auto sm:justify-start sm:gap-4">
      <a
        title="Mis publicaciones"
        href="/myposts"
        class="button button-primary"
      >
        Mis publicaciones
      </a>
      <a href="/create" class="button button-primary">
        <Icon name="plus" size="lg" />
        Crear
      </a>
    </span>
  );
}
