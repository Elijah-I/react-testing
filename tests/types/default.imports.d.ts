import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

type BaseRender = typeof render;
type BaseScreen = typeof screen;

type BaseDescribe = typeof describe;
type BaseExpect = typeof expect;
type BaseIt = typeof it;

declare global {
  interface Screen extends BaseScreen {}
  const render: BaseRender;
  const describe: BaseDescribe;
  const expect: BaseExpect;
  const it: BaseIt;
}
