import { Theme } from "@radix-ui/themes";
import { OrderStatusSelectorMock } from "../mocks";
import OrderStatusSelector from "@/components/OrderStatusSelector";

const { defaultSelectedIndex, selectOptions } = OrderStatusSelectorMock;

describe("OrderStatusSelector", () => {
  const renderOrderStatusSelector = () => {
    const onChange = vi.fn();

    render(<OrderStatusSelector onChange={onChange} />, { wrapper: Theme });

    return {
      onChange,
      dropdownElement: screen.getByRole("combobox"),
      getOptions: () => screen.getAllByRole("option"),
      getOption: (name: string) => screen.getByRole("option", { name }),
      getLabels: (options: HTMLElement[]) =>
        options.map((option) => option.textContent)
    };
  };

  it("should render correct values list", async () => {
    const { getOptions, getLabels, dropdownElement } =
      renderOrderStatusSelector();

    await userEvent.click(dropdownElement);

    const options = getOptions();
    const labels = getLabels(options);

    expect(options).toHaveLength(3);
    expect(labels).toEqual(selectOptions.map((option) => option.label));
  });

  it.each(selectOptions)(
    "should call onChange with $value when the $label option is selected",
    async ({ label, value }) => {
      const { onChange, getOption, dropdownElement } =
        renderOrderStatusSelector();

      const isDefaultOption =
        value === selectOptions[defaultSelectedIndex].value;

      await userEvent.click(dropdownElement);

      if (isDefaultOption) {
        const nextOption = getOption(
          selectOptions[defaultSelectedIndex + 1].label
        );
        await userEvent.click(nextOption);
        await userEvent.click(dropdownElement);
      }

      const currentOption = getOption(label);
      await userEvent.click(currentOption);

      expect(onChange).toHaveBeenCalledWith(expect.stringMatching(value));
    }
  );
});
