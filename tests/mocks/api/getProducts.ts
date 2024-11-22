import { Product } from "@/entities";
import { createGetRequest } from "./createGetRequest";

export const getProducts = createGetRequest<Product[]>({
  url: "/products",
  response: [
    { id: 1, name: "Product 1", price: 1, categoryId: 1 },
    { id: 2, name: "Product 2", price: 2, categoryId: 2 },
    { id: 3, name: "Product 3", price: 3, categoryId: 3 }
  ]
});
