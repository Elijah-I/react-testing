import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

type BaseRender = typeof render;
type BaseScreen = typeof screen;
type BaseUserEvent = typeof userEvent;
type BaseWaitFor = typeof waitFor;
type BaseWaitForElementToBeRemoved = typeof waitForElementToBeRemoved;

declare global {
  interface Screen extends BaseScreen {}
  const render: BaseRender;
  const userEvent: BaseUserEvent;
  const waitFor: BaseWaitFor;
  const waitForElementToBeRemoved: BaseWaitForElementToBeRemoved;
}
