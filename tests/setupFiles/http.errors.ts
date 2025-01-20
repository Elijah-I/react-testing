const originalConsoleError = console.error;

beforeAll(() => {
  console.error = (message: unknown, ...args: unknown[]) => {
    if (typeof message === "string" && message.includes("HTTP error")) {
      return;
    }

    originalConsoleError(message, ...args);
  };
});

afterAll(() => (console.error = originalConsoleError));
