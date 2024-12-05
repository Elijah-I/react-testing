import type { Category } from "@/entities";
import { db } from "../db";

export const getProductsByCategoryId = (categoryId: Category["id"]) =>
  db.product.findMany({
    where: { categoryId: { equals: categoryId } }
  });
