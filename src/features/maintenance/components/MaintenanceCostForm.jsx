import { useEffect, useMemo, useState } from 'react';
import MaintenanceCard from './MaintenanceCard';

function MaintenanceCostForm({ cost, onCostChange }) {
  const total =
    Number(cost.laborCost || 0) +
    Number(cost.materialCost || 0) +
    Number(cost.downtimeCost || 0);
  const [animatedTotal, setAnimatedTotal] = useState(total);

  useEffect(() => {
    const durationMs = 450;
    const start = animatedTotal;
    const end = total;
    const startTime = performance.now();

    let frameId;
    const tick = (now) => {
      const progress = Math.min((now - startTime) / durationMs, 1);
      const value = Math.round(start + (end - start) * progress);
      setAnimatedTotal(value);
      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [total]);

  const miniChartData = useMemo(
    () => [
      { key: 'Labor', value: Number(cost.laborCost || 0), color: 'bg-accent-500' },
      { key: 'Material', value: Number(cost.materialCost || 0), color: 'bg-warning' },
      { key: 'Downtime', value: Number(cost.downtimeCost || 0), color: 'bg-danger' }
    ],
    [cost]
  );
  const maxChartValue = Math.max(...miniChartData.map((item) => item.value), 1);

  return (
    <MaintenanceCard title="Maintenance Cost Form" subtitle="Estimate maintenance effort and financial impact.">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Field label="Labor Cost">
          <input
            type="number"
            min="0"
            value={cost.laborCost}
            onChange={(event) => onCostChange('laborCost', event.target.value)}
            className="w-full rounded-xl border border-neutral-border px-3 py-2 text-sm text-primary-900 outline-none ds-transition hover:shadow-lg focus:border-accent-400 focus:ring-2 focus:ring-accent-400/30"
          />
        </Field>
        <Field label="Material Cost">
          <input
            type="number"
            min="0"
            value={cost.materialCost}
            onChange={(event) => onCostChange('materialCost', event.target.value)}
            className="w-full rounded-xl border border-neutral-border px-3 py-2 text-sm text-primary-900 outline-none ds-transition hover:shadow-lg focus:border-accent-400 focus:ring-2 focus:ring-accent-400/30"
          />
        </Field>
        <Field label="Downtime Cost">
          <input
            type="number"
            min="0"
            value={cost.downtimeCost}
            onChange={(event) => onCostChange('downtimeCost', event.target.value)}
            className="w-full rounded-xl border border-neutral-border px-3 py-2 text-sm text-primary-900 outline-none ds-transition hover:shadow-lg focus:border-accent-400 focus:ring-2 focus:ring-accent-400/30"
          />
        </Field>
        <Field label="Replacement Cost">
          <input
            type="number"
            min="0"
            value={cost.replacementCost}
            onChange={(event) => onCostChange('replacementCost', event.target.value)}
            className="w-full rounded-xl border border-neutral-border px-3 py-2 text-sm text-primary-900 outline-none ds-transition hover:shadow-lg focus:border-accent-400 focus:ring-2 focus:ring-accent-400/30"
          />
        </Field>
      </div>

      <section className="mt-5 rounded-2xl border border-neutral-border bg-neutral-bg p-4 shadow-lg">
        <p className="text-xs font-semibold uppercase tracking-wide text-primary-500">Cost Tracking</p>
        <p className="mt-2 text-2xl font-bold text-primary-900">
          {animatedTotal.toLocaleString()}
        </p>
        <p className="text-xs text-primary-500">Animated estimated repair total</p>

        <div className="mt-3 space-y-2">
          {miniChartData.map((item) => (
            <div key={item.key}>
              <div className="mb-1 flex items-center justify-between text-xs text-primary-700">
                <span>{item.key}</span>
                <span>{item.value.toLocaleString()}</span>
              </div>
              <div className="h-2 rounded-full bg-neutral-border">
                <div
                  className={[item.color, 'h-2 rounded-full ds-transition'].join(' ')}
                  style={{ width: `${(item.value / maxChartValue) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </MaintenanceCard>
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

export default MaintenanceCostForm;
