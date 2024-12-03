import { delay, http, HttpResponse, type JsonBodyType } from "msw";
import { server } from "./server";

export const simulateRequestDelay = <T extends JsonBodyType>(
  url: string,
  response?: T
) => {
  server.use(
    http.get(url, async () => {
      await delay();
      return HttpResponse.json(response || []);
    })
  );
};
