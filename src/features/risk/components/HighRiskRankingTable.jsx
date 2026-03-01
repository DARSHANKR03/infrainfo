import RiskCard from './RiskCard';

function HighRiskRankingTable({ rows }) {
  return (
    <RiskCard title="High-Risk Asset Ranking" subtitle="Top exposure assets prioritized by risk and financial loss.">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-neutral-border">
              <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-primary-500">Rank</th>
              <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-primary-500">Asset</th>
              <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-primary-500">Risk Score</th>
              <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-primary-500">Estimated Loss</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.assetId} className="border-b border-neutral-border text-sm text-primary-700">
                <td className="px-3 py-2 font-semibold text-primary-900">#{row.rank}</td>
                <td className="px-3 py-2">
                  <p className="font-semibold text-primary-900">{row.assetName}</p>
                  <p className="text-xs text-primary-500">{row.assetId}</p>
                </td>
                <td className="px-3 py-2">{row.riskScore}</td>
                <td className="px-3 py-2">{row.estimatedLoss.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </RiskCard>
  );
}

export default HighRiskRankingTable;

