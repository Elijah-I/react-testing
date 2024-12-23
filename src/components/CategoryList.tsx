import type { Category } from "@/entities";
import type { AxiosError } from "axios";
import axios from "axios";
import { useQuery } from "react-query";

function CategoryList() {
  const {
    data: categories = [],
    isFetching: loading,
    error
  } = useQuery<Category[], AxiosError>({
    queryKey: "SELECT_CATEGORIES",
    queryFn: async () => {
      const { data } = await axios.get<Category[]>("/categories");
      return data;
    }
  });

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>Category List</h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {categories.map((category) => (
            <li key={category.id}>{category.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CategoryList;
