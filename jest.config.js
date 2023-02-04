const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      tsconfig: './tsconfig.jest.json',
    },
  },
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['./src/jest.setup.ts'],
  transformIgnorePatterns: ['./node_modules/react-merge-refs/'],
  moduleNameMapper: {
    // Handle module aliases (this will be automatically configured for you soon)
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@icons/(.*)$': '<rootDir>/src/icons/$1',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@helpers/(.*)$': '<rootDir>/src/helpers/$1',
    '^@styles/(.*)$': '<rootDir>/src/styles/$1',
    '^@hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^@services/(.*)$': '<rootDir>/src/services/$1',
    '^@validations/(.*)$': '<rootDir>/src/validations/$1',
    '^@providers/(.*)$': '<rootDir>/src/providers/$1',
    '^@pages/(.*)$': '<rootDir>/src/pages/$1',
    '^@lib/(.*)$': '<rootDir>/src/lib/$1',
  },
  testMatch: [
    '**/src/__tests__/**/*.[jt]s?(x)',
    '**/src/**/?(*.)+(spec|test).[jt]s?(x)',
    '!**/.history/**',
    '!**/node_modules/**',
  ],
  collectCoverageFrom: [
    './src/**/*.{js,jsx,ts,tsx}',
    '!./src/**/__*.{js,jsx,ts,tsx}',
    '!**/.history/**',
    '!**/*.d.ts',
    '!**/node_modules/**',
  ],
  coverageThreshold: {
    global: {
      branches: 30,
      functions: 30,
      lines: 30,
      statements: 30,
    },
  },
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
