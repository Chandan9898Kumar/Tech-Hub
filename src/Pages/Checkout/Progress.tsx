import { FC, memo } from "react";
import { CheckoutStep } from "./Interface";

interface ProgressProps {
  CheckoutSteps: CheckoutStep[];
  currentStep: number;
}

const Progress: FC<ProgressProps> = ({ CheckoutSteps, currentStep }) => {
  return (
    <div className="flex justify-between mb-8">
      {CheckoutSteps.map((step, index) => (
        <div
          key={step.title}
          className={`flex items-center ${
            index <= currentStep ? "text-purple-600" : "text-gray-400"
          }`}
        >
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
              index <= currentStep ? "bg-purple-600" : "bg-gray-200"
            }`}
          >
            <step.icon
              className={`h-5 w-5 ${
                index <= currentStep ? "text-white" : "text-gray-400"
              }`}
            />
          </div>
          <span className="ml-2 font-medium">{step.title}</span>
          {index < CheckoutSteps.length - 1 && (
            <div
              className={`h-[2px] w-16 mx-4 transition-all duration-300 ${
                index < currentStep ? "bg-purple-600" : "bg-gray-200"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default memo(Progress);
