module.exports = {
  overrides: [
    {
      files: ["*.js"],
      parser: "babel-eslint",
    },
    {
      files: ["*.ts"],
      extends: ["plugin:@typescript-eslint/recommended", "prettier/@typescript-eslint", "plugin:prettier/recommended"],
      parser: "@typescript-eslint/parser",
      plugins: ["@typescript-eslint/eslint-plugin"],
    },
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
  rules: {
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
  },
};
