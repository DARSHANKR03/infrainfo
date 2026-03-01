/* Single source of truth for status → badge styling.
   No Tailwind opacity modifiers — pure CSS-var-based badge classes. */
const STATUS_PALETTE = {
  Healthy:        'badge badge-success',
  Active:         'badge badge-success',
  Completed:      'badge badge-success',
  Resolved:       'badge badge-success',
  Closed:         'badge badge-success',
  Operational:    'badge badge-success',
  Warning:        'badge badge-warning',
  'In Progress':  'badge badge-warning',
  Acknowledged:   'badge badge-warning',
  Deferred:       'badge badge-warning',
  Critical:       'badge badge-danger',
  Emergency:      'badge badge-danger',
  Failed:         'badge badge-danger',
  Open:           'badge badge-danger',
  Overdue:        'badge badge-danger',
  Inactive:       'badge badge-neutral',
  Pending:        'badge badge-neutral',
  Planned:        'badge badge-neutral',
  Cancelled:      'badge badge-neutral',
  Unknown:        'badge badge-neutral',
  Medium:         'badge badge-info',
  Info:           'badge badge-info',
  Low:            'badge badge-accent',
  High:           'badge badge-warning',
};

function StatusBadge({ value, className = '' }) {
  const cls = STATUS_PALETTE[value] || 'badge badge-neutral';
  return (
    <span className={[cls, className].filter(Boolean).join(' ')}>
      {value}
    </span>
  );
}

export default StatusBadge;


