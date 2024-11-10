import ProductImageGallery from "@/components/ProductImageGallery";
import { emptyImageUrls, imageUrls } from "../mocks/ProductImageGallery.mock";
import { ComponentProps } from "react";

describe("ProductImageGallery", () => {
  const renderComponent = (
    props: ComponentProps<typeof ProductImageGallery>
  ) => {
    const { container } = render(<ProductImageGallery {...props} />);

    return {
      container,
      galleryItems: screen.queryAllByRole("img")
    };
  };

  it("should return <null> when <imageUrls> is empty", () => {
    const { container } = renderComponent({ imageUrls: emptyImageUrls });

    expect(container).toBeEmptyDOMElement();
  });

  it("should render correct <images> when <imageUrls> is not empty", () => {
    const { galleryItems } = renderComponent({ imageUrls });

    expect(galleryItems).toHaveLength(imageUrls.length);

    imageUrls.forEach((imageUrl, order) => {
      expect(galleryItems[order]).toHaveAttribute("src", imageUrl);
    });
  });
});
