import { userStore } from "../store/userStore";
import { Icon } from "./Icon";

export function ButtonsPanel() {
  return (
    <span class="flex w-full justify-between sm:w-auto sm:justify-start sm:gap-4">
      <a
        title={
          location.pathname.startsWith("/myposts")
            ? "Todas las publicaciones"
            : "Mis publicaciones"
        }
        href={
          location.pathname.startsWith("/myposts")
            ? "/"
            : `/myposts/${userStore.getState().user?.id}`
        }
        class="button button-primary"
      >
        {location.pathname.startsWith("/myposts")
          ? "Todas las publicaciones"
          : "Mis publicaciones"}
      </a>
      <a href="/create" class="button button-primary">
        <Icon name="plus" size="lg" />
        Crear
      </a>
    </span>
  );
}
