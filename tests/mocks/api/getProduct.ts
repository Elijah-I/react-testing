import type { Product } from "@/entities";
import { http, HttpResponse } from "msw";
import { db } from "../db";

export const getProduct = http.get(
  "/products/:productId",
  ({ params: { productId } }) => {
    const getProduct = db.product.findFirst({
      where: { id: { equals: Number(productId) } }
    });

    if (!getProduct) {
      return HttpResponse.json<null>(null, { status: 404 });
    }

    return HttpResponse.json<Product>(getProduct);
  }
);
