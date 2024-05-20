import { useEffect, useState } from "preact/hooks";
import { Button } from "./Button";
import { Icon } from "./Icon";
import { ContentModal, FooterModal, HeaderModal, Modal } from "./Modal";
import { DropDown } from "./DropDown";
import { Menu } from "./Menu";
import { MenuItem } from "./MenuItem";
import { SelectCategories } from "./SelectCategories";
import { searchParamsStore } from "../store/searchParamsStore";

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

const newSearchParams = (status?: boolean) => {
  const { setStatus } = searchParamsStore.getState();
  setStatus(status);
};
function Tabs({ onClick }: TabsProps) {
  const [status, setStatus] = useState<boolean | undefined>(
    searchParamsStore.getState().getStatus()
  );

  useEffect(() => {
    searchParamsStore.subscribe(({ searchParams }) => {
      setStatus(searchParams.status);
    });
  }, []);

  return (
    <div class="flex justify-between items-center gap-2 w-full border-b-2 border-contrast-10">
      <div class="sm:hidden">
        <NavDropDown status={status} />
      </div>
      <nav class="hidden sm:block">
        <ul class="flex w-full gap-2">
          <li>
            <button
              onClick={() => newSearchParams()}
              title="Ver todas las publicaciones"
              type="button"
              class={`${
                status == undefined ? "text-primary" : "text-contrast-60"
              } group flex flex-col justify-end items-center h-10 gap-1 px-2 `}
            >
              Todo
              <span
                class={`${
                  status == undefined
                    ? "bg-primary"
                    : "bg-trasparent group-hover:bg-current"
                } h-1 rounded-t w-8  transition-colors ease-in duration-100`}
              />
            </button>
          </li>
          <li>
            <button
              onClick={() => newSearchParams(true)}
              title="Ver publicaciones resultas"
              type="button"
              class={`${
                status ? "text-primary" : "text-contrast-60"
              } group flex flex-col justify-end items-center h-10 gap-1 px-2 `}
            >
              Resueltos
              <span
                class={`${
                  status ? "bg-primary" : "bg-trasparent group-hover:bg-current"
                } h-1 rounded-t w-8  transition-colors ease-in duration-100`}
              />
            </button>
          </li>
          <li>
            <button
              onClick={() => newSearchParams(false)}
              title="Ver publicaciones sin resolver"
              type="button"
              class={`${
                status === false ? "text-primary" : "text-contrast-60"
              } group flex flex-col justify-end items-center h-10 gap-1 px-2 `}
            >
              Sin resolver
              <span
                class={`${
                  status === false
                    ? "bg-primary"
                    : "bg-trasparent group-hover:bg-current"
                } h-1 rounded-t w-8  transition-colors ease-in duration-100`}
              />
            </button>
          </li>
        </ul>
      </nav>
      <ButtonFilter onClick={onClick} />
    </div>
  );
}

interface NavDropDownProps {
  status?: boolean;
}

const NavDropDown = ({ status }: NavDropDownProps) => {
  return (
    <DropDown
      button={<ButtonNav status={status} />}
      buttonId="button-nav"
      inputId="button-nav"
    >
      <Menu buttonId="button-nav" popoverId="popover-nav">
        <MenuItem
          onClick={() => newSearchParams()}
          type="button"
          text="Todo"
          title="Ver todas las publicaciones"
          icon={status == undefined ? "check" : undefined}
          textColor={status == undefined ? "text-primary" : "text-contrast-60"}
        />
        <MenuItem
          onClick={() => newSearchParams(true)}
          type="button"
          text="Resueltos"
          title="Ver publicaciones resultas"
          icon={status ? "check" : undefined}
          textColor={status ? "text-primary" : "text-contrast-60"}
        />
        <MenuItem
          onClick={() => newSearchParams(false)}
          type="button"
          title="Ver publicaciones sin resolver"
          text="Sin resolver"
          icon={status === false ? "check" : undefined}
          textColor={status === false ? "text-primary" : "text-contrast-60"}
        />
      </Menu>
    </DropDown>
  );
};
const ButtonNav = ({ status }: NavDropDownProps) => (
  <Button
    ariaControls="popover-nav"
    ariaExpanded={false}
    ariaHaspopup={true}
    id="button-nav"
    title="Abrir menú de navegación"
    type="button"
    variant="secondary"
  >
    {status == undefined ? "Todo" : status ? "Resueltos" : "Sin Resolver"}
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
  const [reset, setReset] = useState(false);
  const [isChecked, setIsChecked] = useState(
    searchParamsStore.getState().getDirection() === "ASC"
  );

  const handleReset = () => {
    setReset(true);
  };

  useEffect(() => {
    searchParamsStore.subscribe(({ getDirection }) => {
      setIsChecked(getDirection() === "ASC");
    });
  }, []);

  const onSubmit = (event: SubmitEvent) => {
    const formEl = event.currentTarget as HTMLFormElement;
    const data = new FormData(formEl);

    const categories = (data.getAll("categories") as string[])[0]
      .split(",")
      .map((e) => parseInt(e));

    const direction = data.get("direction") as string;
    const { setCategories, setDirection } = searchParamsStore.getState();
    setDirection(direction);
    setCategories(Number.isNaN(categories[0]) ? [] : categories);
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
                  for="DESC"
                  class="flex rounded focus-within:ring-2 focus-within:ring-primary text-primary-contrast items-center cursor-pointer gap-2"
                >
                  <input
                    id="DESC"
                    name="direction"
                    value="DESC"
                    type="radio"
                    class="peer sr-only"
                    checked={!isChecked}
                    required
                  />
                  <div class="size-5 rounded-full bg-contrast-20 peer-checked:bg-white border-[6px] border-transparent peer-checked:border-primary"></div>
                  <strong class="font-normal text-body"> Más reciente </strong>
                </label>
                <label
                  for="ASC"
                  class="rounded focus-within:ring-2 focus-within:ring-primary flex text-primary-contrast items-center cursor-pointer gap-2"
                >
                  <input
                    id="ASC"
                    name="direction"
                    value="ASC"
                    type="radio"
                    class="peer sr-only"
                    checked={isChecked}
                    required
                  />
                  <div class="size-5 rounded-full bg-contrast-20 peer-checked:bg-white border-[6px] border-transparent peer-checked:border-primary"></div>
                  <strong class="font-normal text-body"> Más antiguo </strong>
                </label>
              </div>
            </fieldset>
            <SelectCategories setReset={setReset} reset={reset} />
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
