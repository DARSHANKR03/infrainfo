import SurfaceCard from '../../../shared/components/ui/SurfaceCard';

function RiskCard({ title, subtitle, children, className = '' }) {
  return (
    <SurfaceCard title={title} subtitle={subtitle} className={className}>
      {children}
    </SurfaceCard>
  );
}

export default RiskCard;
