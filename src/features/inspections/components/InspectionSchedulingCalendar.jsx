import InspectionCard from './InspectionCard';

const weekLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function InspectionSchedulingCalendar({ entries }) {
  const year = 2026;
  const monthIndex = 2;
  const now = new Date();
  const today = now.getFullYear() === year && now.getMonth() === monthIndex ? now.getDate() : 1;
  const firstDay = new Date(year, monthIndex, 1).getDay();
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();

  const entryMap = entries.reduce((acc, entry) => {
    const day = Number(entry.date.split('-')[2]);
    acc[day] = entry;
    return acc;
  }, {});

  const cells = [];

  for (let i = 0; i < firstDay; i += 1) {
    cells.push({ empty: true, key: `empty-${i}` });
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push({
      day,
      entry: entryMap[day],
      key: `day-${day}`
    });
  }

  while (cells.length % 7 !== 0) {
    cells.push({ empty: true, key: `empty-tail-${cells.length}` });
  }

  return (
    <InspectionCard
      title="Inspection Scheduling Calendar (UI Only)"
      subtitle="March 2026 planned inspection slots by day."
    >
      <div className="grid grid-cols-7 gap-2">
        {weekLabels.map((label) => (
          <div
            key={label}
            className="rounded-md bg-neutral-bg p-2 text-center text-xs font-semibold uppercase text-primary-500"
          >
            {label}
          </div>
        ))}

        {cells.map((cell) => (
          <div
            key={cell.key}
            className={[
              'min-h-20 rounded-lg border p-2 text-xs',
              cell.empty ? 'border-transparent bg-transparent' : 'border-neutral-border bg-white'
            ].join(' ')}
          >
            {!cell.empty ? (
              <>
                <p className="font-semibold text-primary-700">{cell.day}</p>
                {cell.entry ? (
                  <div
                    className={[
                      'mt-2 rounded-md p-1.5 ds-transition',
                      cell.day >= today && cell.day <= today + 10
                        ? 'bg-accent-300/25 shadow-lg shadow-accent-400/30'
                        : 'bg-neutral-bg'
                    ].join(' ')}
                  >
                    <p className="text-xs font-semibold text-accent-500">
                      {cell.entry.count} inspections
                    </p>
                    <p className="text-xs text-primary-700">{cell.entry.zone}</p>
                  </div>
                ) : (
                  <p className="mt-2 text-xs text-primary-500">No schedule</p>
                )}
              </>
            ) : null}
          </div>
        ))}
      </div>
    </InspectionCard>
  );
}

export default InspectionSchedulingCalendar;
