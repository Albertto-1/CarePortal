import clsx from "clsx";
import { useContext } from "react";
import StepsContext from "./context";

export default function StepsProgressBar() {
  const { currentStepIndex, totalSteps } = useContext(StepsContext);

  const steps = Array.from({ length: totalSteps });

  return (
    <div className="w-full">
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
