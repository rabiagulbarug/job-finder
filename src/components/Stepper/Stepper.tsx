import React from 'react';
import {useTranslation} from "react-i18next";
import {SetStepMethod} from "@/hooks/useStepper";

type Props = {
    currentStep: number;
    setCurrentStep: SetStepMethod;
};

const Stepper = ({currentStep, setCurrentStep}: Props) => {
    const {t} = useTranslation()
    const personalInformation = t('text-personal-information')
    const address = t('text-address')
    const skills = t('text-skills')
    const lastExperience = t('text-last-experience')
    const education = t('text-education')
    const language = t('text-language')
    const steps = [
        {number: 1, text: personalInformation},
        {number: 2, text: address},
        {number: 3, text: skills},
        {number: 4, text: lastExperience},
        {number: 5, text: education},
        {number: 6, text: language},
    ];

    return (
        <div className='w-full mx-auto border rounded-lg h-full grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6'>
            {steps?.map((step, i) => (
                <div key={i}
                     onClick={() => {
                         setCurrentStep(i + 1);
                     }}
                     className={`step-item flex flex-row  p-2.5 ${
                         currentStep === i + 1 && 'active'
                     } ${i + 1 < currentStep && 'complete'}`}>
                    <p className={`p-1 flex flex-row ${
                        i + 1 <= currentStep
                            ? 'text-white bg-gray-800 px-3 rounded-lg'
                            : 'text-black px-3 border rounded-lg'
                    }`}>
                      <span> {step.text}</span>
                    </p>
                </div>
            ))}
        </div>
    );
};

export default Stepper;
