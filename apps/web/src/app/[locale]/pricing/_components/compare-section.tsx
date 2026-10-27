import type { JSX } from 'react';
import { CompareTableDesktop } from './compare-table-desktop';
import { CompareTableMobile } from './compare-table-mobile';

export function CompareSection(): JSX.Element {
  return (
    <section className="w-full bg-background">
      <div className="mx-auto w-full max-w-[1440px] px-4 pb-14 pt-6 sm:px-6 lg:px-16 lg:pb-18 xl:px-[120px]">
        <CompareTableDesktop />
        <CompareTableMobile />
      </div>
    </section>
  );
}
