import { axiosInstance } from "../../lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useFetchPujaseras = () => {
    return useQuery({
        queryFn: async () => {
            const { data } = await axiosInstance.get("/places");

            return data.data.places;
        },
        queryKey: ["fetch.pujaseras"],
    });
};