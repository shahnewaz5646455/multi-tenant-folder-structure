import type { ReactNode } from 'react';
import './globals.css';

// Blueprint, section D2 storefront rule 1: Server Components by default.
// This root layout stays a Server Component — no 'use client'.
export default function RootLayout({ children }: { children: ReactNode }): React.ReactElement {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
