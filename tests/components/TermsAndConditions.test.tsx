import TermsAndConditions from "@/components/TermsAndConditions";
import { headerText } from "../mocks/TermsAndConditions.mock";

describe("TermsAndConditions", () => {
  it("renders correct text", () => {
    render(<TermsAndConditions />);

    const header = screen.getByRole("heading");

    expect(header).toBeInTheDocument();
    expect(header).toHaveTextContent(headerText);
  });

  it("renders disabled <submit> button at initial state", () => {
    render(<TermsAndConditions />);

    const submitButton = screen.getByRole("button");

    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });

  it("renders unchecked <checkbox> at initial state", () => {
    render(<TermsAndConditions />);

    const checkbox = screen.getByRole("checkbox");

    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
  });

  it("renders enabled <submit> button if <agree checkbox> is checked", async () => {
    render(<TermsAndConditions />);

    const checkbox = screen.getByRole("checkbox");
    await userEvent.click(checkbox);

    expect(checkbox).toBeChecked();
    expect(screen.getByRole("button")).toBeEnabled();
  });

  it("renders disabled <submit> button after <agree checkbox> was checked and then unchecked", async () => {
    render(<TermsAndConditions />);

    const checkbox = screen.getByRole("checkbox");
    await userEvent.click(checkbox);

    expect(checkbox).toBeChecked();
    expect(screen.getByRole("button")).toBeEnabled();

    await userEvent.click(checkbox);

    expect(checkbox).not.toBeChecked();
    expect(screen.getByRole("button")).toBeDisabled();
  });
});
