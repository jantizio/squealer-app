module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:eslint-plugin-react-refresh/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  plugins: ['react-refresh', 'jsx-a11y'],
  rules: {
    'react-refresh/only-export-components': 'warn',
  },
  settings: {
    'import/resolver': {
      alias: {
        extensions: ['.jsx', '.tsx', '.scss', '.d.ts'],
        map: [
          ['@/components', './src/components'],
          ['@/hooks', './src/hooks'],
        ],
      },
    },
  },
};
