import SearchBox from "@/components/SearchBox";
import { SearchBoxMock } from "../mocks";

const { inputPlaceholder, inputSearchText, onChangeArguments } = SearchBoxMock;

describe("SearchBox", () => {
  const renderSearchBox = () => {
    const onChange = vi.fn();

    render(<SearchBox onChange={onChange} />);

    return {
      onChange,
      input: screen.getByPlaceholderText(inputPlaceholder)
    };
  };

  it("should render <search input> component", () => {
    const { input } = renderSearchBox();

    expect(input).toBeInTheDocument();
  });

  it("should call <onChange> callback with correct arguments on 'enter' key press", async () => {
    const { onChange, input } = renderSearchBox();

    await userEvent.type(input, `${inputSearchText}{enter}`);

    expect(onChange).toHaveBeenCalledWith(...onChangeArguments);
  });

  it("should not call <onChange> if input field is empty", async () => {
    const { onChange, input } = renderSearchBox();

    await userEvent.type(input, "{enter}");

    expect(onChange).not.toHaveBeenCalled();
  });
});
