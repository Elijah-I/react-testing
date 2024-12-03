import ProductDetail from "@/components/ProductDetail";
import type { ComponentProps } from "react";
import { db, ProductDetailMock, simulateRequestError } from "../mocks";
import { QueryClientProvider } from "../providers";

const { errorText, loaderText, emptyPlaceholderText } = ProductDetailMock;

describe("ProductDetail", () => {
  const productItem = db.product.getAll()[0];

  const renderProductDetail = (props: ComponentProps<typeof ProductDetail>) => {
    render(<ProductDetail {...props} />, { wrapper: QueryClientProvider });
  };

  it("should render <Product> with <Name> and <Price>", async () => {
    renderProductDetail({ productId: productItem.id });

    const product = (await screen.findByRole("heading")).parentNode;

    expect(product).toHaveTextContent(productItem.name);
    expect(product).toHaveTextContent(String(productItem.price));
  });

  it("should render <Empty placeholder> if no <Product> found", async () => {
    renderProductDetail({ productId: -1 });

    const emptyPlaceholder = await screen.findByText(emptyPlaceholderText);

    expect(emptyPlaceholder).toBeInTheDocument();
  });

  it("should render <Loader> while <Product> is fetching", async () => {
    renderProductDetail({ productId: productItem.id });

    const loader = await screen.findByText(loaderText);

    expect(loader).toBeInTheDocument();
  });

  it("should render <Error> if fetch failed", async () => {
    simulateRequestError("/products/:id");

    renderProductDetail({ productId: productItem.id });

    const error = await screen.findByText(errorText);

    expect(error).toBeInTheDocument();
  });
});
