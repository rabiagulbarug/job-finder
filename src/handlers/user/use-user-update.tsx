import React from 'react';
import http from "@/utils/http";
import {API_ENDPOINTS} from "@/utils/api-endpoint";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {UserUpdateProps} from "@/types/types";
import {useTranslation} from "react-i18next";

async function userUpdate(input: UserUpdateProps) {
    return http.put(`${API_ENDPOINTS.USER}`, input);
}

export const useUserUpdateMutation = () => {
    const {t} = useTranslation()
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (input: UserUpdateProps) =>
            userUpdate(input),
        onSuccess: ({ data }) => { queryClient.invalidateQueries({
                queryKey: [API_ENDPOINTS.USER],
            });
          window.location.href = '/update-user'
        },
        onError: (data) => {
        },
    });
};
