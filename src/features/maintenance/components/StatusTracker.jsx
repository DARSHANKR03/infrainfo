function StatusTracker({ workOrders }) {
  const counts = workOrders.reduce(
    (acc, order) => {
      acc[order.status] = (acc[order.status] || 0) + 1;
      return acc;
    },
    { Open: 0, 'In Progress': 0, Completed: 0 }
  );

  const items = [
    { label: 'Open', value: counts.Open, style: 'bg-danger/15 text-danger' },
    {
      label: 'In Progress',
      value: counts['In Progress'],
      style: 'bg-warning/15 text-warning'
    },
    {
      label: 'Completed',
      value: counts.Completed,
      style: 'bg-success/15 text-success'
    }
  ];

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      {items.map((item) => (
        <article key={item.label} className="rounded-xl border border-neutral-border bg-white p-4 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary-500">{item.label}</p>
          <div className="mt-2 flex items-center gap-2">
            <p className="text-2xl font-bold text-primary-900">{item.value}</p>
            <span className={['rounded-full px-2 py-1 text-xs font-semibold', item.style].join(' ')}>
              {item.label}
            </span>
          </div>
        </article>
      ))}
    </div>
  );
}

export default StatusTracker;

