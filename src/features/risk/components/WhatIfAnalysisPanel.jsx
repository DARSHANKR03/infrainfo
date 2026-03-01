import RiskCard from './RiskCard';

function WhatIfAnalysisPanel({ scenario, onScenarioChange, scenarioResult }) {
  return (
    <RiskCard
      title="What-If Analysis"
      subtitle="Simulate intervention impact before budget commitment."
      className="border border-white/40 bg-white/65 backdrop-blur-xl shadow-lg"
    >
      <div className="space-y-4 rounded-2xl border border-white/45 bg-white/45 p-4 backdrop-blur-md">
        <Field label="Intervention Coverage (%)">
          <input
            type="number"
            min="0"
            max="100"
            value={scenario.coverage}
            onChange={(event) => onScenarioChange('coverage', Number(event.target.value))}
            className="w-full rounded-xl border border-neutral-border bg-white/70 px-3 py-2 text-sm text-primary-900 outline-none ds-transition focus:border-accent-400 focus:ring-2 focus:ring-accent-400/30"
          />
        </Field>
        <Field label="Failure Probability Reduction (%)">
          <input
            type="number"
            min="0"
            max="100"
            value={scenario.failureReduction}
            onChange={(event) =>
              onScenarioChange('failureReduction', Number(event.target.value))
            }
            className="w-full rounded-xl border border-neutral-border bg-white/70 px-3 py-2 text-sm text-primary-900 outline-none ds-transition focus:border-accent-400 focus:ring-2 focus:ring-accent-400/30"
          />
        </Field>
        <Field label="Cost Efficiency Gain (%)">
          <input
            type="number"
            min="0"
            max="100"
            value={scenario.costEfficiency}
            onChange={(event) =>
              onScenarioChange('costEfficiency', Number(event.target.value))
            }
            className="w-full rounded-xl border border-neutral-border bg-white/70 px-3 py-2 text-sm text-primary-900 outline-none ds-transition focus:border-accent-400 focus:ring-2 focus:ring-accent-400/30"
          />
        </Field>

        <div className="rounded-xl border border-white/50 bg-white/60 p-3 backdrop-blur">
          <p className="text-sm text-primary-700">Projected Risk Score</p>
          <p className="text-2xl font-bold text-primary-900">{scenarioResult.projectedRisk}</p>
          <p className="mt-1 text-xs text-primary-500">
            Expected exposure reduction: {scenarioResult.exposureReduction.toFixed(1)}%
          </p>
        </div>
      </div>
    </RiskCard>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-primary-700">{label}</span>
      {children}
    </label>
  );
}

export default WhatIfAnalysisPanel;
