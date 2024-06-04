import { axiosInstance } from "../../lib/axios";
import { useMutation } from "@tanstack/react-query";

export const useDeletePujasera = ({ onSuccess }) => {
    return useMutation({
        mutationFn: async (id) => {
            const { data } = await axiosInstance.delete(`/places/${id}`);

            return data;
        },
        onSuccess,
    });
};