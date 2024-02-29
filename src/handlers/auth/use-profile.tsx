import {useQuery} from "@tanstack/react-query";
import http from "@/utils/http";
import {API_ENDPOINTS} from "@/utils/api-endpoint";


async function profile() {
    return http.get(API_ENDPOINTS.PROFILE);
}

export const useProfileQuery = () => {
    return useQuery({
            queryKey: [API_ENDPOINTS.PROFILE],
            queryFn: () => profile()
        }
    )
};
