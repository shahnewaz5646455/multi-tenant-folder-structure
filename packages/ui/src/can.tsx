// Blueprint, section D3 "RBAC and route protection", layer 4: <Can> hides or
// disables menus and buttons. This is NOT security — the ServerAction guard is.
import type { JSX, ReactNode } from 'react';
import { can, type Permission, type StoreSession } from '@ecm/permissions';

export type CanProps = {
  session: StoreSession;
  permission: Permission;
  children: ReactNode;
  fallback?: ReactNode;
};

export function Can({ session, permission, children, fallback = null }: CanProps): JSX.Element {
  return <>{can(session, permission) ? children : fallback}</>;
}
