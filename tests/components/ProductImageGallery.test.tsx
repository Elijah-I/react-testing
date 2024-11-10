import ProductImageGallery from "@/components/ProductImageGallery";
import { emptyImageUrls, imageUrls } from "../mocks/ProductImageGallery.mock";

describe("ProductImageGallery", () => {
  it("should return <null> when <imageUrls> is empty", () => {
    const { container } = render(
      <ProductImageGallery imageUrls={emptyImageUrls} />
    );

    expect(container).toBeEmptyDOMElement();
  });

  it("should render correct <images> when <imageUrls> is not empty", () => {
    render(<ProductImageGallery imageUrls={imageUrls} />);

    const galleryItems = screen.getAllByRole("img");

    expect(galleryItems).toHaveLength(imageUrls.length);

    imageUrls.forEach((imageUrl, order) => {
      expect(galleryItems[order]).toHaveAttribute("src", imageUrl);
    });
  });
});
