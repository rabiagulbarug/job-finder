'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import {useLoginMutation} from "@/handlers/auth/use-login";
import {InformationProps} from "@/types/types";
import LanguageButton from "@/components/LanguageButton/LanguageButton";
import {useTranslation} from "react-i18next";

export const Login = () => {
    const { mutate: login, error } = useLoginMutation();
    const {t} = useTranslation()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<InformationProps>();
    const router = useRouter();

    function onSubmit({ email, password }: InformationProps) {
        login({
            email,
            password,
        });
    }

    return (
        <div className='flex flex-col justify-center'>
            <div className='flex h-max flex-grow-0 flex-col rounded-lg bg-white'>
                <div className='flex justify-center items-center'>
                    <h6 className={'font-semibold text-xl'}>{t('text-login')}</h6>
                </div>
                <form className='rounded bg-white' onSubmit={handleSubmit(onSubmit)}>
                    <div className='mb-4 flex flex-col'>
                        <label htmlFor="">{t('text-mail')}</label>
                        <input
                            className='w-full appearance-none rounded-lg border focus:border-indigo-600 px-3 py-2 leading-tight text-gray-700 focus:outline-none'
                            id='username'
                            type='email'
                            aria-label='Username'
                            required
                            autoComplete='email'
                            autoFocus
                            {...register('email', { required: true })}
                        />
                    </div>
                    <div className='mb-6 flex flex-col '>
                        <label htmlFor="">{t('text-password')} </label>
                        <input
                            className='focus:shadow-outline mb-3 w-full appearance-none rounded-lg border focus:border-indigo-600 px-3 py-2 leading-tight text-gray-700 focus:outline-none'
                            id='password'
                            type='password'
                            required
                            autoComplete='current-password'
                            {...register('password', { required: true })}
                        />
                    </div>
                    <div className='flex justify-center text-center'>
                        {(error as any)?.response?.data?.message && (
                            <span className='error-message w-full flex-wrap text-red-500'>
                                {(error as any)?.response?.data?.message}
                            </span>
                        )}
                    </div>
                    <div className='flex items-center  w-full'>
                        <button className={`h-11 px-12 bg-gray-800 py-2.5 text-white shadow-md cursor-pointer mt-5 mb-4 rounded-2xl w-full`}
                            type="submit">
                            {t('text-login')}
                        </button>
                    </div>
                    <div className='text-sm flex justify-center'>
                        {t('do-not-have-an-account')} <a className='border-b border-gray-800' href='/'><b>{t('text-register')}</b></a>
                    </div>
                </form>
                <div className='flex justify-center items-center'>
                    <LanguageButton/>
                </div>
            </div>
        </div>
    );
};
