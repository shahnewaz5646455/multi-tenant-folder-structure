// Blueprint, section B "Tables, charts": TanStack Table — headless. Wire the
// adapter in the app once rows and columns are known.
import type { JSX, ReactNode } from 'react';

export type DataTableProps<T> = {
  rows: T[];
  columns: { key: keyof T & string; label: string; render?: (row: T) => ReactNode }[];
  getRowId?: (row: T) => string;
  empty?: ReactNode;
};

export function DataTable<T>({ rows, columns, getRowId, empty }: DataTableProps<T>): JSX.Element {
  if (rows.length === 0 && empty) return <>{empty}</>;
  return (
    <table className="w-full text-left text-sm">
      <thead className="border-b border-neutral-200 text-neutral-500">
        <tr>
          {columns.map((c) => (
            <th key={c.key} className="px-3 py-2 font-medium">
              {c.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={getRowId?.(row) ?? i} className="border-b border-neutral-100 last:border-0">
            {columns.map((c) => (
              <td key={c.key} className="px-3 py-2">
                {c.render ? c.render(row) : (row[c.key] as ReactNode)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
