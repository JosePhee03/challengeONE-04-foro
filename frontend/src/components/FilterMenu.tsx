import Badge from "./Badge";
import { Button } from "./Button";
import { Icon } from "./Icon";

export default function FilterMenu() {

  return (
    <div class="flex w-full flex-col gap-2">
      <div class="flex justify-between items-center gap-2 w-full border-b-2 border-contrast-10">
        <div class="relative hidden items-center z-40">
          <Button title="Filtrar publicaciones" variant="tertiary" type="button" className="text-primary-text">
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
              <a href="" class="group flex flex-col justify-end items-center h-10 gap-1 px-2 text-primary">
                Todo
                <span class="h-1 rounded-t w-8 bg-primary" />
              </a>
            </li>
            <li>
              <a href="" class="group flex flex-col justify-end items-center h-10 gap-1 px-2 text-contrast-60">
                Resueltos
                <span class="h-1 rounded-t w-8 group-hover:bg-current transition-colors ease-in duration-100" />
              </a>
            </li>
            <li>
              <a href="" class="group flex flex-col justify-end items-center h-10 gap-1 px-2 text-contrast-60">
                Sin resolver
                <span class="h-1 rounded-t w-8 bg-trasparent group-hover:bg-current transition-colors ease-in duration-100" />
              </a>
            </li>
          </ul>
        </nav>
        <Button title="Filtrar publicaciones" variant="tertiary" type="button" className="text-primary-text">
          Filter
          <Icon name="filter" size="md" />
        </Button>
      </div>
      <div class="w-full  flex relative">
        <span class="flex overflow-x-hidden gap-1">
          <Badge name="CSS" withIcon />
          <Badge name="CSS" withIcon />
          <Badge name="CSS" withIcon />
          <Badge name="CSS" withIcon />
          <Badge name="CSS" withIcon />
          <Badge name="CSS" withIcon />
          <Badge name="CSS" withIcon />
          <Badge name="CSS" withIcon />
          <Badge name="CSS" withIcon />
          <Badge name="CSS" withIcon />
          <Badge name="CSS" withIcon />
          <Badge name="CSS" withIcon />
          <Badge name="CSS" withIcon />
        </span>
        <div class="absolute right-0 bg-gradient-to-r from-transparent to-base w-10 h-full"></div>
      </div>
    </div>
  )
}