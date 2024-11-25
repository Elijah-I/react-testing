import { setupServer } from "msw/node";
import { getProducts } from "./getProducts";
import { getProduct } from "./getProduct";

export const server = setupServer(getProducts, getProduct);
