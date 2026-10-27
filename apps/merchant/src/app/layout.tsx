import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';

export const metadata: Metadata = {
  title: 'Ecom Manager',
  description: 'Merchant dashboard',
};

export default function RootLayout({ children }: { children: ReactNode }): React.ReactElement {
  // Blueprint, D "Anti-patterns": 'use client' at the top of a layout turns the
  // whole subtree into client JS — banned by lint. Interactivity goes in islands.
  return (
    <html lang="en">
      <body className="min-h-screen bg-neutral-50 text-neutral-900">{children}</body>
    </html>
  );
}
