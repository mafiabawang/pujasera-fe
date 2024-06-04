import { axiosInstance } from "../../lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useFetchUserById = (id) => {
    return useQuery({
        queryFn: async () => {
            const { data } = await axiosInstance.get(`/users/${id}`);
            return data.data.user;
        },
        queryKey: ["fetch.user", id],
    });
}