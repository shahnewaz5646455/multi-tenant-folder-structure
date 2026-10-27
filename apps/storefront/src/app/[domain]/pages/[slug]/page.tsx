// Blueprint: policy and landing pages — merchant-authored content, rendered
// from page-schema blocks. The storefront validates whatever the editor saves.
export default async function CmsPage({
  params,
}: {
  params: Promise<{ domain: string; slug: string }>;
}): Promise<React.ReactElement> {
  const { slug } = await params;
  return <div className="p-6">Page: {slug}</div>;
}
