import { ChangeEvent } from "preact/compat";

interface InputProps {
  children?: any;
  id: string;
  name: string;
  label?: string;
  helperText?: string;
  readOnly?: boolean;
  onChange?: (event: ChangeEvent) => void;
  pattern?: string;
  value?: string;
  placeholder: string;
  required?: boolean;
  className?: string;
  isError?: boolean;
}

export function TextArea({
  required,
  className,
  children,
  placeholder,
  helperText,
  id,
  label,
  name,
  pattern,
  value = "",
  onChange,
  readOnly,
  isError,
}: InputProps) {
  return (
    <div class={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label class="font-medium text-md text-secondary-text" htmlFor={id}>
          {label}
        </label>
      )}
      <div class="flex flex-col justify-center relative text-sm">
        <textarea
          placeholder={placeholder}
          readOnly={readOnly}
          id={id}
          onChange={onChange}
          name={name}
          pattern={pattern}
          required={required}
          value={value}
          class={`resize-y h-20 min-h-10 max-h-40 peer w-full read-only:bg-transparent read-only:border-contrast-30 ${
            isError ? "bg-error-10 text-error-text" : ""
          } rounded bg-contrast-20 text-body p-2 border-dashed border-[3px] border-transparent font-medium text-md`}
        />
        {isError && (
          <p class={isError ? "text-error-text" : "text-tertiary-text"}>
            {helperText}
          </p>
        )}
        <div class="absolute right-0">{children}</div>
      </div>
    </div>
  );
}
