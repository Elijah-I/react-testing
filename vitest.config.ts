import { resolve } from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    alias: { "@": resolve(__dirname, "./src") },
    setupFiles: [
      "./tests/setupFiles/vitest.setup.ts",
      "./tests/setupFiles/global.testing.library.ts"
    ],
    coverage: {
      enabled: true,
      provider: "istanbul",
      reportsDirectory: "./tests/coverage",
      reporter: ["html"],
      include: ["src/components/**", "src/pages/**"],
      exclude: ["src/pages/admin/**"]
    }
  }
});
