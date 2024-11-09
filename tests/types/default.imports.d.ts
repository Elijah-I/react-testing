import { render, screen } from "@testing-library/react";

type BaseRender = typeof render;
type BaseScreen = typeof screen;

declare global {
  interface Screen extends BaseScreen {}
  const render: BaseRender;
}
