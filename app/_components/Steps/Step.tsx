import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import StepsContext from "./context";

function useStepsLayoutProviderAttrUpdateEffect<T>(
  condition: boolean,
  setterFn: Dispatch<SetStateAction<T>>,
  value: T,
) {
  return useEffect(() => {
    if (condition) setterFn(value);
  }, [condition, setterFn, value]);
}

export default function Step({
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
