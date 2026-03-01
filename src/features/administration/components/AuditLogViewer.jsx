import AdminCard from './AdminCard';

function AuditLogViewer({ title, subtitle, columns, rows }) {
  const detailKeys = columns
    .map((column) => column.key)
    .filter((key) => key !== 'time');

  return (
    <AdminCard title={title} subtitle={subtitle}>
      <ol className="relative ml-1 border-l border-neutral-border pl-5">
        {rows.map((row, rowIndex) => (
          <li key={row.id || row.time || rowIndex} className="mb-4 rounded-xl border border-neutral-border bg-white p-3">
            <span className="absolute -left-[7px] mt-1 inline-flex h-3 w-3 rounded-full bg-accent-500 shadow-lg shadow-accent-400/30" />
            <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
              <span className="rounded-full border border-accent-400/35 bg-accent-300/20 px-2.5 py-1 text-xs font-semibold text-accent-500">
                {row.time || 'N/A'}
              </span>
            </div>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {detailKeys.map((key) => (
                <div key={`${rowIndex}-${key}`} className="rounded-lg bg-neutral-bg px-2.5 py-2">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-primary-500">
                    {columns.find((column) => column.key === key)?.label || key}
                  </p>
                  <p className="mt-0.5 text-sm text-primary-700">{row[key]}</p>
                </div>
              ))}
            </div>
          </li>
        ))}
      </ol>
    </AdminCard>
  );
}

export default AuditLogViewer;
