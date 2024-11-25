import { setupServer } from "msw/node";
import { getCategories } from "./getCategories";
import { getProducts } from "./getProducts";
import { getProduct } from "./getProduct";

export const server = setupServer(getCategories, getProducts, getProduct);
