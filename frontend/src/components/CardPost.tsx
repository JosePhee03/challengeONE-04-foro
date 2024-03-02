import Badge from "./Badge";
import { Button } from "./Button";
import { Icon } from "./Icon";
import { UserImage } from "./UserImage";



export default function () {
  return (
    <article class="flex flex-col rounded">
      <header class="flex flex-col gap-2 ">
        <div class="flex gap-2 items-center">
          <UserImage size="md" username="Jose Luis Gutierrez" />
          <div class="flex-1">
            <h4 class="font-medium text-sm text-heading">Jose Luis Gutierrez</h4>
            <p class="text-xs text-secondary-text">hace 3 horas</p>
          </div>
          <Button title="Opciones de la publicación" type="button" variant="tertiary" className="">
            <Icon name="more-vertical" size="lg" fillColor="fill-current" />
          </Button>
        </div>
        <span class="flex flex-wrap gap-2">
          <Badge name="CSS" />
          <Badge name="HTML" />
          <Badge name="JavaScript" />
        </span>
      </header>
      <section class="flex flex-col gap-1 py-4">
        <h2 class="text-lg font-medium text-heading">Problemas de localhost</h2>
        <p class="text-body">El localhost:8080 no funciona correctamente en mi computadora Mac Book Pro</p>
      </section>
      <footer class="flex justify-between border-t border-contrast-10 pt-2">
        <div class="flex gap-2 items-center text-icon-color">
          <Icon name="message" size="lg" />
          0
        </div>
        <div class="flex gap-2 text-primary-text items-center">
          Resuelto
          <span class="flex bg-primary rounded-full justify-center items-center size-8" >
            <Icon name="check" size="lg" strokeColor="stroke-white" />
          </span>
        </div>
      </footer>
    </article>
  )
}