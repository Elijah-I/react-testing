import { screen, render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterAll, beforeAll } from "vitest";

beforeAll(() => {
  // @ts-expect-error type
  global.waitFor = waitFor;
  // @ts-expect-error type
  global.render = render;
  // @ts-expect-error type
  global.screen = screen;
  // @ts-expect-error type
  global.userEvent = userEvent;

  global.matchMedia =
    global.matchMedia ||
    (() => ({
      writable: true,
      value: vi.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn()
      }))
    }));
});

afterAll(() => {
  // @ts-expect-error type
  delete global.waitFor;
  // @ts-expect-error type
  delete global.render;
  // @ts-expect-error type
  delete global.screen;
  // @ts-expect-error type
  delete global.userEvent;
});
