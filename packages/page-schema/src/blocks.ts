// Blueprint, section B "Page builder": block schemas in Zod, shared between
// the merchant editor and the storefront renderer. The storefront validates
// whatever the editor saves.
import { z } from 'zod';

export const Image = z.object({
  src: z.string().url(),
  alt: z.string().max(200),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
});

export const HeroBlock = z.object({
  type: z.literal('hero'),
  heading: z.string().min(1).max(140),
  subheading: z.string().max(240).optional(),
  cta: z.object({ label: z.string().max(40), href: z.string() }).optional(),
  image: Image.optional(),
});

export const ProductGridBlock = z.object({
  type: z.literal('product-grid'),
  title: z.string().optional(),
  productIds: z.array(z.string()).max(24),
  columns: z.union([z.literal(2), z.literal(3), z.literal(4)]).default(3),
});

export const BannerBlock = z.object({
  type: z.literal('banner'),
  image: Image,
  href: z.string().optional(),
});

export const GalleryBlock = z.object({
  type: z.literal('gallery'),
  images: z.array(Image).min(1).max(12),
});

export const TestimonialsBlock = z.object({
  type: z.literal('testimonials'),
  items: z
    .array(
      z.object({ quote: z.string().min(1), author: z.string().min(1), rating: z.number().min(1).max(5).optional() }),
    )
    .max(12),
});

export const Block = z.discriminatedUnion('type', [
  HeroBlock,
  ProductGridBlock,
  BannerBlock,
  GalleryBlock,
  TestimonialsBlock,
]);

export const Page = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  blocks: z.array(Block),
});

export type Block = z.infer<typeof Block>;
export type Page = z.infer<typeof Page>;
