// Blueprint, section C: category / listing. Search, filter, sort via nuqs so
// state survives refresh and is shareable.
export default async function CategoryPage({
  params,
}: {
  params: Promise<{ domain: string; slug: string }>;
}): Promise<React.ReactElement> {
  const { slug } = await params;
  return <div className="p-6">Category: {slug}</div>;
}
