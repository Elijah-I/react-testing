import { Product } from "@/entities";
import { db } from "../db";
import { createGetRequest } from "./createGetRequest";

export const getProducts = createGetRequest<Product[]>({
  url: "/products",
  response: db.product.getAll()
});
