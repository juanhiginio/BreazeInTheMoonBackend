import eslintPluginPrettier from 'eslint-plugin-prettier';
import prettierConfig from './.prettierrc' assert { type: 'json' };
import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...tseslint.configs.strict,
  {
    files: ['**/*.ts'],
    plugins: {
      prettier: eslintPluginPrettier,
    },
    rules: {
      'prettier/prettier': ['error', prettierConfig],
    },
  },
];
