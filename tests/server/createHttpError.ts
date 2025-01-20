import { http, HttpResponse } from "msw";
import { server } from "./server";

export const createHttpError = (path: string) => ({
  GET: () => server.use(http.get(path, () => HttpResponse.error()))
});
