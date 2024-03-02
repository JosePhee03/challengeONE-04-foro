import { Button } from "../components/Button";
import Header from "../components/Header";
import { Icon } from "../components/Icon";
import { Input } from "../components/Input";
import FilterMenu from "../components/FilterMenu";
import CardPost from "../components/CardPost";

export default function Home() {
  return (
    <>
      <Header variant="primary" />
      <main class="flex flex-col gap-2">
        <section class="flex justify-between gap-4 flex-wrap px-4 md:px-0">
          <span class="flex w-full justify-between sm:w-auto sm:justify-start sm:gap-4">
            <Button title="Mis publicaciones" type="button" variant="primary">
              Mis publicaciones
            </Button>
            <Button title="Crear un publicación" type="button" variant="primary">
              <Icon name="plus" size="lg" />
              Crear
            </Button>
          </span>
          <form class="flex sm:w-auto gap-2">
            <Input className="w-full" id="input-search" name="input-search" placeholder="Buscar publicación" type="search" pattern=".*" />
            <Button title="Buscar publicación" type="submit" variant="primary">
              <Icon name="search" size="lg" />
            </Button>
          </form>

          <FilterMenu />
        </section>
        <section class="flex flex-col gap-4">
          <a href="/post/1" class="flex flex-col md:border border-contrast-10 p-4 hover:bg-contrast-5 md:rounded">
            <CardPost />
          </a>
          <a href="/post/1" class="flex flex-col md:border border-contrast-10 p-4 hover:bg-contrast-5 md:rounded">
            <CardPost />
          </a>
          <a href="/post/1" class="flex flex-col md:border border-contrast-10 p-4 hover:bg-contrast-5 md:rounded">
            <CardPost />
          </a>
          <a href="/post/1" class="flex flex-col md:border border-contrast-10 p-4 hover:bg-contrast-5 md:rounded">
            <CardPost />
          </a>
        </section>

      </main >
    </>
  )
}