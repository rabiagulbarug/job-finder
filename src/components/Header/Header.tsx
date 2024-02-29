import {getToken} from "@/utils/get-token";
import {Login} from "@/components/Auth/Login";
import Register from "@/components/Auth/Register";
import {useState} from "react";
import {useTranslation} from "react-i18next";
import Cookies from "js-cookie";
import {usePathname, useRouter} from "next/navigation";
import Link from "next/link";
import {useProfileQuery} from "@/handlers/auth/use-profile";
import LanguageButton from "@/components/LanguageButton/LanguageButton";

export const Header = () => {
    const router = useRouter();
    const pathname = usePathname()
    const accessToken = getToken();
    const [isPopupLogin, setPopupLoginOpen] = useState(false);
    const [isPopupRegister, setPopupRegisterOpen] = useState(false);
    const {t} = useTranslation();
    const {data} = useProfileQuery();

    const handleLoginClick = () => {
        setPopupLoginOpen(!isPopupLogin);
    };

    const handleRegisterClick = () => {
        setPopupRegisterOpen(!isPopupRegister);
    };

    const handleLogout = () => {
        router.push('/')
        router.refresh()
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');
    };

    return (
        <div className='grid lg:grid-cols-5 sm:grid-cols-1'>
            <div
                className={`sm:col-span-1 px-1.5 py-3 ${pathname === '/jobs' ? 'lg:col-span-4 ' : 'lg:col-span-5'} `}>
                <div className='grid grid-cols-2 lg:grid-cols-2 md:grid-cols-2 xs:grid-cols-1 items-center justify-between p-1'>
                    <div className=''>
                        <span className='font-semibold text-xl'>ACME</span>
                    </div>
                    <div className='mb-4 grid xl:justify-end lg:justify-center md:justify-center sm:justify-center '>
                        {accessToken ? (
                            <div
                                className='w-full right-0 mx-auto h-full grid grid-cols-1 md:grid-cols-1 xl:grid-cols-5'>
                                <div className='flex justify-center items-center mr-3'>
                                    <Link className='border-b active:border-blue-600' href='/jobs'>{t("job-list")}</Link>
                                </div>
                                <div className='flex justify-center items-center mr-3'>
                                    <Link className='border-b active:border-blue-600' href='/update-user'>{t("update-user")}</Link>
                                </div>
                                <div onClick={handleLogout} className='flex justify-center items-center mr-3'>
                                    <span className='border-b'>{t("logout")}</span>
                                </div>
                                <div className='flex flex-row items-center justify-center mr-3'>
                                    <span className='mr-2'>{data?.data?.email}</span>
                                    <img className='rounded-full' src={data?.data?.profileImage} width={30} alt=""/>
                                </div>
                                <div>
                                    <LanguageButton/>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col mr-2 md:flex-row ">
                                <>
                                    <div onClick={handleLoginClick} className='flex mb-2 md:mb-0 md:ml-2'>
                                        <div className='flex flex-row items-center border justify-center'>
                                            <span className='text-gray-900 text-sm p-1 '>{t('text-login')}</span>
                                        </div>
                                    </div>
                                    {isPopupLogin && (
                                        <div
                                            className="fixed z-10 top-0 right-0 w-full bg-gray-500 h-full bg-opacity-20 flex justify-center items-center">
                                            <div className="bg-white lg:w-1/3 sm:w-3/4 md:3/4 border p-4 rounded-md">
                                                <button onClick={() => setPopupLoginOpen(false)}><img
                                                    src="/assets/svg/close.svg" alt=""/></button>
                                                <Login/>
                                            </div>
                                        </div>
                                    )}
                                </>
                                <>
                                    <div onClick={handleRegisterClick} className='flex md:ml-2'>
                                        <div className='flex flex-row items-center border justify-center'>
                                            <span className='text-gray-900 text-sm p-1 '>{t('text-register')}</span>
                                        </div>
                                    </div>
                                    {isPopupRegister && (
                                        <div
                                            className="fixed z-10 top-0 right-0 w-full bg-gray-500 h-full bg-opacity-20 flex justify-center items-center">
                                            <div
                                                className="bg-white lg:w-1/3 sm:w-full md:w-full border p-4 rounded-md">
                                                <button onClick={() => setPopupRegisterOpen(false)}><img
                                                    src="/assets/svg/close.svg" alt=""/></button>
                                                <Register/>
                                            </div>
                                        </div>
                                    )}
                                </>
                                <div className='ml-4'>
                                    <LanguageButton/>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className='grid col-span-1'>
            </div>
        </div>
    );
}
