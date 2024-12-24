import routes from "@/routes";
import { createMemoryRouter, RouterProvider } from "react-router-dom";

export const navigateTo = (path: string) => {
  const router = createMemoryRouter(routes, { initialEntries: [path] });
  render(<RouterProvider router={router} />);
};
