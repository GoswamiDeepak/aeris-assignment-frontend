import { api } from "./client";

export const getVehicals = () => api.get('/api/v1/vehicals');