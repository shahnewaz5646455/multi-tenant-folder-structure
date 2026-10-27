// Blueprint, section B "API layer" + section C "tooling": pulls OpenAPI spec →
// packages/api-client/src/schema.d.ts. CI fails if regeneration produces a diff.
//
// Usage: npm run generate:api
import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import openapiTS, { astToString } from 'openapi-typescript';

const SPEC_URL = process.env.OPENAPI_SPEC_URL ?? 'https://api.ecommanager.com/openapi.json';
const OUT_PATH = resolve('packages/api-client/src/schema.d.ts');

async function main(): Promise<void> {
  console.log(`Fetching ${SPEC_URL} ...`);
  const ast = await openapiTS(new URL(SPEC_URL));
  const banner = `// GENERATED FILE — do not edit by hand.\n// Source: ${SPEC_URL}\n// Regenerate: npm run generate:api\n\n`;
  writeFileSync(OUT_PATH, banner + astToString(ast), 'utf8');
  console.log(`Wrote ${OUT_PATH}`);
}

main().catch((err: unknown) => {
  console.error(err);
  process.exit(1);
});
