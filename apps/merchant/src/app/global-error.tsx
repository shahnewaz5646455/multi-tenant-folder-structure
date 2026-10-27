'use client';

import type { JSX } from 'react';

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }): JSX.Element {
  return (
    <html lang="en">
      <body className="flex min-h-screen items-center justify-center bg-neutral-50 text-neutral-900">
        <div className="max-w-md space-y-4 text-center">
          <h1 className="text-xl font-semibold">Something went wrong</h1>
          <p className="text-sm text-neutral-600">
            {error.digest ? `Reference: ${error.digest}` : 'Please try again.'}
          </p>
          <button type="button" onClick={reset} className="rounded-md bg-brand-600 px-4 py-2 text-white">
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
