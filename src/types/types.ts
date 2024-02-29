import {UseQueryResult} from '@tanstack/react-query';
import React from 'react';
import {AxiosResponse} from 'axios';
import {SetFormValueMethod, SetStepMethod, StepperState} from "@/hooks/useStepper";

export type TableProps = {
    query: (
        params: ListQueryParams
    ) => UseQueryResult<AxiosResponse>;
    id?: string;
    filters?: Filter;
    sort?: { column: string, direction: string }
};

export type Filter = {
    [key: string]: string | undefined;
};

export enum SortOrder {
    ASC = 'asc',
    DESC = 'desc',
}

export type Sort = {
    sortBy: string;
    sortOrder?: SortOrder;
};

export type ListQueryParams = {
    filters?: Filter;
    sort?: Sort;
    page: number;
    limit: number;
    _id?: string;
};

export interface IdProps {
    id: string
}

export interface InformationProps {
    email: string
    password: string
}

export interface UserUpdateProps {

}

export type CurrentProps = {
    setStep: SetStepMethod;
    setFormValue: SetFormValueMethod;
    state: StepperState;
};

export interface Job {
    id: string
    name: string
    companyName: string
    keywords: []
    location: string
    description: string
    salary: string
    createdAt: string
}

export interface SearchProps {
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    onSearch: (searchText: string) => void;
}
