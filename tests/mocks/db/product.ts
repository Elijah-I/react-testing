/* eslint-disable @typescript-eslint/unbound-method */
import type { Product } from "@/entities";
import { faker } from "@faker-js/faker";
import { oneOf, primaryKey } from "@mswjs/data";
import { TypedDbObject } from "../types";

export const product: TypedDbObject<Product, "category"> = {
  id: primaryKey(faker.number.int),
  categoryId: faker.number.int,
  name: faker.commerce.productName,
  price: () => faker.number.int({ min: 1, max: 100 }),
  category: oneOf("category")
};
