//?Link https://kulshekhar.github.io/ts-jest/docs/getting-started/paths-mapping/
//?Link https://nextjs.org/docs/testing

const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

/** @type {import('ts-jest').JestConfigWithTsJest} */
const customJestConfig = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  globals: {
    'ts-jest': {
      tsconfig: './tsconfig.jest.json',
    },
  },

  setupFilesAfterEnv: ['./src/jest.setup.ts'],

  // if using TypeScript with a baseUrl set to the root directory
  // then you need the below for alias' to work
  moduleNameMapper: {
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@interfaces/(.*)$': '<rootDir>/src/interfaces/$1',
    '^@helpers/(.*)$': '<rootDir>/src/helpers/$1',
    '^@styles/(.*)$': '<rootDir>/src/styles/$1',
    '^@hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^@services/(.*)$': '<rootDir>/src/services/$1',
    '^icons/(.*)$': '<rootDir>/src/components/icons/$1',
    '^@validations/(.*)$': '<rootDir>/src/validations/$1',
    '^@app-providers/(.*)$': '<rootDir>/src/app-providers/$1',
    '^@pages/(.*)$': '<rootDir>/src/pages/$1',
    '^@server/(.*)$': '<rootDir>/src/server/$1',
    '^@api-providers/(.*)$': '<rootDir>/src/api-providers/$1',
  },

  moduleDirectories: ['node_modules', 'src'],

  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
