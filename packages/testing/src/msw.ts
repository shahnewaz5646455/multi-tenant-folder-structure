// Blueprint, section B "Unit and integration tests": MSW mocks the same API
// contract in tests and Storybook. Handlers live here so a schema change rolls
// out to every surface at once.
import { http, HttpResponse } from 'msw';
import { fixtures } from './fixtures.ts';

const base = process.env.API_BASE_URL ?? 'https://api.ecommanager.com';

export const handlers = [
  http.get(`${base}/me`, () => HttpResponse.json(fixtures.user)),
  http.get(`${base}/tenants/by-host`, () => HttpResponse.json(fixtures.tenant)),
];
