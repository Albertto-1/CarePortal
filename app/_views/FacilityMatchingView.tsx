"use client";

import Image from "next/image";
import FacilityMatchingForm from "../_components/FacilityMatchingForm";
import clsx from "clsx";
import { useState } from "react";
import FacilityMatches from "../_components/FacilityMatches";
import { Facility } from "@/generated/prisma";
import Modal from "../_components/Modal";
import Button from "../_components/Button";

export default function FacilityMatchingView() {
  const [doFoundMatches, setDoFoundMatches] = useState(false);

  const [patient, setPatient] = useState("");
  const [matches, setMatches] = useState<Facility[]>([]);

  const [error, setError] = useState("");

  const reset = () => location.reload();

  return (
    <>
      <div
        className={clsx(
          "flex items-center justify-center",
          "gap-16 flex-wrap",
          "h-full",
        )}
      >
        <div className="flex flex-col gap-6">
          <h1 className="text-4xl text-primary font-bold mb-6 px-2.5">
            {!doFoundMatches && "Check facilities availability"}
            {doFoundMatches && `Available facilities for: ${patient}`}
          </h1>

          {!doFoundMatches && (
            <FacilityMatchingForm
              errorCallback={(err) => {
                setError(err);
              }}
              successCallback={(matches, patient) => {
                setMatches(matches);
                setPatient(patient);
                setDoFoundMatches(true);
              }}
            />
          )}

          {doFoundMatches && (
            <div className="flex flex-col gap-6 items-center">
              <FacilityMatches matches={matches} />
              <Button label="Go back" onClick={reset} />
            </div>
          )}
        </div>

        <div className="w-lg h-full relative">
          <Image
            alt="Care Mates platform screenshot"
            src="https://caremates.de/images/CareMates%20Mockup.png"
            className="object-contain w-lg"
            fill
          />
        </div>
      </div>

      <Modal open={!!error} onClose={reset}>
        <h2 className="text-2xl font-bold text-primary">¡We are sorry!</h2>
        <p className="mt-6 text-lg">
          We couldn&apos;t find an available facility close to the provided zip
          code.
        </p>
        <p className="mt-2 text-lg font-semibold text-zinc-700">
          Please try a different search.
        </p>
        <div className="flex justify-end mt-4">
          <Button label="Ok" onClick={reset} />
        </div>
      </Modal>
    </>
  );
}
