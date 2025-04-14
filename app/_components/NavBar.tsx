import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { HTMLAttributeAnchorTarget, ReactNode } from "react";
import LinkIcon from "./LinkIcon";

const options: {
  label: string;
  href: string;
  icon?: ReactNode;
  target?: HTMLAttributeAnchorTarget;
}[] = [
  {
    label: "Visit site",
    href: "https://caremates.de",
    icon: <LinkIcon />,
    target: "_blank",
  },
];

export default function Navbar() {
  return (
    <header
      className={clsx(
        "sticky top-0",
        "w-full",
        "backdrop-blur",
        "backdrop-grayscale-50",
        "bg-zinc-50/30",
        "grow-0 shrink-0",
        "flex items-center",

        "z-10",
        "py-4 px-5 xl:px-6",
      )}
    >
      <div
        className={clsx(
          "max-w-6xl w-full mx-auto",
          "flex flex-row",
          "items-center justify-between",
        )}
      >
        <Link href="/" className="shrink-0 grow-0">
          <div className="h-12 w-48 relative">
            <Image
              alt="Care Mates logo"
              src="https://caremates.de/logos/CareMatesLogo.png"
              className="object-contain"
              fill
            />
          </div>
        </Link>

        <div
          className={clsx("flex flex-row", "items-center", "gap-6", "shrink-0")}
        >
          {options.map((option) => (
            <Link
              key={option.href}
              href={option.href}
              target={option.target}
              className={clsx(
                "bg-primary text-white",
                "hover:bg-primary/80",
                "py-2 px-4",
                "uppercase",
                "font-semibold",
                "text-sm",
                "rounded-3xl",
                "flex items-center gap-4",
                "whitespace-nowrap",
              )}
            >
              <p className={clsx(option.icon ? "hidden sm:block" : "")}>
                {option.label}
              </p>
              {option.icon && (
                <span className="size-4.5 fill-white">{option.icon}</span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
