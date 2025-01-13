import { render, screen } from "@testing-library/react";
import type { ComponentProps } from "react";
import UserList from "./UserList";

describe("UserList", () => {
  it("should render placeholder if no users passed", () => {
    const users = getUsers(0);

    const { emptyPlaceholderElement } = renderUserList({ users });

    expect(emptyPlaceholderElement).toBeInTheDocument();
  });

  it("should not render placeholder if users passed", () => {
    const users = getUsers(2);

    const { emptyPlaceholderElement } = renderUserList({ users });

    expect(emptyPlaceholderElement).not.toBeInTheDocument();
  });

  it("should not render user list", () => {
    const users = getUsers(2);

    const { getUserElements, getUserElementByName } = renderUserList({ users });

    expect(getUserElements().length).toEqual(users.length);
    users.forEach((user) =>
      expect(getUserElementByName(user.name)).toHaveAttribute(
        "href",
        `/users/${user.id}`
      )
    );
  });
});

const getUsers = (amount: number): User[] =>
  Array(amount)
    .fill(0)
    .map((_, id) => ({
      id,
      name: `user_${id}`,
      isAdmin: Boolean(id % 2)
    }));

type UserListProps = ComponentProps<typeof UserList>;
type User = UserListProps["users"][number];

const renderUserList = (props: UserListProps) => {
  render(<UserList {...props} />);

  return {
    emptyPlaceholderElement: screen.queryByText(/no users/i),
    getUserElements: () => screen.getAllByRole("link"),
    getUserElementByName: (name: User["name"]) =>
      screen.getByRole("link", { name })
  };
};
