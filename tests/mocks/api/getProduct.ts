import type { Product } from "@/entities";
import { http, HttpResponse } from "msw";
import { productList } from "../db";

export const getProduct = http.get(
  "/products/:productId",
  ({ params: { productId } }) => {
    const getProduct = productList.find(
      (product) => product.id === Number(productId)
    );

    if (!getProduct) {
      return HttpResponse.json<null>(null, { status: 404 });
    }

    return HttpResponse.json<Product>(getProduct);
  }
);
