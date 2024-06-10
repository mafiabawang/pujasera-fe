import { axiosInstance } from "../../lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useFetchUsers = (role = '') => {
    return useQuery({
        queryFn: async () => {
            const url = role ? `/users?role=${role}` : "/users";
            const { data } = await axiosInstance.get(url);

            return data.data.users;
        },
        queryKey: ["fetch.users"],
    });
};