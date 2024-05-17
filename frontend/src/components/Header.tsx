import { Button } from "./Button";
import { Icon } from "./Icon";
import { DropDown } from "./DropDown";
import { Menu } from "./Menu";
import { MenuItem } from "./MenuItem";
import { useAuthenticate } from "../hook/useAuthenticate";
import { UserImage } from "./UserImage";
import { userStore } from "../store/userStore";
import { useEffect, useState } from "preact/hooks";

interface HeaderProps {
  variant: "primary" | "secondary";
  text?: string;
}

const toggleTheme = () => {
  if (localStorage.theme === "dark") {
    document.documentElement.classList.remove("tw-dark");
    localStorage.theme = "light";
  } else {
    document.documentElement.classList.add("tw-dark");
    localStorage.theme = "dark";
  }
};

export default function Header({ variant, text }: HeaderProps) {
  return (
    <header class="flex justify-between py-4 px-4 md:px-0">
      {variant == "primary" ? <Primary /> : <Secondary text={text ?? ""} />}
      <div class="flex items-center gap-2">
        <Button
          onClick={toggleTheme}
          title="Cambiar tema"
          type="button"
          variant="tertiary"
        >
          <span class="sr-only">Tema Oscuro o Claro</span>
          <Icon name="moon" size="xl" strokeColor="stroke-icon-color" />
        </Button>
        <UserDropdown />
      </div>
    </header>
  );
}

const UserDropdown = () => {
  const { logout } = useAuthenticate();

  return (
    <DropDown
      button={<ButtonUser />}
      buttonId="button-user"
      inputId="button-user"
    >
      <Menu buttonId="button-user" popoverId="popover-user">
        <MenuItem type="button" text="Configuración" icon="settings" />
        <MenuItem
          type="button"
          textColor="text-error-text"
          text="Cerrar Sesión"
          icon="log-out"
          onClick={logout}
        />
      </Menu>
    </DropDown>
  );
};
const ButtonUser = () => {
  const [username, setUsername] = useState<string | undefined>(
    userStore.getState().user?.username
  );

  useEffect(() => {
    userStore.subscribe(({ user }) => setUsername(user?.username));
  }, []);

  return (
    <Button
      ariaControls="popover-user"
      ariaExpanded={false}
      ariaHaspopup={true}
      id="button-user"
      title="Configuración del usuario"
      type="button"
      variant="tertiary"
    >
      {username == undefined ? (
        <Icon name="user" size="xl" />
      ) : (
        <UserImage size="md" username={username} />
      )}
    </Button>
  );
};

function Primary() {
  return (
    <a href="/" className="flex items-center">
      <Icon name="logo" size="xl" fillColor="fill-primary" />
      <span className="text-2xl font-medium text-primary">Foro</span>
    </a>
  );
}

interface SecondaryProps {
  text: string;
}

function Secondary({ text }: SecondaryProps) {
  return (
    <button
      onClick={() => {
        history.back();
      }}
      title="volver atrás"
      className="flex gap-2 items-center text-xl text-heading"
    >
      <Icon name="arrow-left" size="lg" />
      {text}
    </button>
  );
}
