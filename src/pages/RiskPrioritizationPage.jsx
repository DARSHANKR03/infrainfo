import { useMemo, useState } from 'react';
import AssetCriticalityTable from '../features/risk/components/AssetCriticalityTable';
import BudgetAllocationSimulator from '../features/risk/components/BudgetAllocationSimulator';
import HighRiskRankingTable from '../features/risk/components/HighRiskRankingTable';
import RiskScoringDisplay from '../features/risk/components/RiskScoringDisplay';
import RiskTrendGraph from '../features/risk/components/RiskTrendGraph';
import WhatIfAnalysisPanel from '../features/risk/components/WhatIfAnalysisPanel';
import {
  budgetBaseline,
  criticalityIndexData,
  highRiskRanking,
  overallRiskScore,
  riskTrendData
} from '../features/risk/data/riskMockData';

function RiskPrioritizationPage() {
  const [budget, setBudget] = useState(budgetBaseline);
  const [scenario, setScenario] = useState({
    coverage: 35,
    failureReduction: 22,
    costEfficiency: 18
  });

  const projectedReduction = useMemo(() => {
    const preventiveEffect = budget.preventive * 0.18;
    const predictiveEffect = budget.predictive * 0.26;
    const correctiveEffect = budget.corrective * 0.08;
    return (preventiveEffect + predictiveEffect + correctiveEffect) / 10;
  }, [budget]);

  const scenarioResult = useMemo(() => {
    const reductionFactor =
      scenario.coverage * 0.25 +
      scenario.failureReduction * 0.45 +
      scenario.costEfficiency * 0.2;
    const exposureReduction = Math.min(60, reductionFactor / 2.5);
    const projectedRisk = Math.max(
      25,
      Math.round(overallRiskScore - exposureReduction * 0.35)
    );

    return {
      projectedRisk,
      exposureReduction
    };
  }, [scenario]);

  const kpis = useMemo(() => {
    const highRiskAssets = highRiskRanking.filter((item) => item.riskScore >= 90).length;
    const avgCriticality = Math.round(
      criticalityIndexData.reduce((sum, item) => sum + item.criticalityIndex, 0) /
        criticalityIndexData.length
    );
    const projectedExposure = scenarioResult.exposureReduction.toFixed(1);

    return [
      { label: 'Overall Risk Score', value: overallRiskScore, suffix: '/100' },
      { label: 'High-Risk Assets', value: highRiskAssets, suffix: 'assets' },
      { label: 'Average Criticality', value: avgCriticality, suffix: '/100' },
      { label: 'Projected Exposure Reduction', value: projectedExposure, suffix: '%' }
    ];
  }, [scenarioResult.exposureReduction]);

  return (
    <div className="section-gap">
      <div className="page-header">
        <h2>Risk &amp; Prioritization Dashboard</h2>
        <p>Prioritize interventions through risk intelligence, budget simulation, and what-if planning.</p>
      </div>

      {/* KPI tiles */}
      <div className="grid-kpi">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="kpi-card">
            <div className="accent-bar-danger" />
            <p className="kpi-label">{kpi.label}</p>
            <div style={{ marginTop: '0.6rem', display: 'flex', alignItems: 'baseline', gap: '0.4rem' }}>
              <span className="kpi-value">{kpi.value}</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--accent-500)' }}>{kpi.suffix}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid-2-3">
        <RiskScoringDisplay score={overallRiskScore} />
        <RiskTrendGraph data={riskTrendData} />
      </div>

      <div className="grid-3-2">
        <AssetCriticalityTable rows={criticalityIndexData} />
        <HighRiskRankingTable rows={highRiskRanking} />
      </div>

      <div style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))' }}>
        <BudgetAllocationSimulator
          budget={budget}
          onBudgetChange={(field, value) =>
            setBudget((prev) => ({
              ...prev,
              [field]: value
            }))
          }
          projectedReduction={projectedReduction}
        />
        <WhatIfAnalysisPanel
          scenario={scenario}
          onScenarioChange={(field, value) =>
            setScenario((prev) => ({
              ...prev,
              [field]: value
            }))
          }
          scenarioResult={scenarioResult}
        />
      </div>
    </div>
  );
}

export default RiskPrioritizationPage;
