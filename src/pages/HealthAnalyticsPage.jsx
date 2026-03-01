import AssetRankingTable from '../features/health/components/AssetRankingTable';
import CriticalAssetsHighlight from '../features/health/components/CriticalAssetsHighlight';
import HealthScoreCircular from '../features/health/components/HealthScoreCircular';
import HealthTrendGraph from '../features/health/components/HealthTrendGraph';
import ZoneComparisonBarChart from '../features/health/components/ZoneComparisonBarChart';
import {
  assetRankingData,
  criticalAssets,
  healthTrendData,
  overallHealthScore,
  zoneComparisonData
} from '../features/health/data/healthMockData';

function HealthAnalyticsPage() {
  return (
    <div className="section-gap">
      <div className="page-header">
        <h2>Health &amp; Analytics</h2>
        <p>Unified health scoring, trends, and risk-focused prioritization insights.</p>
      </div>

      <div className="grid-2-3">
        <HealthScoreCircular score={overallHealthScore} />
        <HealthTrendGraph data={healthTrendData} />
      </div>

      <div className="grid-3-2">
        <ZoneComparisonBarChart data={zoneComparisonData} />
        <CriticalAssetsHighlight assets={criticalAssets} />
      </div>

      <AssetRankingTable data={assetRankingData} />
    </div>
  );
}

export default HealthAnalyticsPage;

