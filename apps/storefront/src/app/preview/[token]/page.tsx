// Blueprint, section D2: the page-builder preview is an IFRAME of this route,
// so storefront theme CSS and fonts never enter the merchant bundle, and the
// preview is exactly what shoppers will see. noindex.
import type { Metadata } from 'next';

export const metadata: Metadata = { robots: { index: false, follow: false } };

export default async function PreviewPage({
  params,
}: {
  params: Promise<{ token: string }>;
}): Promise<React.ReactElement> {
  const { token } = await params;
  // TODO: resolve token → tenant + draft page; render blocks.
  return <div className="p-6">Preview {token}</div>;
}
