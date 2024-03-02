interface ButtonProps {
  children: any
  variant: keyof typeof buttonVariant
  type: 'button' | 'submit' | 'reset'
  onClick?: () => void
  disabled?: boolean
  title: string
  className?: string
}


export function Button({ children, variant, type, onClick, disabled, title, className }: ButtonProps) {


  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      title={title}
      class={`${after} ${before} hover:before:opacity-5 active:after:scale-105 active:after:opacity-5 relative flex justify-center items-center gap-1 p-2 rounded text-md font-medium ${buttonVariant[variant]} ${className}`}
    >
      {children}
    </button>
  )

}

const buttonVariant = {
  primary: "bg-primary text-primary-contrast disabled:opacity-[0.2]",
  secondary: "bg-contrast-5 text-primary-text disabled:bg-contrast-5 disabled:text-disabled-text",
  tertiary: "text-icon-color disabled:text-disabled-text",
}

const after = "after:transition-transform after:duration-500 after:transition-opacity after:duration-200 after:ease-in after:blur-sm after:b after:content-[''] after:rounded after:absolute after:top-0 after:left-0 after:bg-current after:w-full after:h-full after:z-10 after:opacity-0"
const before = "before:content-[''] before:rounded before:absolute before:top-0 before:left-0 before:bg-primary before:w-full before:h-full before:z-10 before:opacity-0"
