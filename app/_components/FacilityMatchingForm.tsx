"use client";

import { CareType } from "@/generated/prisma";
import { useForm } from "@tanstack/react-form";
import clsx from "clsx";
import {
  ButtonHTMLAttributes,
  Children,
  Dispatch,
  isValidElement,
  ReactNode,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import TypeOfCareInput from "./TypeOfCareInput";
import GenericInput from "./GenericInput";
import { z } from "zod";
import { createContext } from "react";
import Modal from "./Modal";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQuery } from "@tanstack/react-query";

type ButtonStyle = "primary" | "secondary";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  btnStyle?: ButtonStyle;
  label: string;
}

const Button = ({
  disabled,
  onClick,
  btnStyle = "primary",
  label,
}: ButtonProps) => {
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
};

interface Match {
  name: string;
  type_of_care?: CareType;
  zip_code?: number;
}

interface StepsContextInterface {
  currentStepIndex: number;
  totalSteps: number;
  registerStep: () => number;
  setPrevLabel: Dispatch<SetStateAction<string>>;
  setCanGoPrev: Dispatch<SetStateAction<boolean>>;
  setNextLabel: Dispatch<SetStateAction<string>>;
  setCanGoNext: Dispatch<SetStateAction<boolean>>;
}

const StepsContext = createContext<StepsContextInterface>(null);

function useStepsLayoutProviderAttrUpdateEffect<T>(
  condition: boolean,
  setterFn: Dispatch<SetStateAction<T>>,
  value: T,
) {
  return useEffect(() => {
    if (condition) setterFn(value);
  }, [condition, setterFn, value]);
}

function Step({
  children,
  prevLabel,
  canGoPrev,
  nextLabel,
  canGoNext,
}: {
  children: ReactNode;
  prevLabel: string;
  canGoPrev: boolean;
  nextLabel: string;
  canGoNext: boolean;
}) {
  const {
    currentStepIndex,
    registerStep,
    setPrevLabel,
    setCanGoPrev,
    setNextLabel,
    setCanGoNext,
  } = useContext(StepsContext);

  const [stepIndex, setStepIndex] = useState<number | null>(null);

  useEffect(() => {
    if (registerStep) setStepIndex(registerStep());
  }, [registerStep]);

  const isCurrentStep = stepIndex === currentStepIndex;

  useStepsLayoutProviderAttrUpdateEffect<string>(
    isCurrentStep,
    setPrevLabel,
    prevLabel,
  );
  useStepsLayoutProviderAttrUpdateEffect<boolean>(
    isCurrentStep,
    setCanGoPrev,
    canGoPrev,
  );
  useStepsLayoutProviderAttrUpdateEffect<string>(
    isCurrentStep,
    setNextLabel,
    nextLabel,
  );
  useStepsLayoutProviderAttrUpdateEffect<boolean>(
    isCurrentStep,
    setCanGoNext,
    canGoNext,
  );

  return isCurrentStep ? children : null;
}

function StepsProgressBar() {
  const { currentStepIndex, totalSteps } = useContext(StepsContext);

  const steps = Array.from({ length: totalSteps });

  return (
    <div className="w-full px-2">
      {/* Progress line */}
      <div className="relative h-2 bg-zinc-200/80 rounded-full">
        <div
          className="absolute top-0 left-0 h-2 bg-primary rounded-full transition-all duration-300 ease-in-out"
          style={{ width: `${(currentStepIndex / (totalSteps - 1)) * 100}%` }}
        />
        {/* Step circles */}
        <div className="absolute top-1/2 left-0 w-full flex justify-between -translate-y-1/2">
          {steps.map((_, i) => (
            <div
              key={i}
              className={clsx(
                "size-5 rounded-full border-2 transition-all duration-300",
                "flex items-center justify-center",
                i <= currentStepIndex
                  ? "bg-primary border-primary"
                  : "bg-white border-zinc-300",
              )}
            >
              <div className="size-2 bg-white rounded-full" />
            </div>
          ))}
        </div>
      </div>
      {/* Label */}
      <div className="text-sm text-zinc-500 mt-2 text-right">
        Step {currentStepIndex + 1} of {totalSteps}
      </div>
    </div>
  );
}

