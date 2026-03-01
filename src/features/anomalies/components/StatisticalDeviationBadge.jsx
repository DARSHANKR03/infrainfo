import StatusBadge from '../../../shared/components/status/StatusBadge';

function StatisticalDeviationBadge({ sigma }) {
  let style = 'bg-success/15 text-success';
  let label = `Normal (${sigma.toFixed(1)}σ)`;

  if (sigma >= 4) {
    style = 'bg-danger/15 text-danger';
    label = `Severe (${sigma.toFixed(1)}σ)`;
  } else if (sigma >= 3) {
    style = 'bg-warning/15 text-warning';
    label = `Elevated (${sigma.toFixed(1)}σ)`;
  }

  return <StatusBadge value={label} variantMap={{ [label]: style }} />;
}

export default StatisticalDeviationBadge;

