import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TermsAndConditions from "./TermsAndConditions";

describe("TermsAndConditions", () => {
  it("should render page header", () => {
    const { headerElement } = renderTermsAndConditions();

    expect(headerElement).toBeInTheDocument();
  });

  it("should render checkbox unchecked", () => {
    const { checkboxElement } = renderTermsAndConditions();

    expect(checkboxElement).not.toBeChecked();
  });

  it("should render submit button disabled", () => {
    const { submitButtonElement } = renderTermsAndConditions();

    expect(submitButtonElement).toBeDisabled();
  });

  it("should enable submit button if checkbox is checked", async () => {
    const { checkboxElement, submitButtonElement } = renderTermsAndConditions();

    await userEvent.click(checkboxElement);

    expect(submitButtonElement).toBeEnabled();
  });

  it("should disable submit button if checkbox is unchecked", async () => {
    const { checkboxElement, submitButtonElement } = renderTermsAndConditions();

    await userEvent.click(checkboxElement);
    await userEvent.click(checkboxElement);

    expect(submitButtonElement).toBeDisabled();
  });

  it("should check checkbox on label click", async () => {
    const { checkboxElement, checkboxLabelElement } =
      renderTermsAndConditions();

    await userEvent.click(checkboxLabelElement);

    expect(checkboxElement).toBeChecked();
  });
});

const renderTermsAndConditions = () => {
  render(<TermsAndConditions />);

  return {
    headerElement: screen.getByRole("heading", { name: /terms/i }),
    submitButtonElement: screen.getByRole("button", { name: /submit/i }),
    checkboxLabelElement: screen.getByLabelText(/accept/),
    checkboxElement: screen.getByRole("checkbox")
  };
};
