// Blueprint D2: LCP target 2.5 s p75 on mid-range mobile over 4G. Server
// component. Only the add-to-cart button and gallery swipe are client islands.
export default async function ProductPage({
  params,
}: {
  params: Promise<{ domain: string; slug: string }>;
}): Promise<React.ReactElement> {
  const { slug } = await params;
  return <div className="p-6">Product: {slug}</div>;
}
