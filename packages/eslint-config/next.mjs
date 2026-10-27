import base from './index.mjs';
import nextPlugin from '@next/eslint-plugin-next';
import reactHooks from 'eslint-plugin-react-hooks';

export default [
  ...base,
  {
    plugins: { '@next/next': nextPlugin, 'react-hooks': reactHooks },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
      ...reactHooks.configs.recommended.rules,
    },
  },
  {
    // Blueprint anti-pattern: 'use client' in a layout turns the subtree into client JS.
    files: ['**/app/**/layout.tsx'],
    rules: {
      'no-restricted-syntax': [
        'error',
        {
          selector: "Program > ExpressionStatement[expression.value='use client']",
          message: "Layouts must stay Server Components. Move interactivity to a *-client.tsx island.",
        },
      ],
    },
  },
];
