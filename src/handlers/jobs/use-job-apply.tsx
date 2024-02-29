import {IdProps} from "@/types/types";
import {API_ENDPOINTS} from "@/utils/api-endpoint";
import http from "@/utils/http";
import {useMutation} from "@tanstack/react-query";
import {toast} from "react-toastify";
import {CustomToast} from "@/components/CostumToast/costum-toast";
import {useTranslation} from "react-i18next";


async function jobApply({id}: IdProps) {
    return http.post(`${API_ENDPOINTS.JOBS}/${id}/apply`);
}

export const useJobApplyMutations = ({id}: IdProps) => {
    const {t} = useTranslation()
    return useMutation({
        mutationFn: () => jobApply({id}),
        onSuccess: ({data}) => {
            toast.success(
                <CustomToast
                    type='success'
                    message={t("success-apply")}
                />,
                {
                    autoClose: 2000,
                    hideProgressBar: true,
                }
            );
        },
        onError: (data) => {
            toast.error(
                <CustomToast
                    type='error'
                    message={t("error-apply")}
                />,
                {
                    autoClose: 2000,
                    hideProgressBar: true,
                }
            );
        },
    });
};
