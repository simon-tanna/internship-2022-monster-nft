// jest.config.js
const nextJest = require("next/jest");

const createJestConfig = nextJest({ dir: "./" });

const customJestConfig = {
	setupFilesAfterEnv: ["<rootDir>/jest.setup.js"], // we use this to extend jest's expect api for DOM querying
	testEnvironment: "jest-environment-jsdom", // Configure that the tests run in a DOM environment
};

// createJestConfig is exported in this way to ensure that next/jest can load the Next.js configuration, which is async
module.exports = createJestConfig(customJestConfig);
