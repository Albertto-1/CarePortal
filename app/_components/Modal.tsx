"use client";

import { ReactNode } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import clsx from "clsx";

export default function Modal({
  children,
  open,
  onClose,
}: {
  children: ReactNode;
  open: boolean;
  onClose: () => void;
}) {
  return (
    <Dialog open={open} onClose={onClose} className="relative z-40">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className={clsx(
              "relative",
              "transform",
              "overflow-hidden",
              "rounded-3xl",
              "bg-white",
              "px-4",
              "pb-4",
              "pt-5",
              "text-left",
              "shadow-xl",
              "transition-all",
              "data-[closed]:translate-y-4",
              "data-[closed]:opacity-0",
              "data-[enter]:duration-300",
              "data-[leave]:duration-200",
              "data-[enter]:ease-out",
              "data-[leave]:ease-in",
              "sm:my-8",
              "sm:w-full",
              "sm:max-w-xl",
              "sm:p-6",
              "data-[closed]:sm:translate-y-0",
              "data-[closed]:sm:scale-95",
            )}
          >
            {children}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
