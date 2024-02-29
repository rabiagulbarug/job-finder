'use client'
import {InformationProps} from "@/types/types";
import {useMutation} from "@tanstack/react-query";
import http from "@/utils/http";
import {API_ENDPOINTS} from "@/utils/api-endpoint";
import Cookies from "js-cookie";
import {useRouter} from "next/navigation";
import {useTranslation} from "react-i18next";

async function login(input: InformationProps) {
  return http.post(API_ENDPOINTS.LOGIN, input);
}

export const useLoginMutation = () => {
  const {t} = useTranslation()
  const router = useRouter()
  return useMutation({
    mutationFn: async (input: InformationProps) => {
      return login(input);
    },
    onSuccess: async ({ data }) => {
      const { accessToken, refreshToken } = data;
      Cookies.set("accessToken", accessToken);
      Cookies.set("refreshToken", refreshToken);
      router.push('/jobs')
      router.refresh();
    },
    onError: (data) => {
    },
  });
};
