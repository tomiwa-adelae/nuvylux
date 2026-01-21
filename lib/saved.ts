import api from "./api";

export const savedService = {
  getMySavedProducts: async () => {
    const res = await api.get(`/saved`);
    return res.data;
  },
};
