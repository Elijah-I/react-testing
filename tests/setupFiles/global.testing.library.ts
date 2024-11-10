import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterAll, beforeAll } from "vitest";

beforeAll(() => {
  // @ts-expect-error type
  global.render = render;
  // @ts-expect-error type
  global.screen = screen;
  // @ts-expect-error type
  global.userEvent = userEvent;
});

afterAll(() => {
  // @ts-expect-error type
  delete global.render;
  // @ts-expect-error type
  delete global.screen;
});
