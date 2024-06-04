import { axiosInstance } from "../../lib/axios";
import { useMutation } from "@tanstack/react-query";

export const useCreateTenant = ({ onSuccess }) => {
    return useMutation({
        mutationFn: async (body) => {
            const { data } = await axiosInstance.post("/tenants", body);

            return data;
        },
        onSuccess,
    });
};