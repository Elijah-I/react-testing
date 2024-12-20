import ProductForm from "@/components/ProductForm";
import type { Category, Product } from "@/entities";
import { Theme } from "@radix-ui/themes";
import type { PropsWithChildren } from "react";
import { Toaster } from "react-hot-toast";
import { db, ProductFormMock } from "../mocks";
import { QueryClientProvider } from "../providers";

const { formSelectors } = ProductFormMock;

describe("ProductForm", () => {
  let product: Product;
  let category: Category;

  beforeAll(() => {
    category = db.category.create({ name: "ProductFormCategory" });
    product = db.product.create({ categoryId: category.id });
  });

  afterAll(() => {
    db.category.delete({ where: { id: { equals: category.id } } });
    db.product.delete({ where: { id: { equals: product.id } } });
  });

  it("should render form fields", async () => {
    const { waitForFormToLoad } = renderProductForm();

    const { nameInput, priceInput, categoryInput } = await waitForFormToLoad();

    expect(nameInput).toBeInTheDocument();
    expect(priceInput).toBeInTheDocument();
    expect(categoryInput).toBeInTheDocument();
  });

  it("should render correct categories", async () => {
    const dbCategories = db.category.getAll();
    const { getOptions, waitForFormToLoad } = renderProductForm();

    const { categoryInput } = await waitForFormToLoad();
    await userEvent.click(categoryInput);
    const options = getOptions();

    expect(options.all.length).toEqual(dbCategories.length);
    dbCategories.forEach((dbCategory) => {
      expect(options.byName(dbCategory.name)).toBeInTheDocument();
    });
  });

  it("should render correct initial data", async () => {
    const { waitForFormToLoad } = renderProductForm(product);

    const { nameInput, priceInput, categoryInput } = await waitForFormToLoad();

    expect(nameInput).toHaveValue(product.name);
    expect(priceInput).toHaveValue(String(product.price));
    expect(categoryInput).toHaveTextContent(category.name);
  });

  it("should put focus on name field at start", async () => {
    const { waitForFormToLoad } = renderProductForm(product);

    const { nameInput } = await waitForFormToLoad();

    expect(nameInput).toHaveFocus();
  });

  it.each([
    {
      scenario: "missing",
      errorMessage: formSelectors.name.missingError
    },
    {
      scenario: "too long",
      name: "a".repeat(256),
      errorMessage: formSelectors.name.tooLongError
    }
  ])(
    "should display an error if name is $scenario",
    async ({ errorMessage, name }) => {
      const { waitForFormToLoad, expectErrorToHaveTextContent } =
        renderProductForm();

      const form = await waitForFormToLoad();
      await form.fill({ ...product, name });
      await userEvent.click(form.submitButton);

      expectErrorToHaveTextContent(errorMessage);
    }
  );

  it.each([
    {
      scenario: "missing",
      errorMessage: formSelectors.price.missingError
    },
    {
      scenario: "0",
      price: 0,
      errorMessage: formSelectors.price.tooSmallError
    },
    {
      scenario: "negative",
      price: -1,
      errorMessage: formSelectors.price.tooSmallError
    },
    {
      scenario: "too big",
      price: 1001,
      errorMessage: formSelectors.price.tooBigError
    },
    {
      scenario: "not a number",
      price: "a",
      errorMessage: formSelectors.price.missingError
    }
  ])(
    "should display an error if price is $scenario",
    async ({ errorMessage, price }) => {
      const { waitForFormToLoad, expectErrorToHaveTextContent } =
        renderProductForm();

      const form = await waitForFormToLoad();
      await form.fill({ ...product, price });
      await userEvent.click(form.submitButton);

      expectErrorToHaveTextContent(errorMessage);
    }
  );

  it("should call onSubmit with correct data on form submit", async () => {
    const { waitForFormToLoad, onSubmit } = renderProductForm();

    const form = await waitForFormToLoad();
    await form.fill(product);
    await userEvent.click(form.submitButton);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...callProduct } = JSON.parse(
      JSON.stringify(product)
    ) as Product;

    expect(onSubmit).toHaveBeenCalledOnce();
    expect(onSubmit).toHaveBeenCalledWith(callProduct);
  });

  it("should show error toast if submitting fails", async () => {
    const { waitForFormToLoad, onSubmit, getToast } = renderProductForm();

    onSubmit.mockRejectedValue({});
    const form = await waitForFormToLoad();
    await form.fill(product);
    await userEvent.click(form.submitButton);
    const toast = await getToast();

    expect(toast).toBeInTheDocument();
    expect(toast).toHaveTextContent(formSelectors.submit.failError);
  });

  it("should disable submit button while submitting", async () => {
    const { waitForFormToLoad, onSubmit } = renderProductForm();

    onSubmit.mockResolvedValue(new Promise(() => {}));
    const form = await waitForFormToLoad();
    await form.fill(product);
    await userEvent.click(form.submitButton);

    expect(form.submitButton).toBeDisabled();
  });

  it("should re-enable submit button after submitting", async () => {
    const { waitForFormToLoad, onSubmit } = renderProductForm();

    onSubmit.mockResolvedValue({});
    const form = await waitForFormToLoad();
    await form.fill(product);
    await userEvent.click(form.submitButton);

    expect(form.submitButton).toBeEnabled();
  });

  it("should re-enable submit button if submitting fails", async () => {
    const { waitForFormToLoad, onSubmit } = renderProductForm();

    onSubmit.mockRejectedValue({});
    const form = await waitForFormToLoad();
    await form.fill(product);
    await userEvent.click(form.submitButton);

    expect(form.submitButton).toBeEnabled();
  });
});

const renderProductForm = (product?: Product) => {
  const onSubmit = vi.fn();

  const wrapper = ({ children }: PropsWithChildren) => (
    <Theme>
      <QueryClientProvider>{children}</QueryClientProvider>
    </Theme>
  );

  render(
    <>
      <ProductForm onSubmit={onSubmit} product={product} />
      <Toaster />
    </>,
    { wrapper }
  );

  const getOptions = () => ({
    all: screen.getAllByRole("option"),
    byName: (name: string) => screen.getByRole("option", { name }),
    byId: (id: number) =>
      screen.getByRole("option", {
        name: db.category.findFirst({ where: { id: { equals: id } } })?.name
      })
  });

  return {
    onSubmit,
    expectErrorToHaveTextContent: (errorMessage: RegExp) =>
      expect(screen.getByRole("alert")).toHaveTextContent(errorMessage),
    getOptions,
    getToast: async () => await screen.findByRole("status"),
    waitForFormToLoad: async () => {
      await screen.findByRole("form");

      const nameInput = screen.getByPlaceholderText(formSelectors.name.label);
      const priceInput = screen.getByPlaceholderText(formSelectors.price.label);
      const categoryInput = screen.getByRole("combobox", {
        name: formSelectors.category.label
      });

      return {
        nameInput,
        priceInput,
        categoryInput,
        submitButton: screen.getByRole("button", {
          name: formSelectors.submit.label
        }),
        fill: async (product: { [key in keyof Product]: unknown }) => {
          product.name !== undefined && nameInput.focus();
          product.name !== undefined &&
            (await userEvent.paste(String(product.name)));

          product.price !== undefined && priceInput.focus();
          product.price !== undefined &&
            (await userEvent.paste(String(product.price)));

          product.categoryId !== undefined && (await userEvent.tab());
          product.categoryId !== undefined &&
            (await userEvent.click(categoryInput));
          product.categoryId !== undefined &&
            (await userEvent.click(
              getOptions().byId(Number(product.categoryId))
            ));
        }
      };
    }
  };
};
