"use client";

import { CareType, Facility } from "@/generated/prisma";
import { useForm } from "@tanstack/react-form";
import { useEffect, useState } from "react";
import TypeOfCareInput from "./TypeOfCareInput";
import GenericInput from "./GenericInput";
import { z } from "zod";
import Modal from "./Modal";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import StepsLayoutProvider from "./Steps/StepsLayoutProvider";
import Step from "./Steps/Step";
import Button from "./Button";
import FormInputLayout from "./FormInputLayout";
import LoadingIcon from "./LoadingIcon";
import clsx from "clsx";

interface Match {
  name: string;
  type_of_care?: CareType;
  zip_code?: number;
}

export default function FacilityMatchingForm({
  successCallback,
  errorCallback,
}: {
  successCallback: (matches: Facility[], patient: string) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errorCallback: (error: any) => void;
}) {
  const trpc = useTRPC();
  const { mutate, isPending } = useMutation(
    trpc.checkAvailability.mutationOptions({
      onError: (err) => {
        console.error(err);
        errorCallback(err);
      },
      onSuccess: (matches) => {
        successCallback(matches, form.state.values.name);
      },
    }),
  );

  const form = useForm({
    defaultValues: {
      name: "",
      type_of_care: undefined,
      zip_code: undefined,
    } as Match,
    onSubmit({ value }) {
      mutate({
        name: value.name,
        typeOfCare: value.type_of_care as CareType,
        zipCode: value.zip_code as number,
      });
    },
  });

  // INFO: Temp logic
  const [showNoDayCareModal, setShowNoDayCareModal] = useState(false);
  useEffect(() => {
    if (showNoDayCareModal) form.setFieldValue("type_of_care", undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showNoDayCareModal]);

  return (
    <>
      <form
        className="h-[330px] relative"
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <StepsLayoutProvider endCallback={form.handleSubmit}>
          <form.Field
            name="name"
            validators={{
              onBlur: z
                .string({
                  required_error: "Name is required_error",
                })
                .nonempty("Name is required_error"),
            }}
          >
            {(field) => (
              <Step
                prevLabel=""
                canGoPrev={true}
                nextLabel="Continue"
                canGoNext={
                  !!field.state.value && field.state.meta.errors.length === 0
                }
              >
                <FormInputLayout
                  errorMsg={field.state.meta.errors
                    .map((err) => err?.message)
                    .join(", ")}
                >
                  <GenericInput
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    type="text"
                    placeholder="Patient name"
                    label="Patient Name"
                  />
                </FormInputLayout>
              </Step>
            )}
          </form.Field>

          <form.Field
            name="type_of_care"
            validators={{
              onChange: z.nativeEnum(CareType),
            }}
          >
            {(field) => (
              <Step
                prevLabel="Go back"
                canGoPrev={true}
                nextLabel="Continue"
                canGoNext={
                  !!field.state.value && field.state.meta.errors.length === 0
                }
              >
                <FormInputLayout
                  errorMsg={field.state.meta.errors
                    .map((err) => err?.message)
                    .join(", ")}
                >
                  <TypeOfCareInput
                    selected={field.state.value ?? null}
                    handleChange={(selected) => {
                      if (selected === "Day_Care") setShowNoDayCareModal(true);
                      field.handleChange(selected);
                    }}
                  />
                </FormInputLayout>
              </Step>
            )}
          </form.Field>

          <form.Field
            name="zip_code"
            validators={{
              onBlur: z
                .number({ required_error: "The Zip Code is required" })
                .min(10000, "Zip Code must be at least 5 digits")
                .max(99999, "Zip Code must not be greater than 99999"),
            }}
          >
            {(field) => (
              <Step
                prevLabel="Go back"
                canGoPrev={true}
                nextLabel="Check availability"
                canGoNext={
                  !!field.state.value &&
                  field.state.meta.errors.length === 0 &&
                  !isPending
                }
              >
                <FormInputLayout
                  errorMsg={field.state.meta.errors
                    .map((err) => err?.message)
                    .join(", ")}
                >
                  <GenericInput
                    name={field.name}
                    min={10000}
                    max={99999}
                    minLength={5}
                    maxLength={5}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => {
                      const value =
                        e.target.value === ""
                          ? undefined
                          : +e.target.value.slice(0, 5);
                      field.handleChange(value);
                    }}
                    label="Patient Zip Code"
                    type="number"
                    placeholder="XXXXXX"
                  />
                </FormInputLayout>
              </Step>
            )}
          </form.Field>
        </StepsLayoutProvider>

        {isPending && (
          <div
            className={clsx(
              "absolute",
              "-inset-7",
              "shadow-inner",
              "bg-zinc-300/30",
              "rounded-3xl",
              "backdrop-blur-xs",
              "flex flex-col justify-center items-center gap-4",
            )}
          >
            <span className="size-16 block animate-spin fill-primary">
              <LoadingIcon />
            </span>
            <p className="animate-pulse text-lg font-bold -mr-2.5 text-zinc-600">
              Loading facility matches...
            </p>
          </div>
        )}
      </form>

      <Modal
        open={showNoDayCareModal}
        onClose={() => setShowNoDayCareModal(false)}
      >
        <h2 className="text-2xl font-bold text-primary">¡We are sorry!</h2>
        <p className="mt-6 text-lg">We do not support Day Care for now.</p>
        <p className="mt-2 text-lg font-semibold text-zinc-700">
          Please come back soon.
        </p>
        <div className="flex justify-end mt-4">
          <Button label="Ok" onClick={() => setShowNoDayCareModal(false)} />
        </div>
      </Modal>
    </>
  );
}
