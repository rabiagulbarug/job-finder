import {CurrentProps} from "@/types/types";
import React from "react";
import {useTranslation} from "react-i18next";

export const Address = ({setStep, state, setFormValue}: CurrentProps) => {
    const {t} = useTranslation()

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStep(state.currentStep + 1)
    };

    return (
        <div>
            <form className='rounded bg-white' onSubmit={handleSubmit} >
                <div className='mb-4 flex flex-col'>
                    <label htmlFor="country">{t('country')}</label>
                    <input className='w-full appearance-none rounded-lg border focus:border-indigo-600 px-3 py-2 leading-tight text-gray-700 focus:outline-none'
                           id='country'
                           type='text'
                           aria-label='country'
                           value={state.form.address?.country}
                           onChange={(e) => setFormValue('address', {...state.form.address, country: e.target.value})}
                    />
                </div>
                <div className='mb-4 flex flex-col'>
                    <label htmlFor="city">{t('city')}</label>
                    <input className='w-full appearance-none rounded-lg border focus:border-indigo-600 px-3 py-2 leading-tight text-gray-700 focus:outline-none'
                           id='city'
                           type='text'
                           value={state.form.address?.city}
                           onChange={(e) => setFormValue('address', {...state.form.address, city: e.target.value})}
                    />
                </div>
                <div className='mb-4 flex flex-col'>
                    <label htmlFor="phone">{t('text-address')}</label>
                    <input className='w-full appearance-none rounded-lg border focus:border-indigo-600 px-3 py-2 leading-tight text-gray-700 focus:outline-none'
                           id='details'
                           type='text'
                           aria-label='details'
                           value={state.form.address?.details}
                           onChange={(e) => setFormValue('address', {...state.form.address, details: e.target.value})}
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
