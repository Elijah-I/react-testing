import UserAccount from "@/components/UserAccount";
import { ComponentProps } from "react";
import { UserAccountMock } from "../mocks";

const { admin, editButtonText, user } = UserAccountMock;

describe("UserAccount", () => {
  const renderComponent = (props: ComponentProps<typeof UserAccount>) => {
    render(<UserAccount {...props} />);

    return {
      userName: screen.getByText(props.user.name),
      editButton: screen.queryByRole("button", { name: editButtonText })
    };
  };

  it("should render <user.name> without <edit button> if <!user.isAdmin>", () => {
    const { userName, editButton } = renderComponent({ user });

    expect(userName).toBeInTheDocument();
    expect(editButton).not.toBeInTheDocument();
  });

  it("should render <user.name> with <edit button> if <user.isAdmin>", () => {
    const { userName, editButton } = renderComponent({ user: admin });

    expect(userName).toBeInTheDocument();
    expect(editButton).toBeInTheDocument();
  });
});
