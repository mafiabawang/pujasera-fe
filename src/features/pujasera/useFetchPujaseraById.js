import { axiosInstance } from "../../lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useFetchPujaseraById = (id) => {
    return useQuery({
        queryFn: async () => {
            const { data } = await axiosInstance.get(`/places/${id}`);
            return data.data.place;
        },
        queryKey: ["fetch.pujasera", id],
        enabled: !!id,
    });
}