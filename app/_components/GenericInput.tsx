import clsx from "clsx";
import { InputHTMLAttributes } from "react";

interface GenericInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export default function GenericInput({ label, ...other }: GenericInputProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-base">{label}</label>
      <input
        {...other}
        type={other.type}
        className={clsx(
          "block py-1.5 px-2.5",
          "rounded-xl",
          "text-lg",
          "border border-box-border border-zinc-200",
          "focus:outline-1",
          "focus:outline-primary",
          "placeholder:text-gray-400",
        )}
      />
    </div>
  );
}
