import SurfaceCard from '../../../shared/components/ui/SurfaceCard';

function ReportCard({ title, subtitle, children, action, className = '' }) {
  return (
    <SurfaceCard
      title={title}
      subtitle={subtitle}
      action={action}
      className={['bg-white ds-transition hover:shadow-lg', className].join(' ')}
    >
      {children}
    </SurfaceCard>
  );
}

export default ReportCard;
