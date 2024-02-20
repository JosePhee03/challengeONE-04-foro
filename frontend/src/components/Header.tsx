import { Button } from "./Button"
import { Icon } from "./Icon"

interface HeaderProps {
    variant: 'primary' | 'secondary'
}

export default function Header({ variant }: HeaderProps) {

    return (
        <header class="flex justify-between py-4">
            {variant == "primary"
                ? <Primary />
                : <Secondary />
            }
            <div class="flex items-center gap-2">
                <Button title="Cambiar tema" type="button" variant="tertiary">
                    <span class="sr-only">Tema Oscuro/Claro</span>
                    <Icon name="moon" size="xl" strokeColor="stroke-icon-color" />
                </Button>
                <Button title="Configuración del usuario" type="button" variant="tertiary">
                    <Icon name="user" size="xl" />
                </Button>
            </div>
        </header>
    )
}

function Primary() {
    return (
        <a href="/" className="flex items-center">
            <Icon name="logo" size="xl" fillColor="fill-primary" />
            <span className="text-2xl font-medium text-primary">
                Foro
            </span>
        </a>
    )
}

function Secondary() {
    return (
        <a className="flex gap-2 items-center text-heading">
            <Icon name="arrow-left" size="xl" />
            <svg className="icon icon-xl">
                <use href="/icons.svg#arrow-left"></use>
            </svg>
        </a>
    )
}