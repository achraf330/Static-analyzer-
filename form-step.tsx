import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

type FormStepProps = {
  children: React.ReactNode;
  isActive: boolean;
  className?: string;
};

export const FormStep: React.FC<FormStepProps> = ({
  children,
  isActive,
  className,
}) => {
  if (!isActive) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className={cn("space-y-6", className)}
    >
      {children}
    </motion.div>
  );
};

export const FormProgress: React.FC<{ step: number; totalSteps: number }> = ({
  step,
  totalSteps,
}) => {
  const percentage = (step / totalSteps) * 100;

  return (
    <div className="h-1 w-full bg-gray-100 dark:bg-gray-800 mt-4 rounded-full overflow-hidden">
      <motion.div
        className="h-full bg-primary rounded-full"
        initial={{ width: "0%" }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 0.3 }}
      />
    </div>
  );
};

export default FormStep;
