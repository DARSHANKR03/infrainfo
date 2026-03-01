import DashboardCard from './DashboardCard';
import { riskHeatmap } from '../../pages/dashboardData';

const levelStyles = {
  1: 'bg-accent-300/30 text-primary-700',
  2: 'bg-accent-300/50 text-primary-700',
  3: 'bg-accent-400/50 text-primary-900',
  4: 'bg-accent-400/70 text-primary-900',
  5: 'bg-accent-500/80 text-neutral-bg'
};

function RiskHeatmapSection() {
  return (
    <DashboardCard title="Risk Heatmap (Placeholder)">
      <div className="overflow-x-auto">
        <div className="min-w-[560px]">
          <div className="mb-2 grid grid-cols-6 gap-2 text-xs font-semibold uppercase tracking-wide text-primary-500">
            <div />
            {riskHeatmap.likelihood.map((item) => (
              <div key={item} className="text-center">{item}</div>
            ))}
          </div>

          {riskHeatmap.impact.map((impactLabel, rowIndex) => (
            <div key={impactLabel} className="mb-2 grid grid-cols-6 gap-2">
              <div className="flex items-center text-xs font-semibold text-primary-500">{impactLabel}</div>
              {riskHeatmap.cells[rowIndex].map((value, colIndex) => (
                <div
                  key={`${impactLabel}-${colIndex}`}
                  className={[
                    'flex h-12 items-center justify-center rounded-lg border border-neutral-border text-sm font-bold',
                    'ds-transition hover:shadow-lg hover:shadow-accent-400/30',
                    levelStyles[value]
                  ].join(' ')}
                >
                  R{value}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </DashboardCard>
  );
}

export default RiskHeatmapSection;

