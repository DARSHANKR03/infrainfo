const statusPalette = {
  Healthy:       'badge badge-success',
  Active:        'badge badge-success',
  Completed:     'badge badge-success',
  Resolved:      'badge badge-success',
  Warning:       'badge badge-warning',
  'In Progress': 'badge badge-warning',
  High:          'badge badge-warning',
  Critical:      'badge badge-danger',
  Emergency:     'badge badge-danger',
  Failed:        'badge badge-danger',
  Open:          'badge badge-danger',
  Inactive:      'badge badge-neutral',
  Pending:       'badge badge-neutral',
  Medium:        'badge badge-info',
  Low:           'badge badge-accent',
  Info:          'badge badge-accent'
};

function StatusBadge({ value, className = '' }) {
  const cls = statusPalette[value] || 'badge badge-neutral';
  return <span className={[cls, className].filter(Boolean).join(' ')}>{value}</span>;
}

export default StatusBadge;

