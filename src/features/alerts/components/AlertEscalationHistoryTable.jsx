function AlertEscalationHistoryTable({ entries }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-neutral-border bg-white shadow-sm">
      <table className="min-w-full">
        <thead className="bg-neutral-bg">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-primary-500">
              Time
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-primary-500">
              Level
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-primary-500">
              Action
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-primary-500">
              Actor
            </th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, index) => (
            <tr
              key={`${entry.time}-${index}`}
              className="border-t border-neutral-border text-sm text-primary-700"
            >
              <td className="px-4 py-3">{entry.time}</td>
              <td className="px-4 py-3">{entry.level}</td>
              <td className="px-4 py-3">{entry.action}</td>
              <td className="px-4 py-3">{entry.actor}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AlertEscalationHistoryTable;

