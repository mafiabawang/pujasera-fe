import { axiosInstance } from "../../lib/axios";
import { useMutation } from "@tanstack/react-query";

export const useDeleteTenant = ({ onSuccess }) => {
    return useMutation({
        mutationFn: async (id) => {
            const { data } = await axiosInstance.delete(`/tenants/${id}`);

            return data;
        },
        onSuccess,
    });
};