import { render, screen } from "@testing-library/react";
import type { ComponentProps } from "react";
import Greet from "./Greet";

describe("Greet", () => {
  it("should render Login button if no <name> prop passed", () => {
    const { getLoginButton } = renderGreet();

    expect(getLoginButton()).toBeInTheDocument();
  });

  it("should render Name if <name> prop passed", () => {
    const name = "Test name";
    const { getUserNameComponent } = renderGreet({ name });

    expect(getUserNameComponent()).toHaveTextContent(name);
  });
});

type GreetProps = ComponentProps<typeof Greet>;

const renderGreet = (props?: GreetProps) => {
  render(<Greet {...props} />);

  return {
    getLoginButton: () => screen.getByRole("button", { name: /login/i }),
    getUserNameComponent: () => screen.getByRole("heading")
  };
};
