import { render, screen } from "@testing-library/react";
import type { ComponentProps } from "react";
import UserAccount from "./UserAccount";

describe("UserAccount", () => {
  it("should render page header", () => {
    const user = getUser();
    const { pageHeaderElement } = renderUserAccount({ user });

    expect(pageHeaderElement).toBeInTheDocument();
  });

  it("should render user name", () => {
    const user = getUser();
    const { getNameElement } = renderUserAccount({ user });

    expect(getNameElement(user.name)).toBeInTheDocument();
  });

  it("should not render Edit button for user", () => {
    const user = getUser();
    const { getEditButton } = renderUserAccount({ user });

    expect(getEditButton()).not.toBeInTheDocument();
  });

  it("should render Edit button for admin", () => {
    const user = getUser({ isAdmin: true });
    const { getEditButton } = renderUserAccount({ user });

    expect(getEditButton()).toBeInTheDocument();
  });
});

type GetUserParams = { isAdmin?: boolean };

const getUser = ({ isAdmin = false }: GetUserParams = {}) => ({
  id: 0,
  name: "Elijah",
  isAdmin
});

type UserAccountProps = ComponentProps<typeof UserAccount>;
type User = UserAccountProps["user"];

const renderUserAccount = (props: UserAccountProps) => {
  render(<UserAccount {...props} />);

  return {
    pageHeaderElement: screen.getByRole("heading", { name: /profile/i }),
    getNameElement: (name: User["name"]) => screen.getByText(name),
    getEditButton: () => screen.queryByRole("button", { name: /edit/i })
  };
};
