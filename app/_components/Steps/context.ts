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

const EMPTY_CTX = {
  currentStepIndex: 0,
  totalSteps: 0,
  registerStep: () => 0,
  setPrevLabel: () => {},
  setCanGoPrev: () => {},
  setNextLabel: () => {},
  setCanGoNext: () => {},
};

const StepsContext = createContext<StepsContextInterface>(EMPTY_CTX);

export default StepsContext;
