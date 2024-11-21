import { setupServer } from "msw/node";
import { getCategories } from "./getCategories";

export const server = setupServer(getCategories);
