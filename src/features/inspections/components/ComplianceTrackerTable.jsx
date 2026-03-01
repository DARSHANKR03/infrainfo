import InspectionCard from './InspectionCard';

function ComplianceTrackerTable({ rows }) {
  return (
    <InspectionCard
      title="Inspection Compliance Tracker"
      subtitle="Scheduled vs completed inspections by municipal zone."
    >
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-neutral-border">
              <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-primary-500">
                Zone
              </th>
              <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-primary-500">
                Scheduled
              </th>
              <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-primary-500">
                Completed
              </th>
              <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-primary-500">
                Overdue
              </th>
              <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-primary-500">
                Compliance
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.zone} className="border-b border-neutral-border text-sm text-primary-700">
                <td className="px-3 py-2 font-semibold text-primary-900">{row.zone}</td>
                <td className="px-3 py-2">{row.scheduled}</td>
                <td className="px-3 py-2">{row.completed}</td>
                <td className="px-3 py-2">{row.overdue}</td>
                <td className="px-3 py-2">
                  <div className="w-40">
                    <div className="mb-1 h-2 w-full overflow-hidden rounded-full bg-neutral-border">
                      <div
                        style={{ width: `${row.compliance}%` }}
                        className={[
                          'h-full rounded-full ds-transition',
                          row.compliance >= 90
                            ? 'bg-success'
                            : row.compliance >= 85
                              ? 'bg-warning'
                              : 'bg-danger'
                        ].join(' ')}
                      />
                    </div>
                    <span
                      className={[
                        'text-xs font-semibold',
                        row.compliance >= 90
                          ? 'text-success'
                          : row.compliance >= 85
                            ? 'text-warning'
                            : 'text-danger'
                      ].join(' ')}
                    >
                      {row.compliance}%
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </InspectionCard>
  );
}

export default ComplianceTrackerTable;
