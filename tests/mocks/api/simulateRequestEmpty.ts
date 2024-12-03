import { http, HttpResponse, type JsonBodyType } from "msw";
import { server } from "./server";

export const simulateRequestEmpty = <T extends JsonBodyType>(
  url: string,
  response?: T
) => {
  server.use(http.get(url, () => HttpResponse.json(response || [])));
};
