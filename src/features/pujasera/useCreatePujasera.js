import { axiosInstance } from "../../lib/axios";
import { useMutation } from "@tanstack/react-query";

export const useCreatePujasra = ({ onSuccess }) => {
    return useMutation({
        mutationFn: async (body) => {
            const { data } = await axiosInstance.post("/places", body);

            return data;
        },
        onSuccess,
    });
};