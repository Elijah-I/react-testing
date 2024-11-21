import TermsAndConditions from "@/components/TermsAndConditions";
import { TermsAndConditionsMock } from "../mocks";

const { headerText } = TermsAndConditionsMock;

describe("TermsAndConditions", () => {
  const renderComponent = () => {
    render(<TermsAndConditions />);

    return {
      header: screen.getByRole("heading"),
      submitButton: screen.getByRole("button"),
      checkbox: screen.getByRole("checkbox")
    };
  };

  it("renders correct text", () => {
    const { header } = renderComponent();

    expect(header).toHaveTextContent(headerText);
  });

  it("renders disabled <submit> button at initial state", () => {
    const { submitButton } = renderComponent();

    expect(submitButton).toBeDisabled();
  });

  it("renders unchecked <checkbox> at initial state", () => {
    const { checkbox } = renderComponent();

    expect(checkbox).not.toBeChecked();
  });

  it("renders enabled <submit> button if <agree checkbox> is checked", async () => {
    const { checkbox, submitButton } = renderComponent();

    await userEvent.click(checkbox);

    expect(checkbox).toBeChecked();
    expect(submitButton).toBeEnabled();
  });

  it("renders disabled <submit> button after <agree checkbox> was checked and then unchecked", async () => {
    const { checkbox, submitButton } = renderComponent();

    await userEvent.click(checkbox);
    await userEvent.click(checkbox);

    expect(checkbox).not.toBeChecked();
    expect(submitButton).toBeDisabled();
  });
});
