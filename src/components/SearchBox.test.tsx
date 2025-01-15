import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchBox from "./SearchBox";

describe("SearchBox", () => {
  it("should render input with placeholder", () => {
    const { searchInput } = renderSearchBox();

    expect(searchInput).toBeInTheDocument();
  });

  it("should render text on type", async () => {
    const text = "text";
    const { searchInput } = renderSearchBox();

    await userEvent.type(searchInput, text);

    expect(searchInput).toHaveValue(text);
  });

  it("should call onChange with typed text on enter key press", async () => {
    const text = "text";
    const { onChange, searchInput } = renderSearchBox();

    await userEvent.type(searchInput, text + "{enter}");

    expect(onChange).toHaveBeenCalledOnce();
    expect(onChange).toHaveBeenCalledWith(text);
  });

  it("should not call onChange if input is empty", async () => {
    const { onChange, searchInput } = renderSearchBox();

    await userEvent.type(searchInput, "{enter}");

    expect(onChange).not.toHaveBeenCalled();
  });
});

const renderSearchBox = () => {
  const onChange = vi.fn();
  render(<SearchBox onChange={onChange} />);

  return {
    onChange,
    searchInput: screen.getByPlaceholderText(/search/i)
  };
};
