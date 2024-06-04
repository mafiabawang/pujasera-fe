import { axiosInstance } from "../../lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useFetchTenants = () => {
    return useQuery({
        queryFn: async () => {
            const { data } = await axiosInstance.get("/tenants");

            return data.data.tenants;
        },
        queryKey: ["fetch.tenants"],
    });
};