module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:react-hooks/recommended"
  ],
  parserOptions: {
    project: true,
    projectService: true,
    tsconfigRootDir: __dirname
  },
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh"],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true }
    ],
    "@typescript-eslint/consistent-type-imports": "error"
    // include: ["vite.config.ts", "vitest.config.ts"],
    // ignores: ["**/node_modules/", "**/dist/"]
  }
};
