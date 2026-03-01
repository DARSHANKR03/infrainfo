import RiskCard from './RiskCard';

function ImpactBadge({ impact }) {
  const styles = {
    Severe: 'bg-danger/15 text-danger',
    High: 'bg-warning/15 text-warning',
    Medium: 'bg-accent-300/20 text-accent-500'
  };
  return (
    <span className={['inline-flex rounded-full px-2 py-1 text-xs font-semibold', styles[impact] || 'bg-neutral-bg text-primary-700'].join(' ')}>
      {impact}
    </span>
  );
}

function AssetCriticalityTable({ rows }) {
  return (
    <RiskCard title="Asset Criticality Index" subtitle="Business and operational impact ranking by asset.">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-neutral-border">
              <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-primary-500">Asset</th>
              <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-primary-500">Zone</th>
              <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-primary-500">Criticality</th>
              <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-primary-500">Failure Impact</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.assetId} className="border-b border-neutral-border text-sm text-primary-700">
                <td className="px-3 py-2">
                  <p className="font-semibold text-primary-900">{row.assetName}</p>
                  <p className="text-xs text-primary-500">{row.assetId}</p>
                </td>
                <td className="px-3 py-2">{row.zone}</td>
                <td className="px-3 py-2">{row.criticalityIndex}</td>
                <td className="px-3 py-2">
                  <ImpactBadge impact={row.failureImpact} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </RiskCard>
  );
}

export default AssetCriticalityTable;

