import { screen, render } from "@testing-library/react";
import { afterAll, beforeAll } from "vitest";

beforeAll(() => {
  // @ts-expect-error type
  global.render = render;
  // @ts-expect-error type
  global.screen = screen;
});

afterAll(() => {
  // @ts-expect-error type
  delete global.render;
  // @ts-expect-error type
  delete global.screen;
});
