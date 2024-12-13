import type { Category } from "@/entities";
import { Select } from "@radix-ui/themes";
import type { AxiosError } from "axios";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import { useQuery } from "react-query";

type Props = {
  onChange: (categoryId: Category["id"]) => void;
};

export const CategorySelect = ({ onChange }: Props) => {
  const {
    data: categories,
    isLoading: isCategoriesLoading,
    error: errorCategories
  } = useQuery<Category[], AxiosError>({
    queryKey: ["CATEGORIES"],
    queryFn: () =>
      axios.get<Category[]>("/categories").then((response) => response.data)
  });

  if (isCategoriesLoading)
    return (
      <div role="progressbar" aria-label="Loading categories">
        <Skeleton />
      </div>
    );

  if (errorCategories) return null;

  return (
    <Select.Root onValueChange={(value) => onChange(parseInt(value))}>
      <Select.Trigger placeholder="Filter by Category" />
      <Select.Content>
        <Select.Group>
          <Select.Label>Category</Select.Label>
          <Select.Item value="all">All</Select.Item>
          {categories?.map((category) => (
            <Select.Item key={category.id} value={category.id.toString()}>
              {category.name}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};
