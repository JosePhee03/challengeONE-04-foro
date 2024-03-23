import { Button } from "./Button";
import { Input } from "./Input";
import { TextArea } from "./TextArea";

export function FormPost() {
  return (
    <form class="flex flex-col gap-6">
        <Input label="Título" id="input-title" name="input-title" placeholder="Escriba un breve titulo" type="text" />
        <Input label="Categoria" id="input-category" name="input-category" placeholder="Selecciona alguna categoria" type="text" />
        <TextArea label="Contenido" id="input-content" name="input-content" placeholder="Describa su duda" />
        <Button className="self-end w-fit" type="submit" variant="primary" title="Publicar publicación">
          Publicar
        </Button>
    </form>
  )
}
