import {CurrentProps} from "@/types/types";
import React from "react";
import {useTranslation} from "react-i18next";
import {StepperForm} from "@/hooks/useStepper";

export const PersonalInformation = ({setStep, state, setFormValue}: CurrentProps) => {
    const {t} = useTranslation()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {id, value} = e.target;
        setFormValue(id as unknown as keyof StepperForm, value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStep(state.currentStep + 1)
    };

    return (
        <div>
            <form className='rounded bg-white' onSubmit={handleSubmit}>
                <div className='mb-4 flex flex-col'>
                    <label htmlFor="name">{t('first-name')}</label>
                    <input
                        className='w-full appearance-none rounded-lg border focus:border-indigo-600 px-3 py-2 leading-tight text-gray-700 focus:outline-none'
                        id='name'
                        name='name'
                        type='text'
                        value={state.form.name}
                        aria-label='name' onChange={handleChange}
                    />
                </div>
                <div className='mb-4 flex flex-col'>
                    <label htmlFor="surname">{t('surname')}</label>
                    <input
                        className='w-full appearance-none rounded-lg border focus:border-indigo-600 px-3 py-2 leading-tight text-gray-700 focus:outline-none'
                        id='surname'
                        name='surname'
                        type='text'
                        value={state.form.surname}
                        onChange={handleChange}
                    />
                </div>
                <div className='mb-4 flex flex-col'>
                    <label htmlFor="phone">{t('phone')}</label>
                    <input
                        className='w-full appearance-none rounded-lg border focus:border-indigo-600 px-3 py-2 leading-tight text-gray-700 focus:outline-none'
                        id='phone'
                        name='phone'
                        type='text'
                        aria-label='phone'
                        value={state.form.phone}
                        onChange={handleChange}
                    />
                </div>
                <div className='mb-4 flex flex-col'>
                    <label htmlFor="profileImage">{t('profile-image')}</label>
                    <input
                        className='w-full appearance-none rounded-lg border focus:border-indigo-600 px-3 py-2 leading-tight text-gray-700 focus:outline-none'
                        id='profileImage'
                        type='text'
                        name='profileImage'
                        value={state.form.profileImage}
                        aria-label='profileImage'
                        onChange={handleChange}
                    />
                </div>
                <div className='mb-6 flex flex-col '>
                    <label htmlFor="dateOfBirth">{t('birth-date')} </label>
                    <input
                        className='focus:shadow-outline mb-3 w-full appearance-none rounded-lg border focus:border-indigo-600 px-3 py-2 leading-tight text-gray-700 focus:outline-none'
                        id='dateOfBirth'
                        name='dateOfBirth'
                        value={state.form.dateOfBirth}
                        type='date'
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
