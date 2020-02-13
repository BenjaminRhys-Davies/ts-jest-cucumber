module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  extends: [
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:sonarjs/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: [
    '@typescript-eslint',
    'sonarjs',
  ],
  rules: {
    indent: [2, 2, { 'SwitchCase': 1 }],
  },
  overrides: [
    {
      files: [
        '*.test.js',
        '*.test.ts'
      ],
      rules: {
        'sonarjs/no-identical-expressions': [0],
        'sonarjs/no-identical-functions': [0],
        'sonarjs/no-duplicate-string': [0],
      },
    },
  ],
  settings: {
    'import/resolver': {
      es6: {
        extensions: ['.ts'],
      },
    },
  },
};
