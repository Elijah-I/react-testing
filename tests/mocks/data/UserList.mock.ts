import { User } from "@/entities";

export const emptyUsers: User[] = [];

export const users: User[] = [
  {
    id: 0,
    name: "Elijah"
  },
  {
    id: 1,
    name: "Admin",
    isAdmin: true
  }
];

export const emptyPlaceholderText: RegExp = /no users available/i;

export const userLink = (id: User["id"]) => `/users/${id}`;
