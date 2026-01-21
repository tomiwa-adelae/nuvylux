import api from "./api";

export const serviceService = {
  getMyServices: async () => {
    const res = await api.get(`/services/my-services`);
    return res.data;
  },

  getMyServicesDetails: async (slug: string | string[]) => {
    const res = await api.get(`/services/my-services/${slug}`);
    return res.data;
  },

  getPublicServiceDetails: async (slug: string) => {
    // This calls the new public endpoint we just created
    const response = await api.get(`/services/public/details/${slug}`);
    return response.data;
  },
};
