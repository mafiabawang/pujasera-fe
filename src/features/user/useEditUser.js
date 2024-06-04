import { axiosInstance } from "../../lib/axios";
import { useMutation } from "@tanstack/react-query";

export const useEditUser = ({ onSuccess }) => {
    return useMutation({
        mutationFn: async ({ id, body }) => {
            const { data } = await axiosInstance.put(`/users/${id}`, body);

            return data;
        },
        onSuccess,
    });
};