import axios, { type AxiosError } from "axios";
import { useQuery } from "react-query";
import type { Product } from "../entities";

const ProductDetail = ({ productId }: { productId: number }) => {
  const {
    data: product,
    isLoading,
    error
  } = useQuery<Product, AxiosError>({
    queryKey: ["products", productId],
    queryFn: () =>
      axios
        .get<Product>(`/products/${productId}`)
        .then((response) => response.data)
  });

  if (isLoading) return <div>Loading...</div>;

  if (error && error?.response?.status !== 404)
    return <div>Error: {error.status}</div>;

  if (!product) return <div>The given product was not found.</div>;

  return (
    <div>
      <h1>Product Detail</h1>
      <div>Name: {product.name}</div>
      <div>Price: ${product.price}</div>
    </div>
  );
};

export default ProductDetail;
