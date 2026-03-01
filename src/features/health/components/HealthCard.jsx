import SurfaceCard from '../../../shared/components/ui/SurfaceCard';

function HealthCard({ title, subtitle, children }) {
  return (
    <SurfaceCard title={title} subtitle={subtitle}>
      {children}
    </SurfaceCard>
  );
}

export default HealthCard;
