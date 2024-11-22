import { Product } from "@/entities";
import { createGetRequest } from "./createGetRequest";
import { productList } from "../db";

export const getProducts = createGetRequest<Product[]>({
  url: "/products",
  response: productList
});
