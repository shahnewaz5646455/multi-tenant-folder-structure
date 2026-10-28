import { Bell, Globe, MessageCircle, Store, type LucideIcon } from 'lucide-react';

export type ContactMethodKey = 'whatsapp' | 'email' | 'dhaka' | 'chattogram';

export const CONTACT_METHODS: readonly { key: ContactMethodKey; icon: LucideIcon }[] = [
  { key: 'whatsapp', icon: MessageCircle },
  { key: 'email', icon: Bell },
  { key: 'dhaka', icon: Store },
  { key: 'chattogram', icon: Globe },
] as const;

export const CONTACT_TOPIC_KEYS = ['sales', 'migration', 'support', 'partnership'] as const;
export type ContactTopicKey = (typeof CONTACT_TOPIC_KEYS)[number];
