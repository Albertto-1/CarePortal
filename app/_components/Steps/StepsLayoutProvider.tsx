import { ReactNode, useCallback, useMemo, useRef, useState } from "react";
import StepsContext from "./context";
import StepsProgressBar from "./StepsProgressBar";
import clsx from "clsx";
import Button from "../Button";

export default function StepsLayoutProvider({
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
        <StepsProgressBar />

        <div className="grow flex items-center">
          <div
            className={clsx(
              "transition-all",
              "min-w-lg p-4",
              "rounded-3xl bg-white",
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
