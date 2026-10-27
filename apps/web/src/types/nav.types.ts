export type NavItem = {
  href: string;
  /** Translation key, resolved against the caller's namespace. */
  labelKey: string;
};

export type FooterColumn = {
  /** Column id — also the translation sub-namespace under `footer.columns`. */
  key: string;
  items: NavItem[];
};

export type OfficeKey = 'dhaka' | 'chattogram' | 'support';
