"use client";

import { Facility } from "@/generated/prisma";
import clsx from "clsx";

export default function FacilityMatches({ matches }: { matches: Facility[] }) {
  return (
    <div
      className={clsx(
        "transition-all",
        "w-full lg:min-w-lg p-4",
        "rounded-3xl bg-white",
        "border border-box-border border-zinc-200",
        "shadow-lg",
      )}
    >
      {matches.map((match) => (
        <div
          key={match.id}
          className={clsx(
            "p-2",
            "not-last:pb-6",
            "not-first:pt-6",

            "border",
            "border-transparent",
            "not-last:border-b-primary/50",
          )}
        >
          <div className="flex items-center justify-between">
            <p className="text-lg">
              Facility: <span className="font-bold">{match.name}</span>
            </p>
            <p className="text-zinc-400">#{match.id}</p>
          </div>
          <p className="mt-2">
            Zip code: <span className="font-bold">{match.zip_code} </span>
            <span className="text-zinc-400 text-sm align-baseline">{`(${match.serves_from}-${match.serves_to})`}</span>
          </p>
        </div>
      ))}
    </div>
  );
}
