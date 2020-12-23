module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+.(ts|tsx)$": "ts-jest",
  },
  testPathIgnorePatterns: ["/node_modules/"],
  watchPathIgnorePatterns: ["<rootDir>/temp"],
  collectCoverageFrom: ["**/src/**/*.{ts,tsx}", "!**/node_modules/**", "!**/__tests__/**"],
  coverageDirectory: "./__coverage__",
  testRegex: "(<rootDir>/**/__test__/.*|(\\.|/)(test|spec))\\.tsx?$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};
