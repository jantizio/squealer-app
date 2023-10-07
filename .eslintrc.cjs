module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:eslint-plugin-react-refresh/recommended',
    'plugin:@tanstack/eslint-plugin-query/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  plugins: ['react-refresh', 'jsx-a11y', '@tanstack/query'],
  rules: {
    'react-refresh/only-export-components': 'warn',
  },
  settings: {
    'import/resolver': {
      alias: {
        extensions: [
          '.jsx',
          '.tsx',
          '.ts',
          '.scss',
          '.d.ts',
          '.css',
          '.module.css',
        ],
        map: [
          ['@/components', './src/components'],
          ['@/hooks', './src/hooks'],
          ['@/globals', './src/globals'],
          ['@/styles', './src/styles'],
        ],
      },
    },
  },
};
