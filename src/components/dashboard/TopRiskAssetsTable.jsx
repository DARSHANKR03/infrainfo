import DashboardCard from './DashboardCard';
import { topRiskAssets } from '../../pages/dashboardData';
import StatusBadge from '../../shared/components/design-system/StatusBadge';

function TopRiskAssetsTable() {
  return (
    <DashboardCard title="Top 10 High Risk Assets">
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="border-b border-neutral-border text-left text-xs uppercase tracking-wide text-primary-500">
              <th className="pb-3 pr-4">Asset ID</th>
              <th className="pb-3 pr-4">Asset Name</th>
              <th className="pb-3 pr-4">Zone</th>
              <th className="pb-3 pr-4">Condition</th>
              <th className="pb-3 pr-4">Risk Score</th>
              <th className="pb-3">Last Inspection</th>
            </tr>
          </thead>
          <tbody>
            {topRiskAssets.map((asset, index) => (
              <tr
                key={asset.assetId}
                className={[
                  'border-b border-neutral-border text-sm text-primary-700 ds-transition hover:bg-accent-300/20',
                  index % 2 === 1 ? 'bg-neutral-bg' : 'bg-white'
                ].join(' ')}
              >
                <td className="py-3 pr-4 font-semibold text-primary-900">{asset.assetId}</td>
                <td className="py-3 pr-4">{asset.assetName}</td>
                <td className="py-3 pr-4">{asset.zone}</td>
                <td className="py-3 pr-4">
                  <StatusBadge value={asset.condition} />
                </td>
                <td className="py-3 pr-4 font-semibold text-danger">{asset.riskScore}</td>
                <td className="py-3">{asset.lastInspection}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardCard>
  );
}

export default TopRiskAssetsTable;

