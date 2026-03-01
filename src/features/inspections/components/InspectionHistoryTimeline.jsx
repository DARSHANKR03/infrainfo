import InspectionCard from './InspectionCard';

function getDotStyle(title) {
  if (/critical|overdue/i.test(title)) return 'bg-danger shadow-danger/30';
  if (/routine|validation|monitor|follow-up/i.test(title)) return 'bg-warning shadow-warning/30';
  return 'bg-accent-500 shadow-accent-400/30';
}

function InspectionHistoryTimeline({ items }) {
  return (
    <InspectionCard
      title="Inspection History Timeline"
      subtitle="Recent manual and system-recorded inspection events."
    >
      <ol className="relative ml-2 border-l border-neutral-border pl-5">
        {items.map((item) => (
          <li key={item.id} className="mb-4 rounded-xl border border-neutral-border bg-white p-3">
            <span
              className={[
                'absolute -left-[7px] mt-2 inline-flex h-3 w-3 animate-pulse rounded-full shadow-lg',
                getDotStyle(item.title)
              ].join(' ')}
            />
            <div className="mb-1 flex items-center justify-between gap-2">
              <p className="text-sm font-semibold text-primary-900">{item.title}</p>
              <span className="text-xs text-primary-500">{item.date}</span>
            </div>
            <p className="text-sm text-primary-700">{item.detail}</p>
            <p className="mt-2 text-xs text-primary-500">Inspector: {item.inspector}</p>
          </li>
        ))}
      </ol>
    </InspectionCard>
  );
}

export default InspectionHistoryTimeline;
