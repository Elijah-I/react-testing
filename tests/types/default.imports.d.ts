import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

type BaseRender = typeof render;
type BaseScreen = typeof screen;
type BaseUserEvent = typeof userEvent;

declare global {
  interface Screen extends BaseScreen {}
  const render: BaseRender;
  const userEvent: BaseUserEvent;
}
