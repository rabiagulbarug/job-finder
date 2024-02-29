import { useQuery } from '@tanstack/react-query';
import { IdProps } from "@/types/types";
import { API_ENDPOINTS } from "@/utils/api-endpoint";
import http from "@/utils/http";

export async function jobDetail({ id }: IdProps) {
    const response = await http.get(`${API_ENDPOINTS.JOBS}/${id}`);
    return response.data;
}

export const JobDetailQuery = ({ id }: IdProps) => {
    return useQuery({
        queryKey: [API_ENDPOINTS.JOBS, id],
        queryFn: () => jobDetail({ id }),
    });
};
