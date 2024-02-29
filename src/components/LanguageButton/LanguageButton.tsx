import React, {useState} from 'react';
import i18n from '../../../i18n';
// @ts-ignore
import Cookies from "js-cookie";

interface LanguageOption {
    value: string;
    label: string;
    icon: string;
}

const languageOptions: LanguageOption[] = [
    { value: 'en', label: 'English', icon: '/assets/flags/eng.svg' },
    { value: 'tr', label: 'Türkçe', icon: '/assets/flags/turkey.svg' },
];

const LanguageButton: React.FC = () => {
    const [currentLanguage, setCurrentLanguage] = useState<LanguageOption>(
        languageOptions.find((option) => option.value === i18n.language) || languageOptions[0]
    );

    const changeLanguage = () => {
        const nextLanguageIndex = (languageOptions.findIndex((option) => option.value === currentLanguage.value) + 1) % languageOptions.length;
        const nextLanguage = languageOptions[nextLanguageIndex];

        i18n.changeLanguage(nextLanguage.value);
        Cookies.set('lng', nextLanguage.value, { expires: 365, path: '/' });
        setCurrentLanguage(nextLanguage);
    };
    return (
        <div className='text-gray-800 grid justify-center'>
            <div  onClick={changeLanguage} className="w-8 h-8 p-1.5 bg-stone-50 rounded-[40px] shadow justify-center items-center inline-flex">
                <div className="w-5 h-5 relative">
                    <div className="w-[19.31px] h-[19.31px] left-[0.35px] top-[0.34px] absolute">
                    </div>
                    <div className="w-5 h-5 left-0 top-0 absolute">
                        <img src={currentLanguage.icon}  style={{ marginRight: 8 }} alt={currentLanguage.label} />

                    </div>
                </div>
            </div>
        </div>
    );
};

export default LanguageButton;
