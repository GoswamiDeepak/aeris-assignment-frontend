import { api } from "./client";

export const getVehicals = (queryString?:string) => api.get(`/api/v1/vehicals?${queryString}`);