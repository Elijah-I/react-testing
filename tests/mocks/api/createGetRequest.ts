import { type DefaultBodyType, delay, http, HttpResponse } from "msw";

type Arguments<Response> = {
  url: string;
  response: Response;
  sleep?: boolean | number;
};

export const createGetRequest = <Response extends DefaultBodyType>({
  url,
  response,
  sleep
}: Arguments<Response>) =>
  http.get(url, async () => {
    if (sleep) {
      await delay(typeof sleep === "number" ? sleep : undefined);
    }
    return HttpResponse.json<Response>(response);
  });
