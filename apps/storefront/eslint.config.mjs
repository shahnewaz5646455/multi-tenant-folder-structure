import next from '@ecm/eslint-config/next';

export default [
  ...next,
  {
    // Blueprint, section D2 storefront rule 1: lint fails if a block contains 'use client'.
    files: ['src/blocks/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-syntax': [
        'error',
        {
          selector: "Program > ExpressionStatement[expression.value='use client']",
          message: "Storefront blocks must be Server Components. Move interactivity to a *-client.tsx island.",
        },
      ],
    },
  },
];
