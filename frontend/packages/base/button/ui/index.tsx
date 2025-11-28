import React from "react";
import "./button.css";

type ButtonVariant = "primary" | "secondary";

type ButtonProps = {
  children: React.ReactNode;
  variant?: ButtonVariant;
  fullWidth?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
};

export function Button({
  children,
  variant = "primary",
  fullWidth = true,
  onClick,
  type = "button",
  disabled = false,
}: ButtonProps) {
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
}
