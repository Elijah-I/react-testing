import { screen, render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterAll, beforeAll } from "vitest";
import ResizeObserver from "resize-observer-polyfill";
import { server } from "../mocks";

beforeAll(() => {
  server.listen();

  // @ts-expect-error type
  global.waitFor = waitFor;
  // @ts-expect-error type
  global.render = render;
  // @ts-expect-error type
  global.screen = screen;
  // @ts-expect-error type
  global.userEvent = userEvent;

  window.ResizeObserver = ResizeObserver;

  window.matchMedia =
    window.matchMedia ||
    (() => ({
      writable: true,
      value: vi.fn().mockImplementation((query) => ({
        matches: false,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn()
      }))
    }));

  window.HTMLElement.prototype.scrollIntoView = vi.fn();
  window.HTMLElement.prototype.hasPointerCapture = vi.fn();
  window.HTMLElement.prototype.releasePointerCapture = vi.fn();
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();

  // @ts-expect-error type
  delete global.waitFor;
  // @ts-expect-error type
  delete global.render;
  // @ts-expect-error type
  delete global.screen;
  // @ts-expect-error type
  delete global.userEvent;
});
