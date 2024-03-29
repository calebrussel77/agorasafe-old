/** @type {import("prettier").Config} */
module.exports = {
  trailingComma: 'es5',
  tabWidth: 2,
  semi: true,
  singleQuote: true,
  printWidth: 80,
  arrowParens: 'avoid',
  bracketSpacing: true,
  endOfLine: 'lf',
  htmlWhitespaceSensitivity: 'css',
  insertPragma: false,
  bracketSameLine: false,
  jsxSingleQuote: false,
  proseWrap: 'always',
  quoteProps: 'as-needed',
  requirePragma: false,
  useTabs: false,
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrder: [
    '^@components/(.*)$',
    '^@validations/(.*)$',
    '^@pages/(.*)$',
    '^@helpers/(.*)$',
    '^@interfaces/(.*)$',
    '^@utils/(.*)$',
    '^@server/(.*)$',
    '^@hooks/(.*)$',
    '^@constants/(.*)$',
    '^[./]',
  ],
  plugins: [require.resolve('prettier-plugin-tailwindcss')],
};
