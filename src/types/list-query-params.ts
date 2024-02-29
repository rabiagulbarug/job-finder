import {ListQueryParams} from "@/types/types";

export const listQueryString = (params: ListQueryParams) => {
    const searchParams = new URLSearchParams();
    searchParams.set('page', params.page.toString());
    if (params.limit) {
        searchParams.set('limit', params.limit.toString());
    }
    if (params.sort && params.sort.sortBy) {
        searchParams.set('sortBy', params.sort.sortBy);
        if (params.sort.sortOrder) {
            searchParams.set('order', params.sort.sortOrder);
        }
    }

    Object.keys(params.filters ?? {}).forEach((key) => {
        if(params.filters) {
            const value = params.filters[key];
            // @ts-ignore
            searchParams.append(key, value)
        }
    })

    return searchParams.toString();
};
