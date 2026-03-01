import { useEffect, useState } from 'react';
import RiskCard from './RiskCard';

function BudgetAllocationSimulator({ budget, onBudgetChange, projectedReduction }) {
  const [animatedReduction, setAnimatedReduction] = useState(projectedReduction);
  const totalAllocation =
    Number(budget.preventive || 0) +
    Number(budget.predictive || 0) +
    Number(budget.corrective || 0);

  useEffect(() => {
    const durationMs = 350;
    const start = animatedReduction;
    const end = projectedReduction;
    const startTime = performance.now();

    let frameId;
    const tick = (now) => {
      const progress = Math.min((now - startTime) / durationMs, 1);
      const value = start + (end - start) * progress;
      setAnimatedReduction(value);
      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [projectedReduction]);

  return (
    <RiskCard
      title="Budget Allocation Simulator"
      subtitle="Adjust funding strategy and view projected risk reduction."
      className="ds-hover-lift"
    >
      <div className="space-y-4">
        <Slider
          label="Preventive"
          value={budget.preventive}
          onChange={(value) => onBudgetChange('preventive', value)}
        />
        <Slider
          label="Predictive"
          value={budget.predictive}
          onChange={(value) => onBudgetChange('predictive', value)}
        />
        <Slider
          label="Corrective"
          value={budget.corrective}
          onChange={(value) => onBudgetChange('corrective', value)}
        />

        <div className="rounded-xl border border-neutral-border bg-neutral-bg p-3">
          <p className="text-sm text-primary-700">Total Allocation: {totalAllocation}%</p>
          <p className="mt-1 text-sm font-semibold text-primary-900">
            Projected Risk Reduction: {animatedReduction.toFixed(1)}%
          </p>
        </div>
      </div>
    </RiskCard>
  );
}

function Slider({ label, value, onChange }) {
  const fillStyle = {
    background: `linear-gradient(to right, #3B82F6 0%, #3B82F6 ${value}%, #E2E8F0 ${value}%, #E2E8F0 100%)`
  };

  return (
    <label className="block">
      <div className="mb-1 flex items-center justify-between">
        <span className="text-sm font-medium text-primary-700">{label}</span>
        <span className="text-sm font-semibold text-primary-900">{value}%</span>
      </div>
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        style={fillStyle}
        className="h-2 w-full cursor-pointer appearance-none rounded-full outline-none ds-transition [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-accent-500 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent-500"
      />
    </label>
  );
}

export default BudgetAllocationSimulator;
