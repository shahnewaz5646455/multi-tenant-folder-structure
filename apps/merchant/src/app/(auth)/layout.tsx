import type { ReactNode } from 'react';

export default function AuthLayout({ children }: { children: ReactNode }): React.ReactElement {
  return <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center p-6">{children}</div>;
}
