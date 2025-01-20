import type { Product } from "@/entities";
import { primaryKey } from "@mswjs/data";
import type { FactoryType } from "../types";
import { db } from "./db";

export const product: FactoryType<Product> = {
  id: primaryKey(Number),
  categoryId: Number,
  name: String,
  price: Number
};

export const createProducts = (amount: number) => {
  const products: Product[] = [];

  for (let i = 0; i < amount; i++) {
    const id = i + 1;
    products.push(db.product.create({ id, name: `product_${id}` }));
  }

  return products;
};

export const clearProducts = (products: Product[]) => {
  db.product.deleteMany({
    where: { id: { in: products.map((product) => product.id) } }
  });
};
