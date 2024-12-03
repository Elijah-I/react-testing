import { http, HttpResponse } from "msw";
import { server } from "./server";

export const simulateRequestError = (url: string) => {
  server.use(http.get(url, () => HttpResponse.error()));
};
