import Greet from "@/components/Greet";

describe("Greet", () => {
  it("should render Hello with the <name> when it's provided", () => {
    const expectName = "Elijah";

    render(<Greet name={expectName} />);

    const nameComponent = screen.getByRole("heading");

    expect(nameComponent).toBeInTheDocument();
    expect(nameComponent).toHaveTextContent(expectName);
  });

  it("should render Login button when the <name> isn't provided", () => {
    render(<Greet />);

    const loginButton = screen.getByRole("button", { name: /login/i });

    expect(loginButton).toBeInTheDocument();
  });
});
