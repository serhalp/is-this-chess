/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ["eslint:recommended", "prettier", "plugin:astro/recommended"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    tsconfigRootDir: __dirname,
    sourceType: "module",
    ecmaVersion: "latest",
  },
  env: {
    es2024: true,
  },
  overrides: [
    {
      files: ["*.astro"],
      plugins: ["astro"],
      parser: "astro-eslint-parser",
      parserOptions: {
        parser: "@typescript-eslint/parser",
        extraFileExtensions: [".astro"],
        sourceType: "module",
      },
    },
    {
      files: ["*.{cjs,cts}"],
      env: {
        commonjs: true,
      },
    },
    {
      files: [".*rc.*", "*.config.*"],
      env: {
        node: true,
      },
    },
  ],
};
