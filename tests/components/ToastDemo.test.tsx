import ToastDemo from "@/components/ToastDemo";
import { Toaster } from "react-hot-toast";
import { ToastDemoMock } from "../mocks";

const { toastButtonText, toastText } = ToastDemoMock;

describe("ToastDemo", () => {
  const renderToastDemo = () => {
    render(
      <>
        <ToastDemo />
        <Toaster />
      </>
    );

    return {
      toastButton: screen.getByRole("button", { name: toastButtonText })
    };
  };

  it("should render <toast button>", () => {
    const { toastButton } = renderToastDemo();
    expect(toastButton).toBeInTheDocument();
  });

  it("should render <toast> after <toast button> click", async () => {
    const { toastButton } = renderToastDemo();

    await userEvent.click(toastButton);
    const toast = screen.getByText(toastText);

    expect(toast).toBeInTheDocument();
  });
});
