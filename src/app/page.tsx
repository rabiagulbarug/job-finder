'use client'

import {useTranslation} from "react-i18next";

export default function Home() {
    const {t} = useTranslation()

    return (
        <div className='flex flex-col justify-center items-center'>
            {t("context")}
        </div>
    );
}
