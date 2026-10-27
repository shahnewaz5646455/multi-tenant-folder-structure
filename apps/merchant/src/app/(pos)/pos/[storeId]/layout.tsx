// Blueprint, section C "Merchant app" POS group: full-screen POS shell, registers
// the service worker (scope '/pos/' only — a POS caching bug cannot serve stale
// dashboard pages).
import type { ReactNode } from 'react';
import { requirePermission } from '@ecm/auth/guards';

export default async function PosLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ storeId: string }>;
}): Promise<React.ReactElement> {
  const { storeId } = await params;
  await requirePermission(storeId, 'pos.sell');
  return (
    <div className="flex h-screen flex-col bg-neutral-950 text-neutral-50">
      {/* TODO: register /sw.ts via a client island; shortcuts.ts here too. */}
      {children}
    </div>
  );
}
