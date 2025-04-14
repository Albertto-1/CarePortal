import clsx from "clsx";
import { ReactNode } from "react";

export default function FormInputLayout({
  errorMsg,
  children,
  className,
}: {
  errorMsg: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={clsx("flex flex-col gap-1", className)}>
      {children}

      {!!errorMsg ? <em className="text-red-500">{errorMsg}</em> : null}
    </div>
  );
}
