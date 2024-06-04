import { axiosInstance } from "../../lib/axios";
import { useMutation } from "@tanstack/react-query";

export const useEditTenant = ({ onSuccess }) => {
    return useMutation({
        mutationFn: async ({ id, body }) => {
            const { data } = await axiosInstance.put(`/tenants/${id}`, body);

            return data;
        },
        onSuccess,
    });
};