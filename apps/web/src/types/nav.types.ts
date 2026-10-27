export type NavItem = {
  href: string;
  label: string;
};

export type FooterColumn = {
  key: string;
  title: string;
  items: NavItem[];
};

export type OfficeInfo = {
  title: string;
  body: string;
};
