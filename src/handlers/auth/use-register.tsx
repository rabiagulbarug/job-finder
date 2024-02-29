import {InformationProps} from "@/types/types";
import {useMutation} from "@tanstack/react-query";
import {API_ENDPOINTS} from "@/utils/api-endpoint";
import http from "@/utils/http";
import {toast} from "react-toastify";
import {CustomToast} from "@/components/CostumToast/costum-toast";
import {useTranslation} from "react-i18next";
import {useRouter} from "next/navigation";

async function register(input: InformationProps) {
  return http.post(API_ENDPOINTS.REGISTER, input);
}

export const useRegisterMutation = () => {
  const {t} = useTranslation()
  const router = useRouter()
  return useMutation({
    mutationFn: async (input: InformationProps) => {
      return register(input);
    },
    onSuccess: async ({ data }) => {
      toast.success(
          <CustomToast
              type='success'
              message={t("success-register")}
          />,
          {
            autoClose: 2000,
            hideProgressBar: true,
          }
      );
      router.refresh()
    },
    onError: (data) => {
      toast.error(
          <CustomToast
              type='success'
              message={t("error-register")}
          />,
          {
            autoClose: 2000,
            hideProgressBar: true,
          }
      );
    },
  });
};
