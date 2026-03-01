import StatusBadge from '../../../shared/components/status/StatusBadge';

function HealthClassificationBadge({ score }) {
  let label = 'Healthy';
  if (score < 50) label = 'Critical';
  else if (score < 70) label = 'Warning';
  return <StatusBadge value={label} />;
}

export default HealthClassificationBadge;


