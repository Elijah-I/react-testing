import { setupServer } from "msw/node";
import { getCategories } from "./getCategories";
import { getProducts } from "./getProducts";

export const server = setupServer(getCategories, getProducts);
