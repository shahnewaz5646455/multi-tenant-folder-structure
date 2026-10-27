// Blueprint, section D2 storefront rule 5: images through a CDN loader, not
// the framework's built-in optimiser. AVIF/WebP with explicit width/height,
// priority only on the LCP image.
export default function imageLoader({ src, width, quality }: { src: string; width: number; quality?: number }): string {
  const q = quality ?? 75;
  // TODO: swap for your CDN's URL shape — Imgix, Cloudinary, Bunny, etc.
  const base = process.env.NEXT_PUBLIC_IMAGE_CDN ?? '';
  return `${base}${src}?w=${width}&q=${q}&auto=format`;
}
