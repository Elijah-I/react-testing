import type { Product } from "@/entities";
import { db, mockAuthState, navigateTo } from "../mocks";

describe("Router", () => {
  let product: Product;

  beforeAll(() => {
    product = db.product.create();

    mockAuthState({
      isAuthenticated: false,
      isLoading: false,
      user: undefined
    });
  });

  afterAll(() => {
    db.product.delete({ where: { id: { equals: product.id } } });
  });

  it("should render home page on route /", () => {
    navigateTo("/");

    expect(screen.getByRole("heading", { name: /home/i })).toBeInTheDocument();
  });

  it("should render products page on route /products", () => {
    navigateTo("/products");

    expect(
      screen.getByRole("heading", { name: /products/i })
    ).toBeInTheDocument();
  });

  it("should render productsDetail page on route /products/:id", async () => {
    navigateTo(`/products/${product.id}`);

    expect(
      await screen.findByRole("heading", { name: product.name })
    ).toBeInTheDocument();
  });

  it("should render 404 page on invalid route", () => {
    navigateTo("/invalid-route");

    expect(screen.getByText(/oops/i)).toBeInTheDocument();
  });

  it("should render admin page for route /admin", () => {
    navigateTo("/admin");

    expect(screen.getByRole("heading", { name: /admin/i })).toBeInTheDocument();
  });
});
