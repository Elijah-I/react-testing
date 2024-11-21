import { User } from "@/entities";

export const user: User = { id: 0, name: "Elijah" };
export const admin: User = {
  id: 0,
  name: "Admin",
  isAdmin: true
};
export const editButtonText: RegExp = /edit/i;
