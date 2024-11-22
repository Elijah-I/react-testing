import { Category } from "@/entities";
import { createGetRequest } from "./createGetRequest";
import { categoryList } from "../db";

export const getCategories = createGetRequest<Category[]>({
  url: "/categories",
  response: categoryList
});
