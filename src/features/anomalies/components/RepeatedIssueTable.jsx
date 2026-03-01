import AnomalyCard from './AnomalyCard';

function RepeatedIssueTable({ rows }) {
  return (
    <AnomalyCard
      title="Repeated Issue Detection"
      subtitle="Assets with recurring anomaly patterns and repeat counts."
    >
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-neutral-border">
              <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-primary-500">
                Asset
              </th>
              <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-primary-500">
                Type
              </th>
              <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-primary-500">
                Metric
              </th>
              <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-primary-500">
                Repeat Count
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((item) => (
              <tr key={`repeat-${item.id}`} className="border-b border-neutral-border text-sm text-primary-700">
                <td className="px-3 py-2">
                  <p className="font-semibold text-primary-900">{item.assetName}</p>
                  <p className="text-xs text-primary-500">{item.assetId}</p>
                </td>
                <td className="px-3 py-2">{item.type}</td>
                <td className="px-3 py-2">{item.metric}</td>
                <td className="px-3 py-2">
                  <span className="rounded-full border border-warning/35 bg-warning/15 px-2 py-1 text-xs font-semibold text-warning">
                    {item.repeatedCount} times
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AnomalyCard>
  );
}

export default RepeatedIssueTable;

