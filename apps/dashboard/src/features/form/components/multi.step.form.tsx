'use client'

import React from "react";
import { ReactNode } from "react";
import { UseFormReturn } from "react-hook-form";
import { Schema, ZodObject, ZodType } from "zod";

export interface MultiStepFormRef {
    handleNext: () => void;
    handleBack: () => void;
}

export interface MultiStepFormProps {
    schema: ZodObject<any>
    methods: UseFormReturn<any>
    steps: { name: string, children: ReactNode }[]
    controls?: ReactNode
    onSubmit: (data: any) => void
}

export const MultiStepForm = React.forwardRef<MultiStepFormRef, MultiStepFormProps>(
    ({ schema, steps, methods, controls, onSubmit }, ref) => {
        const schemaKeys: string[] = schema.keyof()._def.values;
        const numberOfFields = schemaKeys.length;

        if (numberOfFields !== steps.length) {
            throw new Error("Amount of steps and fields in schema do not match");
        }

        const [currentStep, setCurrentStep] = React.useState(0);
        const isLastStep = currentStep === steps.length - 1;
        const handleBack = () => {
            if (currentStep > 0) {
                const newStep = currentStep - 1;
                setCurrentStep(newStep);
            }
        };

        const handleNext = () => {
            const parse = schema.safeParse(methods.getValues())
            const error = parse.error?.issues.find((i: any) => i.path[0] === steps[currentStep].name)
            if (!isLastStep && !error) {
                const newStep = currentStep + 1;
                setCurrentStep(newStep);
            } else {
                methods.handleSubmit(onSubmit)();
            }
        }

        React.useImperativeHandle(ref, () => {
            return {
                handleNext,
                handleBack
            }
        })
        return (
            <>
                <div className="w-full">
                    {steps.map(
                        (step, index) =>
                            index === currentStep && <div key={index}>{step.children}</div>
                    )}
                    <div className="flex flex-row mt-4 w-full justify-between">
                        {Array.isArray(controls) &&
                            controls.map((control, index) => <div key={index}>{control}</div>)}
                    </div>
                </div>
            </>
        )
    })
MultiStepForm.displayName = "MultiStepForm"

export default MultiStepForm