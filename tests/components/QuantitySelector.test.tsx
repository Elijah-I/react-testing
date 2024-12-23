import QuantitySelector from "@/components/QuantitySelector";
import type { Product } from "@/entities";
import { CartProvider } from "@/providers/CartProvider";
import type { PropsWithChildren } from "react";
import { db } from "../mocks";

describe("QuantitySelector", () => {
  let product: Product;

  beforeAll(() => {
    product = db.product.create();
  });

  afterAll(() => {
    db.product.delete({ where: { id: { equals: product.id } } });
  });

  it("should render Add to Cart button", () => {
    const { getControls } = renderQuantitySelector(product);

    const { addToCartButton } = getControls();
    expect(addToCartButton).toBeInTheDocument();
  });

  it("should render Amount and Minus, Plus buttons on Add to Cart click", async () => {
    const { getControls, addToCart } = renderQuantitySelector(product);

    await addToCart();

    const { status, minusButton, plusButton, addToCartButton } = getControls();
    expect(minusButton).toBeInTheDocument();
    expect(plusButton).toBeInTheDocument();
    expect(status).toHaveTextContent("1");
    expect(addToCartButton).not.toBeInTheDocument();
  });

  it("should increment amount on Plus click", async () => {
    const { getControls, addToCart, increaseQuantity } =
      renderQuantitySelector(product);
    await addToCart();

    await increaseQuantity();

    const { status } = getControls();
    expect(status).toHaveTextContent("2");
  });

  it("should decrement amount on Minus click", async () => {
    const { getControls, addToCart, increaseQuantity, decreaseQuantity } =
      renderQuantitySelector(product);
    await addToCart();

    await increaseQuantity();
    await decreaseQuantity();

    const { status } = getControls();
    expect(status).toHaveTextContent("1");
  });

  it("should render Add to Cart button if amount is 0", async () => {
    const { getControls, addToCart, decreaseQuantity } =
      renderQuantitySelector(product);
    await addToCart();

    await decreaseQuantity();

    const { status, minusButton, plusButton, addToCartButton } = getControls();
    expect(addToCartButton).toBeInTheDocument();
    expect(status).not.toBeInTheDocument();
    expect(minusButton).not.toBeInTheDocument();
    expect(plusButton).not.toBeInTheDocument();
  });
});

const renderQuantitySelector = (product: Product) => {
  const wrapper = ({ children }: PropsWithChildren) => {
    return <CartProvider children={children} />;
  };

  render(<QuantitySelector product={product} />, { wrapper });

  const getControls = () => ({
    addToCartButton: screen.queryByRole("button", { name: /add to cart/i }),
    plusButton: screen.queryByRole("button", { name: "+" }),
    minusButton: screen.queryByRole("button", { name: "-" }),
    status: screen.queryByRole("status")
  });

  const addToCart = async () => {
    const { addToCartButton } = getControls();
    addToCartButton && (await userEvent.click(addToCartButton));
  };

  const increaseQuantity = async () => {
    const { plusButton } = getControls();
    plusButton && (await userEvent.click(plusButton));
  };

  const decreaseQuantity = async () => {
    const { minusButton } = getControls();
    minusButton && (await userEvent.click(minusButton));
  };

  return {
    getControls,
    addToCart,
    increaseQuantity,
    decreaseQuantity
  };
};
