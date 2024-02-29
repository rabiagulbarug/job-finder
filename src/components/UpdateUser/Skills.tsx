import {CurrentProps} from "@/types/types";
import React from "react";
import {useTranslation} from "react-i18next";
import {StepperForm} from "@/hooks/useStepper";

export const Skills = ({setStep, state, setFormValue}: CurrentProps) => {
    const {t} = useTranslation();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {id, value} = e.target;
        setFormValue(id as unknown as keyof StepperForm, [value]);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStep(state.currentStep + 1);
    };

    return (
        <div>
            <form className='rounded bg-white' onSubmit={handleSubmit}>
                <div className='mb-4 flex flex-col'>
                    <label htmlFor="skills">{t('text-skills')}</label>
                    <input
                        className='w-full appearance-none rounded-lg border focus:border-indigo-600 px-3 py-2 leading-tight text-gray-700 focus:outline-none'
                        id='skills'
                        type='text'
                        aria-label='skills'
                        value={state.form.skills?.join(',')}
                        onChange={handleChange}
                    />
                </div>
                <div className='flex justify-end items-end'>
                    <button className={`h-11 text-white bg-gray-800 rounded-lg mt-5 mb-4 w-1/6 `} type="submit">
                        {t('next')}
                    </button>
                </div>
            </form>
        </div>
    )
}
