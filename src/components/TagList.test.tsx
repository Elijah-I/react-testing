import { render, screen } from "@testing-library/react";
import TagList from "./TagList";

describe("TagList", () => {
  it("should render tag list", async () => {
    const { tagItems } = await renderTagList();

    expect(tagItems.length).toBeGreaterThan(0);
  });
});

const renderTagList = async () => {
  render(<TagList />);

  return {
    tagItems: await screen.findAllByRole("listitem")
  };
};
