// constants/roleNavMap.ts
import { architectNavLinks, brandNavLinks, userNavLinks } from "@/constants";

export type UserRole = "brand" | "professional" | "user";

export const roleNavMap: Record<UserRole, typeof userNavLinks> = {
  brand: brandNavLinks,
  professional: architectNavLinks,
  user: userNavLinks,
};
