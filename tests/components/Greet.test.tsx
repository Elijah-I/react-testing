import Greet from "@/components/Greet";
import { GreetMock } from "../mocks";
import { ComponentProps } from "react";

const { loginButtonText, name } = GreetMock;

describe("Greet", () => {
  const renderComponent = (props?: ComponentProps<typeof Greet>) => {
    render(<Greet {...props} />);

    return {
      nameComponent: screen.queryByRole("heading"),
      loginButton: screen.queryByRole("button", { name: loginButtonText })
    };
  };

  it("should render Hello with the <name> when it's provided", () => {
    const { loginButton, nameComponent } = renderComponent({ name });

    expect(nameComponent).toHaveTextContent(name);
    expect(loginButton).not.toBeInTheDocument();
  });

  it("should render Login button when the <name> isn't provided", () => {
    const { loginButton } = renderComponent();

    expect(loginButton).toBeInTheDocument();
  });
});
