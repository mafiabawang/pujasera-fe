import { axiosInstance } from "../../lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useFetchTenantById = (id) => {
    return useQuery({
        queryFn: async () => {
            const { data } = await axiosInstance.get(`/tenants/${id}`);
            return data.data.tenant;
        },
        queryKey: ["fetch.tenant", id],
    });
}