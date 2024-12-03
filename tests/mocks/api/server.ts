import { setupServer } from "msw/node";
import { db } from "../db";

export const server = setupServer(
  ...db.product.toHandlers("rest"),
  ...db.category.toHandlers("rest")
);
