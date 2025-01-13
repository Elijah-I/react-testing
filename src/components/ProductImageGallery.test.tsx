import { render, screen } from "@testing-library/react";
import type { ComponentProps } from "react";
import ProductImageGallery from "./ProductImageGallery";

describe("ProductImageGallery", () => {
  it("should return null in no images passed", () => {
    const imageUrls = getImageUrls(0);

    const { container } = renderProductImageGallery({ imageUrls });

    expect(container).toBeEmptyDOMElement();
  });

  it("should return list of images", () => {
    const imageUrls = getImageUrls(2);

    const { getImageElements } = renderProductImageGallery({ imageUrls });
    const imageElements = getImageElements();

    expect(imageElements).toHaveLength(imageUrls.length);
    imageElements.forEach((imageElement, order) =>
      expect(imageElement).toHaveAttribute("src", imageUrls[order])
    );
  });
});

const getImageUrls = (amount: number): ImageUrl[] =>
  Array<ImageUrl>(amount).fill(`url_${Math.random()}`);

type ProductImageGalleryProps = ComponentProps<typeof ProductImageGallery>;
type ImageUrl = ProductImageGalleryProps["imageUrls"][number];

const renderProductImageGallery = (props: ProductImageGalleryProps) => {
  const { container } = render(<ProductImageGallery {...props} />);

  return { container, getImageElements: () => screen.getAllByRole("img") };
};
