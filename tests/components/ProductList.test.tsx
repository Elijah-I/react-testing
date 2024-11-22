import ProductList from "@/components/ProductList";
import { createGetRequest, ProductListMock, server } from "../mocks";
import { Product } from "@/entities";

const { loaderText, emptyPlaceholderText } = ProductListMock;

describe("ProductList", () => {
  const renderProductList = () => {
    render(<ProductList />);
  };

  it("should render list of <products>", async () => {
    renderProductList();

    const products = await screen.findAllByRole("listitem");

    expect(products.length).toBeGreaterThan(0);
  });

  it("should render <empty placeholder> if no products found", async () => {
    server.use(
      createGetRequest<Product[]>({
        url: "/products",
        response: []
      })
    );

    renderProductList();

    const emptyPlaceholder = await screen.findByText(emptyPlaceholderText);

    expect(emptyPlaceholder).toBeInTheDocument();
  });

  it("should show <loader> while loading product list", () => {
    renderProductList();

    const loader = screen.getByText(loaderText);

    expect(loader).toBeInTheDocument();
  });
});
