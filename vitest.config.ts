import { resolve } from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    alias: { "@": resolve(__dirname, "./src") },
    setupFiles: ["tests/setupFiles/vitest.config.ts"],
    coverage: {
      enabled: true,
      provider: "istanbul",
      reportsDirectory: "./coverage",
      reporter: ["html"],
      include: ["src/components/**", "src/pages/**"],
      exclude: ["src/pages/admin/**"]
    }
  }
});
