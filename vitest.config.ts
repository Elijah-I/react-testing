import { resolve } from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    alias: { "@": resolve(__dirname, "./src") },
    environment: "jsdom"
  }
});