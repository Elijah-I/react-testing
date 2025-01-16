import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Toaster } from "react-hot-toast";
import ToastDemo from "./ToastDemo";

describe("ToastDemo", () => {
  it("should show toast on button click", async () => {
    const { showButton, getStatus } = renderToastDemo();

    await userEvent.click(showButton);

    expect(await getStatus()).toHaveTextContent(/success/i);
  });
});

const renderToastDemo = () => {
  render(
    <>
      <ToastDemo />
      <Toaster />
    </>
  );

  return {
    showButton: screen.getByRole("button", { name: /show/i }),
    getStatus: async () => await screen.findByRole("status")
  };
};
