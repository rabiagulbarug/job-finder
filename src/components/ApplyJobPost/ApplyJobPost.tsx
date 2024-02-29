'use client'
import { useUserQuery } from "@/handlers/user/use-user";
import {jobDetail} from "@/handlers/jobs/use-job-detail";
import { useEffect, useState } from "react";
import {useTranslation} from "react-i18next";

export const ApplyJobPost = () => {
    const { data } = useUserQuery();
    const {t} = useTranslation()
    const [mappedJobs, setMappedJobs] = useState<any[]>([]);

    useEffect(() => {
        if (data?.data?.appliedJobs) {
            const appliedJobIDList = data.data.appliedJobs
            const requests = appliedJobIDList.map((item: string) => jobDetail({ id: item }))
            Promise.all(requests).then(results => setMappedJobs(results))
        }
    },[data])



    return (
        <div className='h-[700px] flex flex-col items-center'>
            <div>
                <img src={data?.data?.profileImage} className='rounded-full' alt="" />
            </div>
            <div>
                {data?.data?.email}
            </div>
            <div className=''>
                <b>{t("applied-jobs")}</b>
            </div>
            <div>
                <div className='flex flex-col p-2'>
                    {mappedJobs.map((item:any, index:any) =>
                    <div key={index} className='border p-2 mb-2' >
                        <div>{item.name}</div>
                        <div> <b>{t("company-name")}: </b>{item.companyName}</div>
                        <div> <b>{t("text-location")}: </b> {item.location}</div>
                    </div>
                    )}
                </div>
            </div>
        </div>
    );
};
