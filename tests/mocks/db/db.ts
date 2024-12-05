/* eslint-disable @typescript-eslint/unbound-method */
import { factory } from "@mswjs/data";
import { product } from "./product";
import { category } from "./category";
import { faker } from "@faker-js/faker";

const fillAmount = 3;

export const db = factory({ product, category });

const uniqProductNames = faker.helpers.uniqueArray(
  faker.commerce.productName,
  fillAmount
);

const uniqCategoryNames = faker.helpers.uniqueArray(
  faker.commerce.department,
  fillAmount
);

for (let i = 0; i < fillAmount; i++) {
  const addedCategory = db.category.create({ name: uniqCategoryNames[i] });

  db.product.create({
    name: uniqProductNames[i],
    categoryId: addedCategory.id
  });
}
