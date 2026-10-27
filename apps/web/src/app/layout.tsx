import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Inter, Hind_Siliguri } from 'next/font/google';
import './globals.css';

/* Latin UI font. Variable-weight so we don't have to list weights. */
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

/* Bengali font. subset=bengali scopes the @font-face unicode-range to the
 * Bengali block (U+0980–09FF), so the browser automatically swaps to this
 * font for ৳ and Bangla characters while Latin stays on Inter. */
const hindSiliguri = Hind_Siliguri({
  subsets: ['bengali'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-hind',
});

export const metadata: Metadata = {
  title: 'Ecom Manager — The commerce platform for Bangladesh',
  description: 'Launch, sell, and scale with Ecom Manager.',
};

export default function RootLayout({ children }: { children: ReactNode }): React.ReactElement {
  return (
    <html lang="en" className={`${inter.variable} ${hindSiliguri.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
