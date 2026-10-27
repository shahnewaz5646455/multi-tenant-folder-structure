// Shared base ESLint flat config.
// Apps extend with ./next.mjs; libraries extend with ./react-library.mjs.
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import boundaries from 'eslint-plugin-boundaries';

export default tseslint.config(
  { ignores: ['**/dist/**', '**/.next/**', '**/.turbo/**', '**/node_modules/**'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: { boundaries },
    settings: {
      'boundaries/elements': [
        // Apps
        { type: 'app-web', pattern: 'apps/web/**' },
        { type: 'app-storefront', pattern: 'apps/storefront/**' },
        { type: 'app-merchant', pattern: 'apps/merchant/**' },
        // Packages
        { type: 'pkg-ui', pattern: 'packages/ui/**' },
        { type: 'pkg-api-client', pattern: 'packages/api-client/**' },
        { type: 'pkg-auth', pattern: 'packages/auth/**' },
        { type: 'pkg-permissions', pattern: 'packages/permissions/**' },
        { type: 'pkg-tenant', pattern: 'packages/tenant/**' },
        { type: 'pkg-validation', pattern: 'packages/validation/**' },
        { type: 'pkg-format', pattern: 'packages/format/**' },
        { type: 'pkg-i18n', pattern: 'packages/i18n/**' },
        { type: 'pkg-page-schema', pattern: 'packages/page-schema/**' },
        { type: 'pkg-tracking', pattern: 'packages/tracking/**' },
        { type: 'pkg-testing', pattern: 'packages/testing/**' },
      ],
    },
    rules: {
      // Blueprint, section C: packages never import from apps; apps never import from each other.
      'boundaries/element-types': [
        'error',
        {
          default: 'disallow',
          rules: [
            // Apps may import from any package.
            { from: ['app-web', 'app-storefront', 'app-merchant'], allow: [
              'pkg-ui', 'pkg-api-client', 'pkg-auth', 'pkg-permissions',
              'pkg-tenant', 'pkg-validation', 'pkg-format', 'pkg-i18n',
              'pkg-page-schema', 'pkg-tracking', 'pkg-testing',
            ] },
            // tracking is storefront-only (blueprint C).
            { from: ['app-web', 'app-merchant'], disallow: ['pkg-tracking'] },
            // Package rules (blueprint C "Package dependency rules" table).
            { from: ['pkg-api-client'], allow: [] },
            { from: ['pkg-ui'], allow: [] },
            { from: ['pkg-auth'], allow: ['pkg-api-client', 'pkg-permissions'] },
            { from: ['pkg-tenant'], allow: ['pkg-api-client'] },
            { from: ['pkg-tracking'], allow: ['pkg-api-client'] },
            { from: ['pkg-format'], allow: [] },
            { from: ['pkg-validation'], allow: [] },
            { from: ['pkg-permissions'], allow: [] },
            { from: ['pkg-page-schema'], allow: ['pkg-validation'] },
            { from: ['pkg-i18n'], allow: [] },
            { from: ['pkg-testing'], allow: [
              'pkg-api-client', 'pkg-validation', 'pkg-format', 'pkg-permissions',
            ] },
          ],
        },
      ],
      // Blueprint, section D "Anti-patterns": barrel re-exports leak bundle size.
      'no-restricted-syntax': [
        'error',
        {
          selector: "ExportAllDeclaration",
          message: 'Barrel re-exports (export *) are banned — list symbols explicitly.',
        },
      ],
      '@typescript-eslint/consistent-type-imports': ['error', { fixStyle: 'separate-type-imports' }],
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
    },
  },
);
