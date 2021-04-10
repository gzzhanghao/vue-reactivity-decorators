const rules = {
  'consistent-return': 0,
  'class-methods-use-this': 0,
  'max-classes-per-file': 0,
  'import/prefer-default-export': 0,
  'no-use-before-define': 0,
  '@typescript-eslint/no-use-before-define': 0,
};

module.exports = {
  overrides: [
    {
      files: [
        '**/*.js',
      ],
      extends: [
        'airbnb-base',
      ],
      rules,
    },
    {
      files: [
        '**/*.ts',
      ],
      extends: [
        'airbnb-typescript/base',
      ],
      parserOptions: {
        project: './tsconfig.eslint.json',
      },
      rules,
    },
    {
      files: [
        '__tests__/**/*.ts',
      ],
      rules: {
        'import/no-extraneous-dependencies': 0,
      },
    },
  ],
};
