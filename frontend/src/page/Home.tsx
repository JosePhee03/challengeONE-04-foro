import { Button } from "../components/Button";
import Header from "../components/Header";
import { Icon } from "../components/Icon";
import { Input } from "../components/Input";

export default function Home() {
  return (
    <>
      <Header variant="primary" />
      <main>
        <div class="flex justify-between flex-wrap gap-4">
          <span class="flex w-full bg-red-100 justify-between sm:w-auto sm:justify-start sm:gap-4">
            <Button title="Mis publicaciones" type="button" variant="primary">
              Mis publicaciones
            </Button>
            <Button title="Mis publicaciones" type="button" variant="primary">
              <Icon name="plus" size="lg" />
              crear
            </Button>
          </span>
          <form class="flex w-full sm:w-auto bg-slate-600 gap-4">
            <Input className="w-full" id="input-search" name="input-search" placeholder="Buscar publicación" type="search" pattern=".*" />
            <Button title="Buscar publicación" type="submit" variant="primary">
              Buscar
            </Button>
          </form>
        </div>
      </main>
    </>
  )
}