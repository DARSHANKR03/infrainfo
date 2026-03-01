import MaintenanceCard from './MaintenanceCard';

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function MaintenanceCalendarView({ events }) {
  const year = 2026;
  const month = 2;
  const now = new Date();
  const today =
    now.getFullYear() === year && now.getMonth() === month ? now.getDate() : null;
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const eventsByDay = events.reduce((acc, item) => {
    const day = Number(item.date.split('-')[2]);
    acc[day] = acc[day] ? [...acc[day], item] : [item];
    return acc;
  }, {});

  const cells = [];
  for (let i = 0; i < firstDay; i += 1) cells.push({ empty: true, key: `empty-${i}` });
  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push({ day, key: `day-${day}`, events: eventsByDay[day] || [] });
  }
  while (cells.length % 7 !== 0) cells.push({ empty: true, key: `tail-${cells.length}` });

  return (
    <MaintenanceCard title="Maintenance Calendar" subtitle="Scheduled work orders in March 2026.">
      <div className="grid grid-cols-7 gap-2">
        {weekDays.map((day) => (
          <div
            key={day}
            className="rounded-md bg-neutral-bg p-2 text-center text-xs font-semibold text-primary-500"
          >
            {day}
          </div>
        ))}
        {cells.map((cell) => (
          <div
            key={cell.key}
            className={[
              'min-h-24 rounded-xl border p-2 ds-transition',
              cell.empty
                ? 'border-transparent bg-transparent'
                : 'border-neutral-border bg-white hover:-translate-y-0.5 hover:shadow-lg'
            ].join(' ')}
          >
            {!cell.empty ? (
              <>
                <p
                  className={[
                    'inline-flex h-6 min-w-6 items-center justify-center rounded-full px-1 text-xs font-semibold',
                    cell.day === today
                      ? 'bg-accent-400 text-white shadow-lg shadow-accent-400/30'
                      : 'text-primary-700'
                  ].join(' ')}
                >
                  {cell.day}
                </p>
                <div className="mt-1 space-y-1">
                  {cell.events.slice(0, 2).map((event, index) => (
                    <div
                      key={`${event.label}-${index}`}
                      className="rounded bg-accent-300/20 px-1.5 py-1 text-[10px] text-accent-500"
                    >
                      {event.label}
                    </div>
                  ))}
                </div>
              </>
            ) : null}
          </div>
        ))}
      </div>
    </MaintenanceCard>
  );
}

export default MaintenanceCalendarView;
