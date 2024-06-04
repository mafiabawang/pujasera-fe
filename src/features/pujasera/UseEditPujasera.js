import { axiosInstance } from "../../lib/axios";
import { useMutation } from "@tanstack/react-query";

export const useEditPujasera = ({ onSuccess }) => {
    return useMutation({
        mutationFn: async ({ id, body }) => {
            const { data } = await axiosInstance.put(`/places/${id}`, body);
            return data;
        },
        onSuccess,
    });
};