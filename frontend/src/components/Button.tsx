interface ButtonProps {
  children: any;
  variant: "primary" | "secondary" | "tertiary";
  type: "button" | "submit" | "reset";
  onClick?: () => void;
  onReset?: () => void;
  disabled?: boolean;
  title: string;
  className?: string;
  ariaExpanded?: boolean;
  ariaHaspopup?: boolean;
  ariaControls?: string;
  id?: string;
  onExpanded?: () => void;
}

export function Button({
  children,
  variant,
  type,
  onClick,
  onReset,
  disabled,
  title,
  className,
  ariaControls,
  ariaHaspopup,
  id,
}: ButtonProps) {
  return (
    <button
      id={id}
      aria-expanded={true}
      aria-haspopup={ariaHaspopup}
      aria-controls={ariaControls}
      type={type}
      onClick={onClick}
      disabled={disabled}
      title={title}
      onReset={onReset}
      class={`button button-tertiary button-${variant} ${className}`}
    >
      {children}
    </button>
  );
}
