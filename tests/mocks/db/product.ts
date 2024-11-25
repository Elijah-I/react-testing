/* eslint-disable @typescript-eslint/unbound-method */
import { Product } from "@/entities";
import { faker } from "@faker-js/faker";
import { primaryKey } from "@mswjs/data";
import { TypedDbObject } from "../types";

export const product: TypedDbObject<Product> = {
  id: primaryKey(faker.number.int),
  categoryId: faker.number.int,
  name: faker.commerce.productName,
  price: () => faker.number.int({ min: 1, max: 100 })
};
