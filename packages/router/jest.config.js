module.exports = {
  testEnvironment: "node",
  preset: "ts-jest",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  testMatch: ["<rootDir>/tests/**/*.(ts|tsx)"],
  testPathIgnorePatterns: ["<rootDir>/tests/fixtures"],
  coveragePathIgnorePatterns: ["<rootDir>/tests/"],
};
