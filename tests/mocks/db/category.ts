/* eslint-disable @typescript-eslint/unbound-method */
import type { Category } from "@/entities";
import type { TypedDbObject } from "../types";
import { manyOf, primaryKey } from "@mswjs/data";
import { faker } from "@faker-js/faker";

export const category: TypedDbObject<Category, "product", "many"> = {
  id: primaryKey(faker.number.int),
  name: faker.commerce.department,
  products: manyOf("product")
};
