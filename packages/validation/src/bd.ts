// Blueprint, section B "Forms": one schema per form, shared with the ServerAction.
// Same rules in browser and server — BD phone, BDT amount, address, date range
// validated once.
import { z } from 'zod';

// Accepts: 01XXXXXXXXX (11 digits starting with 01), or +8801XXXXXXXXX.
export const bdPhone = z
  .string()
  .trim()
  .regex(/^(?:\+?880|0)1[3-9]\d{8}$/, 'Enter a valid Bangladeshi phone number');

// Store amounts as integer paisa (1 BDT = 100 paisa) to avoid float drift.
export const bdtAmount = z
  .number()
  .int('Amount must be whole paisa')
  .nonnegative('Amount cannot be negative');

export const bdAddress = z.object({
  line1: z.string().trim().min(1, 'Required'),
  line2: z.string().trim().optional(),
  thana: z.string().trim().min(1, 'Required'),
  district: z.string().trim().min(1, 'Required'),
  division: z.string().trim().min(1, 'Required'),
  postcode: z.string().trim().regex(/^\d{4}$/, 'Enter a 4-digit postcode'),
});

export const dateRange = z
  .object({
    from: z.coerce.date(),
    to: z.coerce.date(),
  })
  .refine((d) => d.to >= d.from, { message: 'End date must be after start date', path: ['to'] });
