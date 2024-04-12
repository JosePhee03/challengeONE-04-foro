import { useEffect, useState } from "preact/hooks";
import { Button } from "./Button";
import { Icon } from "./Icon";
import { Select } from "./Select";
import { ContentModal, FooterModal, HeaderModal, Modal } from "./Modal";
import { Item, List } from "../util/List";
import { DropDown } from "./DropDown";
import { Menu } from "./Menu";
import { MenuItem } from "./MenuItem";

export function FilterMenu() {
  const [openFilter, SetOpenFilter] = useState(false);

  const openModal = () => {
    SetOpenFilter(true);
  };

  const closeModal = () => {
    SetOpenFilter(false);
  };

  return (
    <div class="flex flex-col gap-4 ">
      <Tabs onClick={openModal} />
      <FilterModal isOpen={openFilter} onClose={closeModal} />
    </div>
  );
}

interface TabsProps {
  onClick: () => void;
}

const newSearchParams = (q?: boolean) => {
  const currentUrl = new URL(window.location.href);
  switch (q) {
    case true:
      currentUrl.searchParams.set("status", "1");
      break;
    case false:
      currentUrl.searchParams.set("status", "0");
      break;
    default:
      currentUrl.searchParams.delete("status");
      break;
  }

  return currentUrl.href;
};
function Tabs({ onClick }: TabsProps) {
  return (
    <div class="flex justify-between items-center gap-2 w-full border-b-2 border-contrast-10">
      <div class="sm:hidden">
        <NavDropDown />
      </div>
      <nav class="hidden sm:block">
        <ul class="flex w-full gap-2">
          <li>
            <a
              href={newSearchParams()}
              class="group flex flex-col justify-end items-center h-10 gap-1 px-2 text-primary"
            >
              Todo
              <span class="h-1 rounded-t w-8 bg-primary" />
            </a>
          </li>
          <li>
            <a
              href={newSearchParams(true)}
              class="group flex flex-col justify-end items-center h-10 gap-1 px-2 text-contrast-60"
            >
              Resueltos
              <span class="h-1 rounded-t w-8 group-hover:bg-current transition-colors ease-in duration-100" />
            </a>
          </li>
          <li>
            <a
              href={newSearchParams(false)}
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

const getStatus = () => {
  const currentUrl = new URL(window.location.href);
  let status = currentUrl.searchParams.get("status");

  switch (status) {
    case "1":
      return true;
    case "0":
      return false;
    default:
      return null;
  }
};
const NavDropDown = () => {
  return (
    <DropDown button={buttonNav} buttonId="button-nav" inputId="button-nav">
      <Menu buttonId="button-nav" popoverId="popover-nav">
        <MenuItem
          href={newSearchParams()}
          type="anchor"
          text="Todo"
          icon={getStatus() === null ? "check" : undefined}
          textColor={getStatus() === null ? "text-primary" : undefined}
        />
        <MenuItem
          href={newSearchParams(true)}
          type="anchor"
          text="Resueltos"
          icon={getStatus() ? "check" : undefined}
          textColor={getStatus() ? "text-primary" : undefined}
        />
        <MenuItem
          href={newSearchParams(false)}
          type="anchor"
          text="Sin resolver"
          icon={getStatus() === false ? "check" : undefined}
          textColor={getStatus() === false ? "text-primary" : undefined}
        />
      </Menu>
    </DropDown>
  );
};
const buttonNav = (
  <Button
    ariaControls="popover-nav"
    ariaExpanded={false}
    ariaHaspopup={true}
    id="button-nav"
    title="Abrir menú de navegación"
    type="button"
    variant="tertiary"
  >
    {getStatus() === null ? "Todo" : getStatus() ? "Resueltos" : "Sin Resolver"}
    <Icon name="chevron-down" size="md" />
  </Button>
);

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

interface FilterModal {
  isOpen: boolean;
  onClose: () => void;
}

function FilterModal({ isOpen, onClose }: FilterModal) {
  const [list, setList] = useState<List>();
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const itemsList: Item[] = [
      { isSelected: false, key: 0, name: "CSS" },
      { isSelected: false, key: 2, name: "HTML" },
      { isSelected: false, key: 3, name: "Java" },
      { isSelected: false, key: 4, name: "Node" },
      { isSelected: false, key: 5, name: "Docker" },
      { isSelected: false, key: 6, name: "Tailwind" },
    ];

    const list = new List(itemsList);
    setList(list);
    setItems(list.getList());
  }, []);

  const handleToggleSelected = (key: number) => {
    if (list == undefined) return;
    const newList = list.setSelected(key);
    setItems(newList);
  };

  const handleReset = () => {
    if (list == undefined) return;
    list.reset();
    setList(list);
    setItems(list.getList());
  };

  const onSubmit = (event: SubmitEvent) => {
    const formEl = event.currentTarget as HTMLFormElement;
    const data = new FormData(formEl);
    const queries = {
      categories: data.getAll("categories") as string[],
      direction: data.get("direction") as string,
    };
    const currentUrl = new URL(window.location.href);
    console.log(queries);
    if (queries.categories[0] === "") {
      currentUrl.searchParams.delete("categories");
    } else {
      currentUrl.searchParams.set("categories", queries.categories.join(","));
    }

    if (queries.direction === "desc") {
      currentUrl.searchParams.delete("direction");
    } else {
      currentUrl.searchParams.set("direction", queries.direction);
    }

    window.history.pushState({}, "", currentUrl);
    onClose();
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <form
        onReset={handleReset}
        onSubmit={onSubmit}
        class="grid grid-rows-[auto,1fr,auto] h-full"
      >
        <HeaderModal onClose={onClose} title="Filtros" />
        <ContentModal>
          <div class="flex flex-col gap-8 h-full">
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
            <Select handleToggleSelected={handleToggleSelected} items={items} />
          </div>
        </ContentModal>
        <FooterModal>
          <Button
            className="w-auto"
            title="Borrar los filtros"
            type="reset"
            variant="secondary"
          >
            Borrar filtros
          </Button>

          <Button
            className="w-auto"
            title="Aplicar filtros"
            type="submit"
            variant="primary"
          >
            Aplicar filtros
          </Button>
        </FooterModal>
      </form>
    </Modal>
  );
}
