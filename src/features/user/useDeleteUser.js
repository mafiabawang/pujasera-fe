import { axiosInstance } from "../../lib/axios";
import { useMutation } from "@tanstack/react-query";

export const useDeleteUser = ({ onSuccess }) => {
    return useMutation({
        mutationFn: async (id) => {
            const { data } = await axiosInstance.delete(`/users/${id}`);

            return data;
        },
        onSuccess,
    });
};