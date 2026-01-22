import api from "./api";

export const serviceService = {
  getMyServices: async () => {
    const res = await api.get(`/services`);
    return res.data;
  },

  getMyServicesDetails: async (slug: string | string[]) => {
    const res = await api.get(`/services/${slug}`);
    return res.data;
  },

  // Client discovery side
  getExploreServices: async (params?: { type?: string; search?: string }) => {
    // Matches the @Get('explore') endpoint in the backend
    const res = await api.get(`/services/public/explore`, { params });
    return res.data;
  },

  getPublicServiceDetails: async (slug: string) => {
    const response = await api.get(`/services/public/${slug}`);
    return response.data;
  },
};
