const VARIANT_MAP = {
  Low:       'badge badge-success',
  Medium:    'badge badge-info',
  High:      'badge badge-warning',
  Critical:  'badge badge-danger',
  Emergency: 'badge badge-danger'
};

function AlertSeverityBadge({ severity }) {
  const cls = VARIANT_MAP[severity] || 'badge badge-neutral';
  return (
    <span className={cls}>{severity}</span>
  );
}

export default AlertSeverityBadge;
