module.exports = {
  extends: [
    'next',
    'next/core-web-vitals',
    'eslint:recommended',
    'plugin:jest/recommended',
    'plugin:jest-dom/recommended',
    'plugin:jest/style',
    'eslint-config-prettier',
  ],
  parser: '@typescript-eslint/parser',
  globals: {
    React: 'readonly',
  },
  parserOptions: {
    project: './tsconfig.json',
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  overrides: [
    {
      // 3) Now we enable eslint-plugin-testing-library rules or preset only for matching files!
      files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
      extends: ['plugin:testing-library/react'],
    },
  ],
  ignorePatterns: ['.eslintrc.js', '**/*.config.js', 'prisma/**/*.js'],
  plugins: ['react', '@typescript-eslint'],
  rules: {
    '@typescript-eslint/no-unsafe-assignment': 'off',
    'react/no-unknown-property': 0,
    'no-unused-vars': [1, { args: 'after-used', varsIgnorePattern: '^_' }],
    'react/no-unescaped-entities': 0,
    // "linebreak-style": ["error", "unix"],
    // "semi": ["error", "always"],
    'no-console': 'off',
    'react/no-unknown-property': 0,
    'no-unsafe-optional-chaining': 0,
    '@typescript-eslint/no-unsafe-call': 'off',
    'testing-library/no-render-in-setup': [
      'error',
      { allowTestingFrameworkSetupHook: 'beforeEach' },
    ],
  },
};
