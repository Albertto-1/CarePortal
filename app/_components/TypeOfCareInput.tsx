import { Field, Label, Radio, RadioGroup } from "@headlessui/react";
import { CareType } from "@/generated/prisma";
import clsx from "clsx";
import CareTypeIcon from "./CareTypeIcon";

export default function TypeOfCareInput({
  selected,
  handleChange,
}: {
  selected: CareType | null;
  handleChange?: (selected: CareType) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-base">Type of care</label>

      <RadioGroup
        value={selected}
        onChange={handleChange}
        aria-label="Type of care"
        className="flex gap-4 items-center max-w-lg w-full mx-auto"
      >
        {Object.keys(CareType).map((type) => (
          <Field
            key={type}
            className="flex-1"
            // disabled={type === "Day_Care"}
          >
            <Radio
              value={type}
              className={clsx(
                "group p-4 rounded-3xl",
                "transition-all ease-out",
                "flex flex-col gap-4 items-center justify-center",
                "border border-box-border border-zinc-200",
                "bg-white",
                "cursor-pointer",
                "data-[disabled]:bg-zinc-100",
                "data-[disabled]:cursor-not-allowed",
                "data-[disabled]:[&_*]:pointer-events-none",

                "not-data-[disabled]:hover:shadow",
                "not-data-[disabled]:hover:-translate-y-0.5",
                "not-data-[disabled]:hover:bg-primary/10",

                "data-[checked]:bg-primary/15",
                "data-[checked]:hover:bg-primary/10",

                "not-data-[disabled]:active:-translate-y-0",
                "not-data-[disabled]:active:bg-primary/5",
              )}
            >
              <span
                className={clsx(
                  "transition-all",
                  "ease-out",
                  "size-12",
                  "fill-primary/30",
                  "stroke-primary/30",
                  "grayscale-25",
                  "group-data-[disabled]:grayscale-100",

                  "not-group-data-[disabled]:group-hover:fill-primary/50",
                  "not-group-data-[disabled]:group-hover:stroke-primary/50",
                  "not-group-data-[disabled]:group-hover:grayscale-[10%]",
                  "not-group-data-[disabled]:group-hover:-translate-y-0.5",
                  "not-group-data-[disabled]:group-hover:scale-115",

                  "not-group-data-[disabled]:group-active:fill-primary/60",
                  "not-group-data-[disabled]:group-active:stroke-primary/60",
                  "not-group-data-[disabled]:group-active:grayscale-[5%]",

                  "group-data-[checked]:visible",
                  "group-data-[checked]:fill-primary/80",
                  "group-data-[checked]:stroke-primary/80",
                  "group-data-[checked]:grayscale-0",
                  "group-data-[checked]:group-hover:grayscale-0",
                )}
              >
                <CareTypeIcon typeOfCare={type as CareType} />
              </span>
              <Label
                className={clsx(
                  "transition-all",
                  "text-zinc-500",

                  "not-data-[disabled]:group-hover:text-primary",
                  "not-data-[disabled]:group-hover:grayscale-75",
                  "not-data-[disabled]:group-hover:scale-105",
                  "not-data-[disabled]:group-hover:-translate-y-0.5",

                  "group-data-[checked]:font-semibold",
                  "group-data-[checked]:text-primary",
                  "group-data-[checked]:grayscale-75",
                )}
              >
                {type.replaceAll("_", " ")}
              </Label>
            </Radio>
          </Field>
        ))}
      </RadioGroup>
    </div>
  );
}
