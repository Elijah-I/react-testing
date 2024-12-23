import CategoryList from "@/components/CategoryList";
import ReduxProvider from "@/providers/ReduxProvider";
import type { PropsWithChildren } from "react";
import { db, simulateRequestDelay, simulateRequestError } from "../mocks";
import { QueryClientProvider } from "../providers";

describe("CategoryList", () => {
  it("should render categories list", async () => {
    const dbCategories = db.category.getAll();
    const { waitForLoaderRemoved, getCategories, getCategoryByName } =
      renderCategoryList();

    await waitForLoaderRemoved();

    const categories = getCategories();
    expect(categories.length).toEqual(dbCategories.length);
    dbCategories.forEach((dbCategory) =>
      expect(getCategoryByName(categories, dbCategory.name)).toBeInTheDocument()
    );
  });

  it("should show loader while fetching categories", () => {
    simulateRequestDelay("/categories");

    const { getLoader } = renderCategoryList();

    expect(getLoader()).toBeInTheDocument();
  });

  it("should render an error if fetching categories fails", async () => {
    simulateRequestError("/categories");

    const { getError } = renderCategoryList();

    expect(await getError()).toBeInTheDocument();
  });
});

const renderCategoryList = () => {
  const wrapper = ({ children }: PropsWithChildren) => (
    <ReduxProvider>
      <QueryClientProvider children={children} />
    </ReduxProvider>
  );
  render(<CategoryList />, { wrapper });

  const getLoader = () => screen.getByText(/loading/i);
  const getError = async () => await screen.findByText(/error/i);

  return {
    getError,
    getLoader,
    waitForLoaderRemoved: async () =>
      await waitForElementToBeRemoved(getLoader()),
    getCategoryByName: (categories: HTMLElement[], name: string) =>
      categories.find((category) => category.textContent === name),
    getCategories: () => screen.getAllByRole("listitem")
  };
};
