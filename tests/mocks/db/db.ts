import { factory } from "@mswjs/data";
import { product } from "./product";

export const db = factory({ product });

for (let i = 0; i < 3; i++) {
  db.product.create();
}
