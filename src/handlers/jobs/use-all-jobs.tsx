import {ListQueryParams} from "@/types/types";
import {API_ENDPOINTS} from "@/utils/api-endpoint";
import http from "@/utils/http";
import {useQuery} from "@tanstack/react-query";
import {AxiosResponse} from "axios";
import {listQueryString} from "@/types/list-query-params";


async function jobList(params: ListQueryParams) {
    return await http.get(`${API_ENDPOINTS.JOBS}?${listQueryString(params)}`);

}

export const useJobListQuery = ({filters, sort, page, limit}: ListQueryParams) => {
    return useQuery<AxiosResponse>({
            queryKey: [API_ENDPOINTS.JOBS, filters, sort, page, limit],
            queryFn: () => jobList({filters, sort, page, limit})
        }
    )
};
