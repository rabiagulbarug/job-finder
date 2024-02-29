import {useQuery} from "@tanstack/react-query";
import http from "@/utils/http";
import {API_ENDPOINTS} from "@/utils/api-endpoint";


async function user() {
    return http.get(API_ENDPOINTS.USER);
}

export const useUserQuery = () => {
    return useQuery({
            queryKey: [API_ENDPOINTS.USER],
            queryFn: () => user()
        }
    )
};
