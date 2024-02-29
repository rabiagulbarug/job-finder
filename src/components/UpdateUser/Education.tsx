import {CurrentProps} from "@/types/types";
import React from "react";
import {useTranslation} from "react-i18next";

export const Education = ({state, setStep, setFormValue}: CurrentProps) => {
    const {t} = useTranslation()

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStep(state.currentStep + 1)
    };

    return (
        <div>
            <form className='rounded bg-white' onSubmit={handleSubmit}>
                <div className='mb-4 flex flex-col'>
                    <label htmlFor="institution">{t('institution')}</label>
                    <input
                        className='w-full appearance-none rounded-lg border focus:border-indigo-600 px-3 py-2 leading-tight text-gray-700 focus:outline-none'
                        id='institution'
                        type='text'
                        aria-label='institution'
                        value={state.form.education[0]?.institution}
                        onChange={(e) => setFormValue('education', [{...state.form.education[0], institution: e.target.value}])}

                    />
                </div>
                <div className='mb-4 flex flex-col'>
                    <label htmlFor="degree">{t('degree')}</label>
                    <input
                        className='w-full appearance-none rounded-lg border focus:border-indigo-600 px-3 py-2 leading-tight text-gray-700 focus:outline-none'
                        id='degree'
                        type='text'
                        aria-label='degree'
                        value={state.form.education[0]?.degree}
                        onChange={(e) => setFormValue('education', [{...state.form.education[0], degree: e.target.value}])}
                    />
                </div>
                <div className='mb-4 flex flex-col'>
                    <label htmlFor="start-date">{t('start-date')}</label>
                    <input
                        className='w-full appearance-none rounded-lg border focus:border-indigo-600 px-3 py-2 leading-tight text-gray-700 focus:outline-none'
                        id='start-date'
                        type='date'
                        aria-label='start-date'
                        value={state.form.education[0]?.startDate}
                        onChange={(e) => setFormValue('education', [{...state.form.education[0], startDate: e.target.value}])}
                    />
                </div>
                <div className='mb-6 flex flex-col '>
                    <label htmlFor="end-date">{t('end-date')} </label>
                    <input
                        className='focus:shadow-outline mb-3 w-full appearance-none rounded-lg border focus:border-indigo-600 px-3 py-2 leading-tight text-gray-700 focus:outline-none'
                        id='end-date'
                        type='date'
                        value={state.form.education[0]?.endDate}
                        onChange={(e) => setFormValue('education', [{...state.form.education[0], endDate: e.target.value}])}
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
