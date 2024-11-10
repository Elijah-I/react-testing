import ExpandableText from "@/components/ExpandableText";
import {
  longText,
  shortText,
  showLessText,
  showMoreText,
  textLimit,
  truncatedText
} from "../mocks/ExpandableText.mock";
import type { ComponentProps } from "react";

describe("ExpandableText", () => {
  const renderComponent = (props: ComponentProps<typeof ExpandableText>) => {
    render(<ExpandableText {...props} />);

    return {
      articleText: screen.getByRole("article"),
      expandButton: screen.queryByRole("button")
    };
  };

  it(`should render full <text> without <expand button> if the text is shorter than <limit (${textLimit})>`, () => {
    const { articleText, expandButton } = renderComponent({ text: shortText });

    expect(articleText).toHaveTextContent(shortText);
    expect(expandButton).not.toBeInTheDocument();
  });

  it(`should render truncated <text> and <expand button> if the text is longer than <limit (${textLimit})>`, () => {
    const { articleText, expandButton } = renderComponent({ text: longText });

    expect(articleText).toHaveTextContent(truncatedText);
    expect(expandButton).toHaveTextContent(showMoreText);
  });

  it(`should render full <text> and change <expand button> label after <expand button> is clicked`, async () => {
    const { articleText, expandButton } = renderComponent({ text: longText });

    expandButton && (await userEvent.click(expandButton));

    expect(expandButton).toHaveTextContent(showLessText);
    expect(articleText).toHaveTextContent(longText);
  });

  it(`should render truncated <text> and <expand button> if the <collapse button> is clicked`, async () => {
    const { articleText, expandButton } = renderComponent({ text: longText });

    expandButton && (await userEvent.click(expandButton));
    expandButton && (await userEvent.click(expandButton));

    expect(articleText).toHaveTextContent(truncatedText);
    expect(expandButton).toHaveTextContent(showMoreText);
  });
});
