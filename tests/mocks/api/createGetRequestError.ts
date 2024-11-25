import { http, HttpResponse } from "msw";

type Arguments = {
  url: string;
};

export const createGetRequestError = ({ url }: Arguments) =>
  http.get(url, () => HttpResponse.error());
