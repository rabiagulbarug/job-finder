'use client'
import {Job} from "@/types/types";
import {useTranslation} from "react-i18next";
import {useState} from "react";
import {useJobApplyMutations} from "@/handlers/jobs/use-job-apply";
import {useJobWithdrawMutations} from "@/handlers/jobs/use-job-withdraw";
import {useRouter} from "next/navigation";

interface JobCardProps {
    job: Job;
}

export const JobCard = ({job}: JobCardProps) => {
    const {t} = useTranslation()
    const [isDetailPopupOpen, setDetailPopupOpen] = useState(false);
    const {mutate: mutateApply, error: errorApply} = useJobApplyMutations({id: String(job.id)})
    const {mutate: mutateWithdraw} = useJobWithdrawMutations({id: String(job.id)})
    const router = useRouter()
    const handleDetailClick = () => {
        setDetailPopupOpen(true);
    };

    const closeDetailPopup = () => {
        setDetailPopupOpen(false);
    };

    const handleApplyClick = () => {
        mutateApply()
        if(!errorApply){
            router.push('/jobs')
            setDetailPopupOpen(false);
        }
    }
    const handleWithdrawClick = () => {
        mutateWithdraw()
    }

    const createdAt = new Date(job.createdAt).toLocaleDateString(
        'tr-TR'
    );


    return (
        <div className="grid lg:grid-cols-6 rounded p-4 border-b border-gray-700">
            <div className='flex justify-center lg:col-span-1 sm:disabled '>
                <img src="/assets/svg/job.svg" alt="" width={60}/>
            </div>
            <div className='flex flex-col lg:col-span-4'>
                <div className='grid lg:grid-cols-4  p-2 grid-cols-2 text-sm'>
                    <span className="text-black mr-2">{job.companyName}</span>
                    <span className="text-gray-800 font-bold">{job.name}</span>
                </div>
                <div className="grid grid-cols-1 p-2 text-sm">
                    {job.description}
                </div>
                <div className="grid grid-cols-1 p-2 text-sm">
                    {t('text-location')} : {job.location}
                </div>
                <div className="grid grid-cols-1 p-2 text-sm">
                    {t("salary")} : {job.salary}
                </div>
                <div className="grid lg:grid-cols-6 md:grid-cols-3 sm:grid-cols-1 p-2 text-sm">
                    {job.keywords.map((keyword, index) => (
                        <p key={index} className='border mr-2 mb-1 rounded-lg grid justify-center'>
                            <b>{keyword}</b>
                        </p>
                    ))}
                </div>
            </div>
            <div className='flex lg:flex-col sm:flex-row justify-center items-center lg:col-span-1'>
                <button onClick={handleDetailClick}
                        className='border rounded-lg bg-gray-800 text-white mr-2 px-5 py-2 mb-4'>
                    {t("detail")}
                </button>
                <button className='border p-2 mb-4 rounded-lg' onClick={handleWithdrawClick}>
                    {t("withdraw")}
                </button>
            </div>
            {isDetailPopupOpen && (
                <div
                    className="fixed z-10 top-0 right-0 text-sm w-full h-full bg-opacity-20 flex justify-center items-center">
                    <div className="bg-white lg:w-1/3 sm:w-3/4 md:3/4 border p-4 rounded-md">
                        <button onClick={closeDetailPopup}><img src="/assets/svg/close.svg" alt=""/></button>
                        {isDetailPopupOpen && (
                            <div
                                className="fixed z-10 top-0 bg-gray-500 right-0 w-full h-full bg-opacity-20 flex justify-center items-center">
                                <div className="bg-white shadow-xl lg:w-1/3 sm:w-3/4 md:3/4 border p-4 rounded-md">
                                    <button onClick={closeDetailPopup}><img src="/assets/svg/close.svg" alt=""/>
                                    </button>
                                    <div className='grid justify-center items-center p-5 '>
                                        <div className='grid text-xl mb-3 justify-center'><b>{t("apply-job")}</b></div>
                                        <p className='mb-2'><b>{t("company-name")}:</b> {job.companyName}</p>
                                        <p className='mb-2'><b>{t("job-name")}:</b> {job.name}</p>
                                        <p className='mb-2'><b>{t("created-at")} :</b>{createdAt}</p>
                                        <p className='mb-2'><b>{t("text-location")}:</b> {job.location}</p>
                                        <p className='mb-2'><b>{t('keyword')}:</b></p>
                                        <div className='flex mb-2 flex-row'>
                                            {job.keywords.map((keyword, index) => (
                                                <p key={index} className='border mr-2 p-1 rounded-lg'>
                                                    <b>{keyword}</b>
                                                </p>
                                            ))}
                                        </div>
                                        <p className='mb-2'><b>{t("salary")}:</b> {job.salary}</p>
                                        <p><b>{t('text-description')}:</b></p>
                                        <p className='w-auto border p-1 rounded-lg'>{job.description}</p>
                                        <div className=' flex justify-center mt-10'>
                                            <button className='border p-2 text-gray-800 rounded-lg'
                                                    onClick={closeDetailPopup}>{t("text-close")}</button>
                                            <button className='ml-4 border p-2 text-white rounded-lg bg-gray-700'
                                                    onClick={handleApplyClick}>{t("apply")}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}
