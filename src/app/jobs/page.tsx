'use client'
import {ServerTable} from "@/components/ServerTable/ServerTable";
import {useJobListQuery} from "@/handlers/jobs/use-all-jobs";
import Search from "@/components/Search/Search";
import {useState} from "react";
import {ApplyJobPost} from "@/components/ApplyJobPost/ApplyJobPost";
import {usePathname} from "next/navigation";
import {useTranslation} from "react-i18next";

const Jobs = () => {
    const [search, setSearch] = useState<string>('');
    const [field, setField] = useState<string | undefined>();
    const pathname = usePathname()
    const {t} = useTranslation()

    return (
        <div className='grid lg:grid-cols-5 sm:grid-cols-1'>
            <div className='lg:col-span-4 sm:col-span-1 py-3'>
                <div className='flex items-center p-2'>
                   <div className='border p-1 rounded-lg '>
                       <select onChange={e => setField(e.target.value)}>
                           <option value={undefined}>{t("field")}</option>
                           <option value='name'>{t("job-name")}</option>
                           <option value='companyName'>{t("company-name")}</option>
                           <option value='location'>{t("text-location")}</option>
                       </select>
                   </div>
                   <div className='ml-5'>
                       <Search onSearch={() => console.log('searched')} search={search} setSearch={setSearch}/>
                   </div>
                </div>
                <ServerTable query={useJobListQuery} filters={{
                    'search[field]': field && search.length > 3 ? field : undefined,
                    'search[query]': field && search.length > 3 ? search : undefined
                }}/>
            </div>
            {pathname === '/jobs' && (
                <div className=''>
                    <ApplyJobPost/>
                </div>
            )}
        </div>
    )
}

export default Jobs
