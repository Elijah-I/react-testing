import ProductList from "@/components/ProductList";
import {
  createGetRequest,
  createGetRequestError,
  ProductListMock,
  server
} from "../mocks";

const { errorText, loaderText, emptyPlaceholderText } = ProductListMock;

describe("ProductList", () => {
  const renderProductList = () => {
    render(<ProductList />);
  };

  it("should render list of <products>", async () => {
    renderProductList();

    expect((await screen.findAllByRole("listitem")).length).toBeGreaterThan(0);
  });

  it("should render <empty placeholder> if no products found", async () => {
    server.use(createGetRequest({ url: "/products", response: [] }));

    renderProductList();

    expect(await screen.findByText(emptyPlaceholderText)).toBeInTheDocument();
  });

  it("should show <loader> while loading <product list>", async () => {
    server.use(
      createGetRequest({ url: "/products", response: [], sleep: true })
    );

    renderProductList();

    expect(await screen.findByText(loaderText)).toBeInTheDocument();
  });

  it("should remove <loader> after <product list> is loaded", async () => {
    renderProductList();

    await waitForElementToBeRemoved(() => screen.queryByText(loaderText));
  });

  it("should remove <loader> if fetch failed", async () => {
    server.use(createGetRequestError({ url: "/products" }));

    renderProductList();

    await waitForElementToBeRemoved(() => screen.queryByText(loaderText));
  });

  it("should render <Error> if fetch failed", async () => {
    server.use(createGetRequestError({ url: "/products" }));

    renderProductList();

    expect(await screen.findByText(errorText)).toBeInTheDocument();
  });
});
