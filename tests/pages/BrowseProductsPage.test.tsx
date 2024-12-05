import BrowseProductsPage from "@/pages/BrowseProductsPage";
import { CartProvider } from "@/providers/CartProvider";
import { Theme } from "@radix-ui/themes";
import { PropsWithChildren } from "react";
import {
  BrowseProductsPageMock,
  db,
  getProductsByCategoryId,
  simulateRequestDelay,
  simulateRequestError
} from "../mocks";
import type { Product } from "@/entities";

const { errorText, allOptionText, categoriesSkeleton, productsSkeleton } =
  BrowseProductsPageMock;

describe("BrowseProductsPage", () => {
  it("should render <Categories skeleton> while fetching", () => {
    simulateRequestDelay("/categories");

    const { getCategoriesSkeleton } = renderBrowseProductsPage();

    expect(getCategoriesSkeleton()).toBeInTheDocument();
  });

  it("should remove <Categories skeleton> after data is fetched", async () => {
    simulateRequestDelay("/categories");

    const { getCategoriesSkeleton } = renderBrowseProductsPage();

    await waitForElementToBeRemoved(getCategoriesSkeleton);
  });

  it("should render <Products skeleton> while fetching", () => {
    simulateRequestDelay("/products");

    const { getProductsSkeleton } = renderBrowseProductsPage();

    expect(getProductsSkeleton()).toBeInTheDocument();
  });

  it("should remove <Products skeleton> after data is fetched", async () => {
    simulateRequestDelay("/products");

    const { getProductsSkeleton } = renderBrowseProductsPage();

    await waitForElementToBeRemoved(getProductsSkeleton);
  });

  it("should render <Null> if <Category> fetch failed", async () => {
    simulateRequestError("/categories");

    const { getCategoriesSkeleton, getCategoriesSelect } =
      renderBrowseProductsPage();

    await waitForElementToBeRemoved(getCategoriesSkeleton);

    expect(screen.queryByText(errorText)).not.toBeInTheDocument();
    expect(getCategoriesSelect()).not.toBeInTheDocument();
  });

  it("should render <Error> if <Products> fetch failed", async () => {
    simulateRequestError("/products");

    renderBrowseProductsPage();

    expect(await screen.findByText(errorText)).toBeInTheDocument();
  });

  it("should render <Category combobox> if fetched success", async () => {
    renderBrowseProductsPage();

    expect(await screen.findByRole("combobox")).toBeInTheDocument();
  });

  it("should render <Category dropdown> on click", async () => {
    const dbCategories = db.category.getAll();

    const { getCategoriesSkeleton, getCategoriesSelect } =
      renderBrowseProductsPage();

    await waitForElementToBeRemoved(getCategoriesSkeleton);

    const categoriesSelect = getCategoriesSelect();
    categoriesSelect && (await userEvent.click(categoriesSelect));

    expect(
      screen.getByRole("option", { name: allOptionText })
    ).toBeInTheDocument();

    dbCategories.forEach((dbCategory) => {
      expect(
        screen.getByRole("option", { name: dbCategory.name })
      ).toBeInTheDocument();
    });
  });

  it("should render <Product list> if fetched success", async () => {
    const dbProducts = db.product.getAll();

    const { getProductsSkeleton } = renderBrowseProductsPage();

    await waitForElementToBeRemoved(getProductsSkeleton);

    dbProducts.forEach((dbProduct) => {
      expect(
        screen.getByRole("cell", { name: dbProduct.name })
      ).toBeInTheDocument();
    });
  });

  it("should render <Products> only from selected <Category>", async () => {
    const { selectCategory, expectProductsToBeInTheDocument } =
      renderBrowseProductsPage();

    const selectedCategory = db.category.getAll()[0];
    await selectCategory(selectedCategory.name);

    const selectedProducts = getProductsByCategoryId(selectedCategory.id);
    expectProductsToBeInTheDocument(selectedProducts);
  });

  it("should render all <Products> if selected <Category> is 'All'", async () => {
    const { selectCategory, expectProductsToBeInTheDocument } =
      renderBrowseProductsPage();

    await selectCategory(allOptionText);

    const selectedProducts = db.product.getAll();
    expectProductsToBeInTheDocument(selectedProducts);
  });
});

const renderBrowseProductsPage = () => {
  const wrapper = ({ children }: PropsWithChildren) => (
    <Theme>
      <CartProvider>{children}</CartProvider>
    </Theme>
  );

  render(<BrowseProductsPage />, { wrapper });

  const getCategoriesSkeleton = () =>
    screen.queryByRole(categoriesSkeleton.role, {
      name: categoriesSkeleton.name
    });

  const getProductsSkeleton = () =>
    screen.queryByRole(productsSkeleton.role, {
      name: productsSkeleton.name
    });

  const getCategoriesSelect = () => screen.queryByRole("combobox");

  const selectCategory = async (name: string | RegExp) => {
    await waitForElementToBeRemoved(getCategoriesSkeleton);

    const categoriesSelect = getCategoriesSelect();
    categoriesSelect && (await userEvent.click(categoriesSelect));

    const firstOption = screen.queryByRole("option", { name });
    firstOption && (await userEvent.click(firstOption));
  };

  const expectProductsToBeInTheDocument = (products: Product[]) => {
    const rows = screen.getAllByRole("row");
    const productRows = rows.slice(1);
    expect(productRows).toHaveLength(products.length);

    products.forEach((product) =>
      expect(screen.getByText(product.name)).toBeInTheDocument()
    );
  };

  return {
    getCategoriesSkeleton,
    getProductsSkeleton,
    getCategoriesSelect,
    selectCategory,
    expectProductsToBeInTheDocument
  };
};
