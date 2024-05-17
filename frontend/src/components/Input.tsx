import { ChangeEvent } from "preact/compat";

interface InputProps {
  children?: any;
  id: string;
  name: string;
  label?: string;
  helperText?: string;
  readOnly?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  pattern?: string;
  value?: string;
  type: "text" | "number" | "password" | "search";
  placeholder: string;
  required?: boolean;
  className?: string;
  minLength?: number;
  maxLength?: number | undefined;
}

export function Input({
  required,
  className,
  children,
  placeholder,
  helperText,
  id,
  label,
  name,
  pattern,
  type,
  value = "",
  onChange,
  readOnly,
  maxLength,
  minLength,
}: InputProps) {
  return (
    <div class={`flex flex-col ${className}`}>
      {label && (
        <label class="font-medium text-md text-secondary-text" htmlFor={id}>
          {label}
        </label>
      )}
      <div class="flex flex-col gap-1 items-center relative text-sm">
        <input
          placeholder={placeholder}
          readOnly={readOnly}
          id={id}
          onChange={onChange}
          name={name}
          pattern={pattern}
          required={required}
          value={value}
          type={type}
          minLength={minLength}
          maxLength={maxLength}
          class="peer placeholder:text-tertiary-text hover:bg-contrast-30 transition-colors duration-100  w-full read-only:bg-transparent read-only:border-contrast-30 invalid:bg-error-10 invalid:text-error-text rounded bg-contrast-20 text-body p-2 border-dashed border-[3px] border-transparent font-medium text-md"
        />
        <p
          class={
            helperText == undefined
              ? "hidden"
              : "peer-invalid:text-error-text text-tertiary-text  "
          }
        >
          {helperText}
        </p>
        <div class="absolute right-0">{children}</div>
      </div>
    </div>
  );
}
