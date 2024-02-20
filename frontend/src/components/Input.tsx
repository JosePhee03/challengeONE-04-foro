import { ChangeEvent } from "preact/compat"

interface InputProps {
    children?: any
    id: string
    name: string
    label?: string
    helperText?: string
    readOnly?: boolean
    onChange?: (event: ChangeEvent) => void
    pattern?: string
    value?: string
    type: "text" | "number" | "password" | "search"
    placeholder: string
    required?: boolean
    className?: string
}

export function Input({ required, className, children, placeholder, helperText, id, label, name, pattern, type, value = "", onChange, readOnly }: InputProps) {
    return (
        <div class={`flex flex-col gap-1 ${className}`}>
            {label && <label class="font-medium text-md text-secondary-text" htmlFor={id}>{label}</label>}
            <div class="flex items-center relative text-sm">
                <input placeholder={placeholder} readOnly={readOnly} id={id} onChange={onChange} name={name} pattern={pattern} required={required} value={value} type={type} class="peer w-full read-only:bg-transparent read-only:border-contrast-30 invalid:bg-error-10 invalid:text-error-text rounded bg-contrast-20 text-body p-2 border-dashed border-[3px] border-transparent font-medium text-md" />
                <p class="peer-invalid:text-error-text text-tertiary-text absolute -bottom-6">{helperText}</p>
                <div class="absolute right-0">
                    {children}
                </div>
            </div>
        </div>
    )
}   