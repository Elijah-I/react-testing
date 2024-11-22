import { type DefaultBodyType, http, HttpResponse } from "msw";

type Arguments<Response> = {
  url: string;
  response: Response;
};

export const createGetRequest = <Response extends DefaultBodyType>({
  url,
  response
}: Arguments<Response>) =>
  http.get(url, () => HttpResponse.json<Response>(response));
