import UserList from "@/components/UserList";
import {
  emptyPlaceholderText,
  emptyUsers,
  userLink,
  users
} from "../mocks/UserList.mock";
import { ComponentProps } from "react";

describe("UserList", () => {
  const renderComponent = (props: ComponentProps<typeof UserList>) => {
    render(<UserList {...props} />);

    return {
      emptyPlaceholder: screen.queryByText(emptyPlaceholderText),
      userItems: screen.queryAllByRole("link")
    };
  };

  it("should render <empty placeholder> when <users> is empty", () => {
    const { emptyPlaceholder } = renderComponent({ users: emptyUsers });

    expect(emptyPlaceholder).toBeInTheDocument();
  });

  it("should not render <empty placeholder> when <users> is not empty", () => {
    const { emptyPlaceholder } = renderComponent({ users });

    expect(emptyPlaceholder).not.toBeInTheDocument();
  });

  it("should render <users components> with correct links when <users> is not empty", () => {
    const { userItems } = renderComponent({ users });

    expect(userItems).toHaveLength(users.length);

    users.forEach((user, order) => {
      const userItem = userItems[order];

      expect(userItem).toBeInTheDocument();
      expect(userItem).toHaveAttribute("href", userLink(user.id));
    });
  });
});
