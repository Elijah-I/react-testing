import AuthStatus from "@/components/AuthStatus";
import { mockAuthState } from "../mocks";

describe("AuthStatus", () => {
  it("should show loading while defining user status", () => {
    const authState = {
      isAuthenticated: false,
      isLoading: true,
      user: undefined
    };
    mockAuthState(authState);
    const { getLoader } = renderAuthStatus();

    expect(getLoader()).toBeInTheDocument();
  });

  it("should show LogoutButton and userName if user is logged in", () => {
    const authState = {
      isAuthenticated: true,
      isLoading: false,
      user: { name: "userName" }
    };
    mockAuthState(authState);
    const { getUserControls, getGuestControls } = renderAuthStatus();
    const { logoutButton, userName } = getUserControls(authState.user.name);
    const { loginButton } = getGuestControls();

    expect(userName).toBeInTheDocument();
    expect(logoutButton).toBeInTheDocument();
    expect(loginButton).not.toBeInTheDocument();
  });

  it("should show LoginButton user is logged out", () => {
    const authState = {
      isAuthenticated: false,
      isLoading: false,
      user: undefined
    };
    mockAuthState(authState);
    const { getUserControls, getGuestControls } = renderAuthStatus();
    const { logoutButton } = getUserControls();
    const { loginButton } = getGuestControls();

    expect(loginButton).toBeInTheDocument();
    expect(logoutButton).not.toBeInTheDocument();
  });
});

const renderAuthStatus = () => {
  render(<AuthStatus />);

  const getLoader = () => screen.getByText(/loading/i);

  return {
    getLoader,
    getUserControls: (userName?: string) => ({
      userName: userName && screen.queryByText(userName),
      logoutButton: screen.queryByRole("button", { name: /log out/i })
    }),
    getGuestControls: () => ({
      loginButton: screen.queryByRole("button", { name: /log in/i })
    })
  };
};
