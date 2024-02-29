'use client'
import React, {useCallback, useState} from 'react';
import {SortOrder, TableProps} from "@/types/types";
import {JobCard} from "@/components/JobCard/JobCard";
import {useTranslation} from "react-i18next";

export const ServerTable = ({query, filters, id, sort: defaultSort}: TableProps) => {
    const {t} = useTranslation()
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const sanitizedFilters = Object.entries(filters ?? {})
        .filter(([_, value]) => value && value.length)
        .reduce((acc, [key, value]) => {
            if (typeof value === "string") {
                acc[key] = value;
            }
            return acc;
        }, {} as { [key: string]: string });

    const {data: response} = query({
        sort: {
            sortBy: defaultSort?.column ?? 'createdAt',
            sortOrder: (defaultSort?.direction as SortOrder) ?? SortOrder.DESC,
        },
        filters: sanitizedFilters,
        limit,
        page,
        _id: id,
    });

    const getVisiblePageNumbers = useCallback(() => {
        const totalPages = response?.data?.meta?.perPage ?? 0;
        const currentPageNumber = page;
        const arrayRange = (start: number, stop: number) =>
            Array.from(
                {length: stop - start + 1},
                (value, index) => start + index
            );
        return arrayRange(currentPageNumber - 1, currentPageNumber + 1).filter(
            (t) => t > 0 && t <= totalPages
        );
    }, [response, page]);

    return (
        <div className=''>
            <div className='grid grid-cols-1 h-[700px] overflow-y-scroll border rounded-l-2xl'>
                {response?.data && response.data?.data.map((job: any) => (
                    <JobCard job={job} key={job.id}/>
                ))}
            </div>
            <div className='mt-4 text-center mb-2 '>
                <button
                    onClick={() => setPage((page) => page - 1)}
                    disabled={page === 1}
                    className='px-2 py-1 border rounded cursor-pointer'>
                    {t("previous")}
                </button>
                {getVisiblePageNumbers().map((targetPage, index) => (
                    <span
                        key={index}
                        onClick={() => {
                            if (typeof targetPage === 'number') {
                                setPage(targetPage);
                            }
                        }}
                        className={`mx-2 px-2 py-1 rounded cursor-pointer ${
                            targetPage === page
                                ? 'bg-gray-700 text-white'
                                : ''
                        }`}>
                        {targetPage}
                    </span>
                ))}
                <button
                    onClick={() => setPage((page) => page + 1)}
                    disabled={page === response?.data?.meta?.pageSize ?? 0}
                    className='px-2 py-1 border rounded cursor-pointer'>
                    {t("next")}
                </button>
            </div>
        </div>
    );
};
