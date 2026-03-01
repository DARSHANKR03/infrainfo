import HealthCard from './HealthCard';

function AssetRankingTable({ data }) {
  return (
    <HealthCard
      title="Asset Ranking"
      subtitle="Top assets by current health score."
    >
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-neutral-border">
              <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-primary-500">
                Rank
              </th>
              <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-primary-500">
                Asset
              </th>
              <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-primary-500">
                Zone
              </th>
              <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-primary-500">
                Score
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.assetId} className="border-b border-neutral-border text-sm text-primary-700">
                <td className="px-3 py-2 font-semibold text-primary-900">#{item.rank}</td>
                <td className="px-3 py-2">
                  <p className="font-medium text-primary-900">{item.assetName}</p>
                  <p className="text-xs text-primary-500">{item.assetId}</p>
                </td>
                <td className="px-3 py-2">{item.zone}</td>
                <td className="px-3 py-2">{item.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </HealthCard>
  );
}

export default AssetRankingTable;

