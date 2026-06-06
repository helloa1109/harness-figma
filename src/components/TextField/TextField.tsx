import { forwardRef, useId } from "react";
import type { InputHTMLAttributes } from "react";
import "./TextField.css";

interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  required?: boolean;
  helper?: string;
  error?: string;
  size?: "sm" | "md" | "lg";
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(function TextField(
  {
    label,
    required,
    helper,
    error,
    size = "md",
    id,
    className,
    disabled,
    ...rest
  },
  ref,
) {
  const reactId = useId();
  const inputId = id ?? `textfield-${reactId}`;
  const describedById = `${inputId}-desc`;
  const showDesc = Boolean(error || helper);

  return (
    <label
      htmlFor={inputId}
      className={`textfield textfield--${size}${disabled ? " textfield--disabled" : ""}${className ? ` ${className}` : ""}`}
    >
      {label ? (
        <span className="textfield__label">
          {label}
          {required ? (
            <span className="textfield__required" aria-hidden="true">
              *
            </span>
          ) : null}
        </span>
      ) : null}

      <input
        id={inputId}
        ref={ref}
        className="textfield__input"
        disabled={disabled}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={showDesc ? describedById : undefined}
        {...rest}
      />

      {showDesc ? (
        <span
          id={describedById}
          className="textfield__helper"
          data-error={error ? "true" : "false"}
          role={error ? "alert" : undefined}
        >
          {error ?? helper}
        </span>
      ) : null}
    </label>
  );
});
