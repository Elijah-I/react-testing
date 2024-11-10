import UserList from "@/components/UserList";
import {
  emptyPlaceholderText,
  emptyUsers,
  userLink,
  users
} from "../mocks/UserList.mock";

describe("UserList", () => {
  it("should render <empty placeholder> when <users> is empty", () => {
    render(<UserList users={emptyUsers} />);
    expect(screen.getByText(emptyPlaceholderText)).toBeInTheDocument();
  });

  it("should not render <empty placeholder> when <users> is not empty", () => {
    render(<UserList users={users} />);
    expect(screen.queryByText(emptyPlaceholderText)).not.toBeInTheDocument();
  });

  it("should render <users components> with correct links when <users> is not empty", () => {
    render(<UserList users={users} />);

    users.forEach((user) => {
      const userItem = screen.getByRole("link", { name: user.name });

      expect(userItem).toBeInTheDocument();
      expect(userItem).toHaveAttribute("href", userLink(user.id));
    });
  });
});
