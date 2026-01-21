import api from "./api";

export const brandService = {
  getBrandDetails: async () => {
    const res = await api.get(`/brand/details`);
    return res.data;
  },
};
