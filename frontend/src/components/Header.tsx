
interface HeaderProps {
    variant: 'primary' | 'secondary'
}

export default function Header({ variant }: HeaderProps) {
  
    return (
    <header class="header">
        {variant == "primary"
            ? <a href="/" className="left text-primary button button-tertiraty">
                <svg className="icon icon-logo">
                    <use href="/icons.svg#logo"></use>
                </svg>
                <span className="heading-2">
                    Foro
                </span>
                </a>
            : <a className="left heading-text">
            <svg className="icon icon-xl">
                <use href="/icons.svg#arrow-left"></use>
            </svg>
            </a> 

        }
        <div className="right">
            <button className="button button-tertiary">
                <svg className="icon icon-xl">
                    <use href="/icons.svg#moon"></use>
                </svg>
            </button>
            <button className="button button-tertiary">
                <svg className="icon icon-xl">
                    <use href="/icons.svg#user"></use>
                </svg>
            </button>
        </div>
    </header>
  )
}
