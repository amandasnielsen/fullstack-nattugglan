import "./index.css";
import type { ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "filter" | "filterActive";

interface ButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  fullWidth?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
}

export const Button = ({
  children,
  variant = "primary",
  fullWidth = true,
  onClick,
  type = "button",
  disabled = false,
}: ButtonProps) => {
  const classes = [
    "base-button",
    `base-button--${variant}`,
    fullWidth ? "base-button--full-width" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
