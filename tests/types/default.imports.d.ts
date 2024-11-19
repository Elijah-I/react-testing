import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ResizeObserver from "resize-observer-polyfill";

type BaseRender = typeof render;
type BaseScreen = typeof screen;
type BaseUserEvent = typeof userEvent;
type BaseWaitFor = typeof waitFor;
type BaseResizeObserver = typeof ResizeObserver;

declare global {
  interface Screen extends BaseScreen {}
  const render: BaseRender;
  const userEvent: BaseUserEvent;
  const waitFor: BaseWaitFor;
  const ResizeObserver: BaseResizeObserver;
}
