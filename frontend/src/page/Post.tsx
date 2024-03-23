import { Button } from "../components/Button";
import CardPost from "../components/CardPost";
import Header from "../components/Header";
import { Icon } from "../components/Icon";
import { TextArea } from "../components/TextArea";
import { UserImage } from "../components/UserImage";

interface PostProps {
  postId: number
}

export default function Post({ postId }: PostProps) {

  console.log(postId)
  return (
    <>
      <Header variant="secondary" text="Publicación" />
      <main class="flex flex-col">
        <section class="pb-2">
          <CardPost />
        </section>
        <section class="border-t border-contrast-10 py-4 flex gap-2">
          <UserImage size="md" username="Jose Luis Gutierrez" />
          <form class="flex flex-col items-end gap-2 w-full">
            <TextArea className="w-full" id="textarea-comment" name="textarea-comment" placeholder="Responder publicación" />
            <Button className="w-32" variant="primary" title="Enviar respuesta" type="submit">
              Responder
            </Button>
          </form>
        </section>
        <section class="flex border-t border-contrast-10 py-4 gap-4">
          <article class="flex w-full gap-2">
            <UserImage size="sm" username="Jose Luis Gutierrez" />
            <div class="flex w-full flex-col">
              <header class="flex gap-2 ">
                <div class="flex-1 gap-2">
                  <h4 class="font-medium text-sm text-heading">Jose Luis Gutierrez</h4>
                  <p class="text-xs text-secondary-text">hace 3 horas</p>
                </div>
                <Button title="Opciones de la publicación" type="button" variant="tertiary" className="">
                  <Icon name="more-vertical" size="lg" fillColor="fill-current" />
                </Button>
              </header>
              <p class="text-body">El localhost:8080 no funciona correctamente en mi computadora Mac Book Pro</p>
            </div>
          </article>
        </section>
      </main>
    </>
  )
}