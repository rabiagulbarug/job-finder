import {CurrentProps} from "@/types/types";
import React from "react";
import {useTranslation} from "react-i18next";
export const LastExperience = ({setStep, state, setFormValue}: CurrentProps) => {
    const {t} = useTranslation()

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStep(state.currentStep + 1)
    };

    return (
        <div>
            <form className='rounded bg-white' onSubmit={handleSubmit} >
                <div className='mb-4 flex flex-col'>
                    <label htmlFor="company">{t('company')}</label>
                    <input className='w-full appearance-none rounded-lg border focus:border-indigo-600 px-3 py-2 leading-tight text-gray-700 focus:outline-none'
                           id='company'
                           type='text'
                           aria-label='company'
                           value={state.form.experiences[0].company}
                           onChange={(e) => setFormValue('experiences', [{...state.form.experiences[0], company: e.target.value}])}

                    />
                </div>
                <div className='mb-4 flex flex-col'>
                    <label htmlFor="position">{t('position')}</label>
                    <input className='w-full appearance-none rounded-lg border focus:border-indigo-600 px-3 py-2 leading-tight text-gray-700 focus:outline-none'
                           id='position'
                           type='text'
                           aria-label='position'
                           value={state.form.experiences[0].position}
                           onChange={(e) => setFormValue('experiences', [{...state.form.experiences[0], position: e.target.value}])}
                    />
                </div>
                <div className='mb-4 flex flex-col'>
                    <label htmlFor="start-date">{t('start-date')}</label>
                    <input className='w-full appearance-none rounded-lg border focus:border-indigo-600 px-3 py-2 leading-tight text-gray-700 focus:outline-none'
                           id='start-date'
                           type='date'
                           aria-label='start-date'
                           value={state.form.experiences[0].startDate}
                           onChange={(e) => setFormValue('experiences', [{...state.form.experiences[0], startDate: e.target.value}])}

                    />
                </div>
                <div className='mb-6 flex flex-col '>
                    <label htmlFor="end-date">{t('end-date')} </label>
                    <input className='focus:shadow-outline mb-3 w-full appearance-none rounded-lg border focus:border-indigo-600 px-3 py-2 leading-tight text-gray-700 focus:outline-none'
                           id='end-date'
                           type='date'
                           value={state.form.experiences[0].endDate}
                           onChange={(e) => setFormValue('experiences', [{...state.form.experiences[0], endDate: e.target.value}])}
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
