import type { ReactNode } from 'react'

export type TableColumn<T> = {
  key: string
  label: string
  render?: (row: T) => ReactNode
}

type TableProps<T> = {
  columns: TableColumn<T>[]
  rows: T[]
  emptyMessage?: string
  onRowClick?: (row: T) => void
}

function Table<T extends Record<string, unknown>>({
  columns,
  rows,
  emptyMessage = 'No records found.',
  onRowClick,
}: TableProps<T>) {
  return (
    <div className="border border-border bg-surface overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-surface-alt">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-4 py-3 text-left text-xs tracking-label uppercase text-ink-muted font-medium whitespace-nowrap"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="text-center text-ink-muted py-12 text-sm"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            rows.map((row, i) => (
              <tr
                key={i}
                onClick={onRowClick ? () => onRowClick(row) : undefined}
                className={[
                  'border-b border-border last:border-0',
                  onRowClick
                    ? 'cursor-pointer hover:bg-surface-alt'
                    : 'hover:bg-surface-alt',
                ].join(' ')}
              >
                {columns.map((col) => (
                  <td key={col.key} className="px-4 py-3 text-ink whitespace-nowrap">
                    {col.render ? col.render(row) : String(row[col.key] ?? '')}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Table
