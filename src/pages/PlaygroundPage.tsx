import ProductForm from "@/components/ProductForm";

const PlaygroundPage = () => {
  return (
    <ProductForm
      onSubmit={(data) => {
        return new Promise((res) => {
          console.log(data);
          res();
        });
      }}
    />
  );
};

export default PlaygroundPage;
