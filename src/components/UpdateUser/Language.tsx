import {CurrentProps} from "@/types/types";
import React from "react";
import {useTranslation} from "react-i18next";

export const Language = ({state, setStep, setFormValue}: CurrentProps) => {
    const {t} = useTranslation()

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStep(state.currentStep + 1)
    };

    return (
        <div>
            <form className='rounded bg-white' onSubmit={handleSubmit}>
                <div className='mb-4 flex flex-col'>
                    <label htmlFor="language">{t('language')}</label>
                    <input
                        className='w-full appearance-none rounded-lg border focus:border-indigo-600 px-3 py-2 leading-tight text-gray-700 focus:outline-none'
                        id='language'
                        type='text'
                        aria-label='language'
                        value={state.form.languages[0]?.language}
                        onChange={(e) => setFormValue('languages', [{...state.form.languages[0], language: e.target.value}])}
                    />
                </div>
                <div className='mb-4 flex flex-col'>
                    <label htmlFor="level">{t('level')}</label>
                    <input
                        className='w-full appearance-none rounded-lg border focus:border-indigo-600 px-3 py-2 leading-tight text-gray-700 focus:outline-none'
                        id='level'
                        type='text'
                        aria-label='level'
                        value={state.form.languages[0]?.level}
                        onChange={(e) => setFormValue('languages', [{...state.form.languages[0], level: e.target.value}])}
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
