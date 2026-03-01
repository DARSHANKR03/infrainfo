import { useMemo, useState } from 'react';
import KpiCards from '../components/dashboard/KpiCards';
import HealthDistributionChart from '../components/dashboard/HealthDistributionChart';
import HealthTrendChart from '../components/dashboard/HealthTrendChart';
import ZoneHealthChart from '../components/dashboard/ZoneHealthChart';
import TopRiskAssetsTable from '../components/dashboard/TopRiskAssetsTable';
import NotificationPanel from '../components/dashboard/NotificationPanel';
import RiskHeatmapSection from '../components/dashboard/RiskHeatmapSection';
import { healthTrendByPeriod } from './dashboardData';

function DashboardPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('30D');

  const trendData = useMemo(
    () => healthTrendByPeriod[selectedPeriod] ?? healthTrendByPeriod['30D'],
    [selectedPeriod]
  );

  return (
    <div className="section-gap">
      {/* Page header */}
      <div className="page-header">
        <h2>Municipal Infrastructure Dashboard</h2>
        <p>Citywide asset health, anomaly signals, and operational risk overview.</p>
      </div>

      {/* KPI row */}
      <KpiCards />

      {/* Health distribution + trend */}
      <div className="grid-2-3">
        <HealthDistributionChart />
        <HealthTrendChart
          data={trendData}
          period={selectedPeriod}
          onPeriodChange={setSelectedPeriod}
        />
      </div>

      {/* Zone health + notifications */}
      <div className="grid-2-1">
        <ZoneHealthChart />
        <NotificationPanel />
      </div>

      {/* Top risk assets + risk heatmap */}
      <div className="grid-2-1">
        <TopRiskAssetsTable />
        <RiskHeatmapSection />
      </div>
    </div>
  );
}

export default DashboardPage;

