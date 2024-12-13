import type { Category } from "@/entities";
import { useState } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import { CategorySelect } from "./CategorySelect";
import { ProductTable } from "./ProductTable";

function BrowseProducts() {
  const [selectedCategoryId, setSelectedCategoryId] = useState<
    Category["id"] | undefined
  >();

  return (
    <div>
      <h1>Products</h1>
      <div className="max-w-xs">
        <CategorySelect onChange={setSelectedCategoryId} />
      </div>
      <ProductTable selectedCategoryId={selectedCategoryId} />
    </div>
  );
}

export default BrowseProducts;
