import ExpandableText from "@/components/ExpandableText";
import {
  longText,
  shortText,
  showLessText,
  showMoreText,
  textLimit,
  truncatedText
} from "../mocks/ExpandableText.mock";

describe("ExpandableText", () => {
  it(`should render full <text> without <expand button> if the text is shorter than <limit (${textLimit})>`, () => {
    render(<ExpandableText text={shortText} />);

    const articleText = screen.getByRole("article");
    const expandButton = screen.queryByRole("button");

    expect(articleText).toHaveTextContent(shortText);
    expect(expandButton).not.toBeInTheDocument();
  });

  it(`should render truncated <text> and <expand button> if the text is longer than <limit (${textLimit})>`, () => {
    render(<ExpandableText text={longText} />);

    const articleText = screen.getByRole("article");
    const expandButton = screen.getByRole("button");

    expect(articleText).toHaveTextContent(truncatedText);
    expect(expandButton).toHaveTextContent(showMoreText);
  });

  it(`should render full <text> and change <expand button> label after <expand button> is clicked`, async () => {
    render(<ExpandableText text={longText} />);

    const articleText = screen.getByRole("article");

    const expandButton = screen.getByRole("button");
    await userEvent.click(expandButton);

    expect(expandButton).toHaveTextContent(showLessText);
    expect(articleText).toHaveTextContent(longText);
  });

  it(`should render truncated <text> and <expand button> if the <collapse button> is clicked`, async () => {
    render(<ExpandableText text={longText} />);

    const articleText = screen.getByRole("article");

    const expandButton = screen.getByRole("button", { name: showMoreText });
    await userEvent.click(expandButton);

    const collapseButton = screen.getByRole("button", { name: showLessText });
    await userEvent.click(collapseButton);

    expect(articleText).toHaveTextContent(truncatedText);
    expect(expandButton).toHaveTextContent(showMoreText);
  });
});
