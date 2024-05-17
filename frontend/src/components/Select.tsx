import { useEffect, useRef } from "preact/hooks";
import { Item } from "../util/List";
import { DropDown } from "./DropDown";
import { Icon } from "./Icon";

const id = "select-input";
const label = "Categorias";
interface SelectProps {
  handleToggleSelected: (key: number) => void;
  items: Item[];
  isLoading: boolean;
}

export function Select({
  handleToggleSelected,
  items,
  isLoading,
}: SelectProps) {
  return (
    <div>
      <label
        class="w-full font-medium text-md text-secondary-text"
        htmlFor={id}
      >
        {label}
      </label>

      <div
        class="focus-within:rounded focus:outline-none focus-within:ring-2 focus-within:ring-primary-text max-w-80 hover:cursor-pointer hover:bg-contrast-30 transition-colors duration-100 flex justify-between items-center rounded bg-contrast-20 text-body font-medium text-md"
        aria-activedescendant="selected-option"
      >
        <DropDown
          fixed
          right
          button={
            <ButtonSelect
              items={items}
              handleToggleSelected={handleToggleSelected}
            />
          }
          buttonId={"multi-select"}
          inputId={id}
        >
          <ListBox
            isLoading={isLoading}
            items={items}
            handleToggleSelected={handleToggleSelected}
          />
        </DropDown>
      </div>
    </div>
  );
}

interface ButtonSelectProps {
  items: Item[];
  handleToggleSelected: (key: number) => void;
}

const ButtonSelect = ({ items, handleToggleSelected }: ButtonSelectProps) => {
  const itemsSelected = items.filter((item) => item.isSelected);

  const handleClick = (event: MouseEvent, key: number) => {
    event.stopPropagation();
    handleToggleSelected(key);
  };

  return (
    <div class="flex gap-2 items-center p-2" id="multi-select">
      <div class="flex gap-2 flex-1">
        <div class="flex flex-wrap gap-2">
          {itemsSelected.map(({ key, name, isSelected }) =>
            isSelected ? (
              <span
                key={key}
                class="flex font-medium rounded text-sm gap-2 items-center bg-contrast-20 px-2 py-1 text-body"
              >
                {name}
                <button
                  onClick={(e) => handleClick(e, key)}
                  type="button"
                  class="rounded"
                >
                  <Icon name="exit" size="md" />
                </button>
              </span>
            ) : (
              ""
            )
          )}
        </div>
        {itemsSelected.length === 0 && (
          <span class="text-contrast-50">Seleccionar alguna categoria</span>
        )}
        <input
          class="bg-red-100 placeholder:text-transparent sr-only"
          type="text"
          id={id}
          name="categories"
          autocomplete="off"
          autocapitalize="off"
          role="combobox"
          aria-autocomplete="list"
          aria-expanded="false"
          spellcheck={false}
          autocorrect="off"
          placeholder="Seleccionar alguna categoria"
          aria-labelledby="multi-select"
          value={itemsSelected.map((item) => item.key).join(",")}
        />
      </div>
      <Icon size="lg" name="chevron-down" />
    </div>
  );
};

interface ListBoxProps {
  items: Item[];
  handleToggleSelected: (key: number) => void;
  isLoading: boolean;
}

const ListBox = ({ items, handleToggleSelected, isLoading }: ListBoxProps) => {
  const refListbox = useRef<HTMLUListElement>(null);

  useEffect(() => {
    let selectedIndex = -1;
    const handleKeyPress = (event: KeyboardEvent) => {
      if (refListbox.current != null) {
        const key = event.key;
        let options = refListbox.current.children;
        if (key === "ArrowUp") {
          event.preventDefault();

          if (selectedIndex > 0) {
            selectedIndex--;
            // @ts-ignore
            options[selectedIndex].focus();
          }
        } else if (key === "ArrowDown") {
          event.preventDefault();

          // @ts-ignore
          if (selectedIndex < options.length - 1) {
            selectedIndex++;
            // @ts-ignore
            options[selectedIndex].focus();
          }
        } else if (
          key === "Enter" &&
          document.getElementById(id)!.ariaExpanded === "true"
        ) {
          event.preventDefault();
          handleToggleSelected(items[selectedIndex].key);
        }
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <div class="w-full h-60 sm:min-w-48 px-4 py-6 sm:p-1 bg-base rounded shadow-[0_0_8px_4px_rgb(0,0,0,0.2)]">
      <div class=" h-full w-full relative">
        <div class=" h-full w-full overflow-auto relative">
          {isLoading && (
            <div class="flex justify-center min-h-10 h-full items-center">
              <div
                class="inline-block mx-auto size-8 animate-spin rounded-full border-2 border-solid border-body border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status"
              >
                <span class="sr-only">Cargando</span>
              </div>
            </div>
          )}
          <ul
            ref={refListbox}
            role="listbox"
            aria-multiselectable="true"
            class=""
          >
            {items.map((value, index, array) =>
              ItemList(value, index, array, handleToggleSelected)
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

const ItemList = (
  value: Item,
  index: number,
  array: Item[],
  handleToggleSelected: (key: number) => void
) => {
  const { isSelected, key, name } = value;

  return (
    <li
      onClick={() => handleToggleSelected(key)}
      key={key}
      tabindex={-1}
      role="option"
      aria-selected={isSelected}
      aria-posinset={index + 1}
      aria-setsize={array.length}
      class="flex items-center text-md select-none gap-1 cursor-pointer px-2 py-2 rounded focus:outline-primary focus:bg-primary-10 hover:bg-primary-10 text-body"
    >
      <Icon
        name="check"
        size="md"
        strokeColor={isSelected ? "stroke-primary-text" : "stoke-trasparent"}
      />
      {name}
    </li>
  );
};
