const RISK_STYLES = {
  Low: 'bg-success/15 text-success',
  Medium: 'bg-accent-300/20 text-accent-500',
  High: 'bg-warning/15 text-warning',
  'Very High': 'bg-danger/15 text-danger'
};

function RiskBadge({ rank }) {
  return (
    <span
      className={[
        'inline-flex rounded-full px-3 py-1 text-xs font-semibold',
        RISK_STYLES[rank] || 'bg-neutral-bg text-primary-700'
      ].join(' ')}
    >
      Risk: {rank}
    </span>
  );
}

export default RiskBadge;