function StepsLayoutProvider({
  children,
  endCallback,
}: {
  children: ReactNode;
  endCallback: () => void;
}) {
  const [stepIndex, setStepIndex] = useState(0);

  const stepIdRef = useRef(0);
  const [totalSteps, setTotalSteps] = useState(0);

  const registerStep = useCallback(() => {
    const id = stepIdRef.current++;
    setTotalSteps((count) => Math.max(count, id + 1));
    return id;
  }, []);

  const [prevLabel, setPrevLabel] = useState("");
  const [canGoPrev, setCanGoPrev] = useState(false);

  const [nextLabel, setNextLabel] = useState("");
  const [canGoNext, setCanGoNext] = useState(false);

  const providerValue = useMemo(
    () => ({
      currentStepIndex: stepIndex,
      totalSteps,
      registerStep,
      setPrevLabel,
      setCanGoPrev,
      setNextLabel,
      setCanGoNext,
    }),
    [stepIndex, totalSteps, registerStep],
  );

  return (
    <StepsContext.Provider value={providerValue}>
      <div className="flex flex-col justify-between gap-6 h-full">
        <div className="relative">
          <StepsProgressBar />
        </div>
        <div className="grow flex items-center">
          <div
            className={clsx(
              "transition-all",
              "w-xl",
              "rounded-3xl p-4 bg-white",
              "border border-box-border border-zinc-200",
              "shadow-lg",
            )}
          >
            {children}
          </div>
        </div>

        <div
          className={clsx(
            "flex flex-row",
            "items-center",
            prevLabel ? "justify-between" : "justify-end",
            "gap-4",
          )}
        >
          {stepIndex > 0 && prevLabel && (
            <Button
              label={prevLabel}
              btnStyle="secondary"
              disabled={!canGoPrev}
              type="button"
              onClick={() => setStepIndex((prev) => prev - 1)}
            />
          )}

          {nextLabel && (
            <Button
              label={nextLabel}
              disabled={!canGoNext}
              type="button"
              onClick={() => {
                if (stepIndex + 1 === totalSteps) endCallback();
                else setStepIndex((prev) => prev + 1);
              }}
            />
          )}
        </div>
      </div>
    </StepsContext.Provider>
  );
}

export default function FacilityMatchingForm() {
  const trpc = useTRPC();

  const { mutate } = useMutation(
    trpc.checkAvailability.mutationOptions({
      onError: (err) => console.error(err),
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

  const [showNoDayCareModal, setShowNoDayCareModal] = useState(false);
  useEffect(() => {
    if (showNoDayCareModal) form.setFieldValue("type_of_care", undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showNoDayCareModal]);

  return (
    <>
      <div className="flex flex-col items-center justify-center h-full">
        <div className="flex flex-row items-center justify-center gap-16 flex-wrap">
          <div className="flex flex-col gap-6">
            <h1 className="text-4xl text-primary font-bold mb-4 px-4">
              Check facilities availability
            </h1>

            <form
              className="h-96"
              onSubmit={(e) => {
                e.preventDefault();
                form.handleSubmit();
              }}
            >
              <StepsLayoutProvider endCallback={form.handleSubmit}>
                <form.Field
                  name="name"
                  validators={{
                    onChange: z.string({
                      required_error: "Name is required_error",
                    }),
                  }}
                >
                  {(field) => (
                    <Step
                      prevLabel=""
                      canGoPrev={true}
                      nextLabel="Continue"
                      canGoNext={field.state.value !== ""}
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
                      {field.state.meta.errors.length ? (
                        <em>{field.state.meta.errors.join(",")}</em>
                      ) : null}
                    </Step>
                  )}
                </form.Field>

                <form.Field name="type_of_care">
                  {(field) => (
                    <Step
                      prevLabel="Go back"
                      canGoPrev={true}
                      nextLabel="Continue"
                      canGoNext={!!field.state.value}
                    >
                      <TypeOfCareInput
                        selected={field.state.value ?? null}
                        handleChange={(selected) => {
                          if (selected === "Day_Care")
                            setShowNoDayCareModal(true);
                          field.handleChange(selected);
                        }}
                      />
                      {field.state.meta.errors.length ? (
                        <em>{field.state.meta.errors.join(",")}</em>
                      ) : null}
                    </Step>
                  )}
                </form.Field>

                <form.Field name="zip_code">
                  {(field) => (
                    <Step
                      prevLabel="Go back"
                      canGoPrev={true}
                      nextLabel="Check availability"
                      canGoNext={!!field.state.value}
                    >
                      <GenericInput
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) =>
                          field.handleChange(
                            e.target.value === "" ? undefined : +e.target.value,
                          )
                        }
                        label="Patient Zip Code"
                        type="text"
                        placeholder="XXXXXX"
                      />
                      {field.state.meta.errors.length ? (
                        <em>{field.state.meta.errors.join(",")}</em>
                      ) : null}
                    </Step>
                  )}
                </form.Field>
              </StepsLayoutProvider>
            </form>
          </div>

          <img
            src="https://caremates.de/images/CareMates%20Mockup.png"
            className="w-lg"
          />
        </div>
      </div>

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
