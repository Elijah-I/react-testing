import UserAccount from "@/components/UserAccount";
import { admin, editButtonText, user } from "../mocks/UserAccount.mock";

describe("UserAccount", () => {
  it("should render <user.name> if <!user.isAdmin>", () => {
    render(<UserAccount user={user} />);
    expect(screen.getByText(user.name)).toBeInTheDocument();
  });
});

describe("UserAccount", () => {
  it("should not render <edit button> if <!user.isAdmin>", () => {
    render(<UserAccount user={user} />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
});

describe("UserAccount", () => {
  it("should render <user.name> if <user.isAdmin>", () => {
    render(<UserAccount user={admin} />);
    expect(screen.getByText(admin.name)).toBeInTheDocument();
  });
});

describe("UserAccount", () => {
  it("should render <edit button> if <user.isAdmin>", () => {
    render(<UserAccount user={admin} />);

    const editButton = screen.getByRole("button");

    expect(editButton).toBeInTheDocument();
    expect(editButton).toHaveTextContent(editButtonText);
  });
});
