import { axiosInstance } from "../../lib/axios";
import { useMutation } from "@tanstack/react-query";

export const useCreateUser = ({ onSuccess }) => {
    return useMutation({
        mutationFn: async (body) => {
            const { data } = await axiosInstance.post("/users", body);

            return data;
        },
        onSuccess,
    });
};