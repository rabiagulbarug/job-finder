'use client';
import React, {useMemo, useState} from 'react';
import {useForm} from 'react-hook-form';
import {useRouter} from 'next/navigation';
import LanguageButton from "@/components/LanguageButton/LanguageButton";
import {useRegisterMutation} from "@/handlers/auth/use-register";
import {useTranslation} from "react-i18next";
import {InformationProps} from "@/types/types";


const Register = () => {
    const {mutate: mutateRegister, error, isPending} = useRegisterMutation();
    const [showPassword, setShowPassword] = useState(false);
    const {t} = useTranslation()
    const [isPasswordFieldFocused, setIsPasswordFieldFocused] = useState(false);

    const {
        register,
        handleSubmit,
        formState: {errors, dirtyFields},
        watch,
    } = useForm<InformationProps>();
    const router = useRouter();

    const showPasswordArray = watch('password')?.length > 0 || dirtyFields.password

    function onSubmit({email, password}: InformationProps) {
        mutateRegister({
            email,
            password,
        });
    }

    const passwordValue = watch('password')
    const passwordRules = useMemo(() => {
        return {
            lowercase: /[a-z]/.test(passwordValue),
            uppercase: /[A-Z]/.test(passwordValue),
            number: /\d/.test(passwordValue),
            symbol: /[@$!%*?&_.]/.test(passwordValue),
            length: passwordValue?.length >= 8,
        }
    }, [passwordValue])

    const isPasswordValid = useMemo(() => {
        return Object.values(passwordRules).every(t => t)
    }, [passwordRules])

    const getBoxColor = (i: number) => {
        const correctLength = Object.values(passwordRules).filter(t => t).length;
        return i < correctLength ? 'bg-green-500' : 'bg-gray-100';
    };

    return (
        <div className="flex flex-col justify-between ">
            <div className='flex flex-col justify-center'>
                <div className='flex justify-center items-center'>
                    <h6 className={'font-semibold text-xl'}> {t('text-register')}</h6>
                </div>
                <form className='rounded' onSubmit={handleSubmit(onSubmit)}>
                    <div className='mb-4 flex flex-col'>
                        <label htmlFor="">{t('text-mail')}</label>
                        <input className='border p-2 rounded-lg w-full appearance-none focus:border-indigo-600 px-3 py-2 leading-tight text-gray-700 focus:outline-none'
                               {...register('email', {required: true})} type="email"
                               aria-label="Username" required autoComplete="email"/>
                    </div>
                    <label htmlFor="">{t('text-password')} </label>
                    <div className='mb-6 relative flex flex-col'>
                        <input className='border rounded-lg p-2' {...register('password', {required: true})}
                               type={showPassword ? "text" : "password"}
                               required autoComplete="current-password"
                               onFocus={() => setIsPasswordFieldFocused(true)}
                               onBlur={() => setIsPasswordFieldFocused(false)}

                        />
                        <div className={`absolute flex inset-y-2 right-0 m-auto pr-5 justify-center items-center cursor-pointer ${
                            isPasswordFieldFocused ? '' : showPassword
                        }`}
                             onClick={() => setShowPassword(!showPassword)}
                             onFocus={() => setIsPasswordFieldFocused(true)}
                        >
                            {showPassword ?
                                <img src='/assets/svg/eye-opened.svg' className='w-[16px] h-[13px]'/>
                                :
                                <img src='/assets/svg/eye-closed.svg' className='w-[16px] h-[13px]'/>
                            }
                        </div>
                    </div>

                    <div className="flex justify-between gap-2 py-2 mb-2">
                        {showPasswordArray && Array.from(Array(5).keys()).map((i: number) => (
                            <div className={`w-2 h-2 rounded-md ${getBoxColor(i)}`} key={i}></div>
                        ))}
                    </div>

                    <div className='text-sm'>{t("password-control")}</div>
                    <div className='flex justify-center text-center'>
                        {(error as any)?.response?.data?.message && (
                            <span className='error-message w-full flex-wrap text-red-500'>
                                {(error as any)?.response?.data?.message}
                            </span>
                        )}
                    </div>
                    <div className='items-center w-full'>
                        <button
                            className={`h-11 px-12 py-2.5 shadow-md mt-5 mb-4 rounded-2xl w-full ${
                                isPasswordValid
                                    ? 'bg-gray-800 text-white cursor-pointer'
                                    : ' bg-gray-50 text-gray-300 '
                            } `}
                            disabled={!isPasswordValid}
                            type="submit"
                        >
                            {t('text-register')}
                        </button>
                    </div>
                    <div className='flex flex-col mt-8 '>
                        <div className='text-center text-sm '> {t('do-you-have-an-account')}
                            <a href='/'> <b className='border-b border-gray-900'> {t('text-login')} </b></a>
                        </div>
                        <div className='flex justify-center items-center'>
                            <LanguageButton/>
                        </div>
                    </div>
                </form>
            </div>
        </div>

    );
};

export default Register;
