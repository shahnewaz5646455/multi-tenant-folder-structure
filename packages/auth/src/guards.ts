// Blueprint, section D3 "RBAC and route protection".
// Server-only guards. Layer 2 (requireStoreAccess) and layer 3 (requirePermission)
// of the five-layer check.
import 'server-only';
import { notFound, redirect } from 'next/navigation';
import { can, type Permission, type StoreSession } from '@ecm/permissions';
import { getStoreSession, getUserSession, type UserSession } from './session';

export class ForbiddenError extends Error {
  constructor(public readonly permission: Permission) {
    super(`Missing permission: ${permission}`);
    this.name = 'ForbiddenError';
  }
}

export async function requireUser(): Promise<UserSession> {
  const user = await getUserSession();
  if (!user) redirect('/login');
  return user;
}

/** Blueprint: `notFound()` — don't reveal that the store exists to a user who
 *  isn't staff of it. */
export async function requireStoreAccess(storeId: string): Promise<StoreSession> {
  const session = await getStoreSession(storeId);
  if (!session) notFound();
  return session;
}

/** Blueprint: ServerActions MUST call this. Hiding the button protects nothing;
 *  a ServerAction is a public POST endpoint. */
export async function requirePermission(storeId: string, p: Permission): Promise<StoreSession> {
  const session = await requireStoreAccess(storeId);
  if (!can(session, p)) throw new ForbiddenError(p);
  return session;
}
