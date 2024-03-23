import { useState } from "preact/hooks";
import { Button } from "./Button";
import { Icon } from "./Icon";
import { Input } from "./Input";
import { Select } from "./Select";

export function FilterMenu() {
  const [openFilter, SetOpenFilter] = useState(false);

  const handleClick = () => {
    SetOpenFilter(!openFilter);
  };

  return (
    <div class="flex flex-col gap-4 ">
      <Tabs onClick={handleClick} />
      {openFilter && <CollectionFilter />}
    </div>
  );
}

interface TabsProps {
  onClick: () => void;
}

function Tabs({ onClick }: TabsProps) {
  return (
    <div class="flex justify-between items-center gap-2 w-full border-b-2 border-contrast-10">
      <div class="relative hidden items-center z-40">
        <Button
          title="Filtrar publicaciones"
          variant="tertiary"
          type="button"
          className="text-primary-text"
        >
          Todo
          <Icon name="chevron-down" size="md" />
        </Button>
        <nav class="absolute left-0 rounded min-w-52 p-2 shadow-M bg-base">
          <ul class="flex flex-col w-full text-contrast-60">
            <li class="flex items-center bg-primary-10 p-2 gap-2 rounded">
              <Icon name="check" size="md" strokeColor="stroke-primary" />
              <a href="/" class=" w-full ">
                Todo
              </a>
            </li>
            <li class="flex items-center hover:bg-primary-10 p-2 gap-2 rounded">
              <Icon name="check" size="md" strokeColor="stroke-trasparent" />
              <a href="/?status=1" class=" w-full ">
                Resueltos
              </a>
            </li>
            <li class="flex items-center hover:bg-primary-10 p-2 gap-2 rounded">
              <Icon name="check" size="md" strokeColor="stroke-trasparent" />
              <a href="?status=0" class=" w-full ">
                Sin resolver
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <nav class="hidden sm:block">
        <ul class="flex w-full gap-2">
          <li>
            <a
              href=""
              class="group flex flex-col justify-end items-center h-10 gap-1 px-2 text-primary"
            >
              Todo
              <span class="h-1 rounded-t w-8 bg-primary" />
            </a>
          </li>
          <li>
            <a
              href=""
              class="group flex flex-col justify-end items-center h-10 gap-1 px-2 text-contrast-60"
            >
              Resueltos
              <span class="h-1 rounded-t w-8 group-hover:bg-current transition-colors ease-in duration-100" />
            </a>
          </li>
          <li>
            <a
              href=""
              class="group flex flex-col justify-end items-center h-10 gap-1 px-2 text-contrast-60"
            >
              Sin resolver
              <span class="h-1 rounded-t w-8 bg-trasparent group-hover:bg-current transition-colors ease-in duration-100" />
            </a>
          </li>
        </ul>
      </nav>
      <ButtonFilter onClick={onClick} />
    </div>
  );
}

interface ButtonFilterProps {
  onClick: () => void;
}

function ButtonFilter({ onClick }: ButtonFilterProps) {
  return (
    <Button
      title="Filtrar publicaciones"
      variant="tertiary"
      type="button"
      className="text-primary-text"
      onClick={onClick}
    >
      Filter
      <Icon name="filter" size="md" />
    </Button>
  );
}

function CollectionFilter() {
  return (
    <form
      onReset={() => console.log("reset")}
      class="p-4 border border-contrast-10 hover:bg-contrast-5 rounded space-y-4"
    >
      <h3 class="text-heading text-lg">Filtros</h3>
      <div class="flex flex-wrap gap-8">
        <fieldset class="space-y-2">
          <legend class="text-secondary-text">Fecha de creación</legend>
          <div class="space-y-2">
            <label
              for="desc"
              class="flex rounded focus-within:ring-2 focus-within:ring-primary text-primary-contrast items-center cursor-pointer gap-2"
            >
              <input
                id="desc"
                name="direction"
                value="desc"
                type="radio"
                class="peer sr-only"
                checked
                required
              />
              <div class="size-5 rounded-full bg-contrast-20 peer-checked:bg-white border-[6px] border-transparent peer-checked:border-primary"></div>
              <strong class="font-normal text-body"> Más reciente </strong>
            </label>
            <label
              for="asc"
              class="rounded focus-within:ring-2 focus-within:ring-primary flex text-primary-contrast items-center cursor-pointer gap-2"
            >
              <input
                id="asc"
                name="direction"
                value="asc"
                type="radio"
                class="peer sr-only"
                required
              />
              <div
                role="checkbox"
                id="asc"
                name="direction"
                value="asc"
                type="radio"
                required
                class="size-5 rounded-full bg-contrast-20 peer-checked:bg-white border-[6px] border-transparent peer-checked:border-primary"
              ></div>
              <strong class="font-normal text-body"> Más antiguo </strong>
            </label>
          </div>
        </fieldset>
        <fieldset class="space-x-1">
          <legend class="text-secondary-text">Categorias</legend>
          <Select />
        </fieldset>
      </div>
      <hr class="border-contrast-10" />
      <div class="flex flex-wrap gap-4 justify-between">
        <Button
          className="w-full sm:w-auto"
          title="Borrar los filtros"
          type="reset"
          variant="secondary"
        >
          Borrar filtros
        </Button>

        <Button
          className="w-full sm:w-auto"
          title="Aplicar filtros"
          type="submit"
          variant="primary"
        >
          Aplicar filtros
        </Button>
      </div>
    </form>
  );
}
