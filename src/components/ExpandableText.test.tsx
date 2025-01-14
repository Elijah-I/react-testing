import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ComponentProps } from "react";
import ExpandableText from "./ExpandableText";

describe("ExpandableText", () => {
  const limit = 255;

  it(`should render article without show more button if text length < ${limit}`, () => {
    const text = getText(1);

    const { articleElement, getButtons } = renderExpandableText({ text });

    expect(articleElement).toBeInTheDocument();
    expect(getButtons().showMore).not.toBeInTheDocument();
  });

  it(`should render article with show more button and cropped text if text length > ${limit}`, () => {
    const text = getText(limit + 1);

    const { articleElement, getButtons } = renderExpandableText({ text });

    expect(articleElement).toBeInTheDocument();
    expect(articleElement).toHaveTextContent("...");
    expect(getButtons().showMore).toBeInTheDocument();
  });

  it("should expand text on show more button click", async () => {
    const text = getText(limit + 1);

    const { articleElement, getButtons } = renderExpandableText({ text });
    await userEvent.click(getButtons().showMore!);
    const { showMore, showLess } = getButtons();

    expect(articleElement).not.toHaveTextContent("...");
    expect(showMore).not.toBeInTheDocument();
    expect(showLess).toBeInTheDocument();
  });

  it("should collapse text on show less button click", async () => {
    const text = getText(limit + 1);

    const { articleElement, getButtons } = renderExpandableText({ text });
    await userEvent.click(getButtons().showMore!);
    await userEvent.click(getButtons().showLess!);
    const { showMore, showLess } = getButtons();

    expect(articleElement).toHaveTextContent("...");
    expect(showMore).toBeInTheDocument();
    expect(showLess).not.toBeInTheDocument();
  });
});

type ExpandableTextProps = ComponentProps<typeof ExpandableText>;
type Text = ExpandableTextProps["text"];

const getText = (length: number): Text => "a".repeat(length);

const renderExpandableText = (props: ExpandableTextProps) => {
  render(<ExpandableText {...props} />);

  return {
    articleElement: screen.getByRole("article"),
    getButtons: () => ({
      showMore: screen.queryByRole("button", { name: /more/i }),
      showLess: screen.queryByRole("button", { name: /less/i })
    })
  };
};
