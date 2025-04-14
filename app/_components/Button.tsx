import clsx from "clsx";
import { ButtonHTMLAttributes } from "react";

type ButtonStyle = "primary" | "secondary";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  btnStyle?: ButtonStyle;
  label: string;
}

export default function Button({
  disabled,
  onClick,
  btnStyle = "primary",
  label,
}: ButtonProps) {
  return (
    <button
      role="button"
      disabled={disabled}
      onClick={onClick}
      className={clsx(
        "transition-all",
        "cursor-pointer",
        "shadow",
        "font-semibold text-lg px-5 py-2.5 rounded-3xl",
        "border border-box-border border-zinc-200",
        btnStyle === "primary"
          ? "bg-primary text-white enabled:hover:bg-primary/90 enabled:active:bg-primary/80"
          : "text-primary bg-white enabled:hover:bg-zinc-100/60 enabled:active:bg-zinc-100/20",
        "disabled:grayscale-50",
        "disabled:opacity-60",
        "disabled:cursor-not-allowed",
      )}
    >
      {label}
    </button>
  );
}
