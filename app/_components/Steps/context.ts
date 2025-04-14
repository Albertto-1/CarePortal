import { createContext, Dispatch, SetStateAction } from "react";

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

export default StepsContext;
