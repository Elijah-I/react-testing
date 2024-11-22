import { Category } from "@/entities";
import { createGetRequest } from "./createGetRequest";

export const getCategories = createGetRequest<Category[]>({
  url: "/categories",
  response: [
    { id: 1, name: "Electronics" },
    { id: 2, name: "Beauty" },
    { id: 3, name: "Gardening" }
  ]
});
