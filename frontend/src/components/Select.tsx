import { DropDown } from "./DropDown";
import { Icon } from "./Icon";
import { Menu } from "./Menu";
import { MenuItem } from "./MenuItem";

export function Select() {
  return (
    <div
      class="custom-select"
      tabIndex={0}
      role="listbox"
      className="relative"
      aria-multiselectable="true"
    >
      <div
        class="w-full hover:cursor-pointer hover:bg-contrast-30 transition-colors duration-100 flex justify-between items-center rounded bg-contrast-20 text-body p-2 font-medium text-md"
        aria-activedescendant="selected-option"
      >
        <DropDown button={ButtonSelect} buttonId="selected-option">
          <Menu buttonId="button-user" popoverId="popover-user">
            <MenuItem text="Configuración" icon="settings" />
            <MenuItem
              textColor="text-error-text"
              text="Cerrar Sesión"
              icon="log-out"
            />
          </Menu>
        </DropDown>
      </div>
    </div>
  );
}

const ButtonSelect = (
  <div id="selected-option" class="text-tertiary-text ">
    Selecciona una opción
    <Icon name="chevron-down" size="lg" />
  </div>
);
