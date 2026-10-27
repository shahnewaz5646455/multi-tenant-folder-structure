// Blueprint, section D3 "RBAC and route protection", layer 2:
// requireStoreAccess inside the layout. notFound() on failure — don't reveal
// that the store exists to a non-staff user.
import type { ReactNode } from 'react';
import { requireStoreAccess } from '@ecm/auth/guards';

export default async function DashboardLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ storeId: string }>;
}): Promise<React.ReactElement> {
  const { storeId } = await params;
  await requireStoreAccess(storeId);
  return (
    <div className="flex min-h-screen">
      <aside className="w-60 border-r border-neutral-200 bg-white" aria-label="Sidebar">
        {/* TODO: nav from config/dashboard-nav.ts, filtered by permissions + entitlements. */}
      </aside>
      <main className="flex-1">{children}</main>
    </div>
  );
}
