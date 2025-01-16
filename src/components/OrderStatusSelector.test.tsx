import { Theme } from "@radix-ui/themes";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import OrderStatusSelector from "./OrderStatusSelector";

describe("OrderStatusSelector", () => {
  const defaultOption = "new";
  const secondOption = "processed";
  const options = [defaultOption, secondOption, "fulfilled"];

  it(`should render select with '${defaultOption}' option selected`, () => {
    const { selectElement } = renderOrderStatusSelector();

    expect(selectElement).toHaveTextContent(getAsRegExp(defaultOption));
  });

  it("should render options on click", async () => {
    const { getOptions, getOptionByName, selectElement } =
      renderOrderStatusSelector();

    await userEvent.click(selectElement);

    expect(getOptions()).toHaveLength(options.length);
    options.forEach((option) =>
      expect(getOptionByName(option)).toBeInTheDocument()
    );
  });

  it.each(options)(
    "should pass '%s' to callback on option select",
    async (option) => {
      const { onChange, getOptionByName, selectElement } =
        renderOrderStatusSelector();

      await userEvent.click(selectElement);
      if (option === defaultOption) {
        await userEvent.click(getOptionByName(secondOption));
        await userEvent.click(selectElement);
      }
      await userEvent.click(getOptionByName(option));

      expect(onChange).toHaveBeenCalledWith(option);
    }
  );

  it("should select option on click and hide options dropdown", async () => {
    const { getOptions, getOptionByName, selectElement } =
      renderOrderStatusSelector();

    await userEvent.click(selectElement);
    await userEvent.click(getOptionByName(secondOption));

    expect(getOptions()).toHaveLength(0);
    expect(selectElement).toHaveTextContent(getAsRegExp(secondOption));
  });
});

const getAsRegExp = (text: string): RegExp => new RegExp(text, "i");

const renderOrderStatusSelector = () => {
  const onChange = vi.fn();
  render(<OrderStatusSelector onChange={onChange} />, { wrapper: Theme });

  return {
    onChange,
    selectElement: screen.getByRole("combobox"),
    getOptions: () => screen.queryAllByRole("option"),
    getOptionByName: (name: string) =>
      screen.getByRole("option", { name: getAsRegExp(name) })
  };
};
