const VARIANT_MAP = {
  Open:         'badge badge-danger',
  Acknowledged: 'badge badge-warning',
  Resolved:     'badge badge-success',
  Closed:       'badge badge-neutral',
  InProgress:   'badge badge-info'
};

function AlertStatusBadge({ status }) {
  const cls = VARIANT_MAP[status] || 'badge badge-neutral';
  return <span className={cls}>{status}</span>;
}

export default AlertStatusBadge;


