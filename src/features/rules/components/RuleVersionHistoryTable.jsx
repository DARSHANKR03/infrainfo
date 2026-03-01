import RuleCard from './RuleCard';

function RuleVersionHistoryTable({ versions }) {
  return (
    <RuleCard title="Rule Version History" subtitle="Change traceability for this rule.">
      {versions.length ? (
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-neutral-border">
                <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-primary-500">
                  Version
                </th>
                <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-primary-500">
                  Changed At
                </th>
                <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-primary-500">
                  Changed By
                </th>
                <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-primary-500">
                  Note
                </th>
              </tr>
            </thead>
            <tbody>
              {versions.map((version) => (
                <tr
                  key={`${version.version}-${version.changedAt}`}
                  className="border-b border-neutral-border text-sm text-primary-700"
                >
                  <td className="px-3 py-2 font-semibold text-primary-900">{version.version}</td>
                  <td className="px-3 py-2">{version.changedAt}</td>
                  <td className="px-3 py-2">{version.changedBy}</td>
                  <td className="px-3 py-2">{version.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-sm text-primary-500">No version history available yet.</p>
      )}
    </RuleCard>
  );
}

export default RuleVersionHistoryTable;

