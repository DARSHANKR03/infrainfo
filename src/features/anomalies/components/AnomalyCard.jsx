import SurfaceCard from '../../../shared/components/ui/SurfaceCard';

function AnomalyCard({ title, subtitle, children }) {
  return (
    <SurfaceCard title={title} subtitle={subtitle} className="ds-hover-scale ds-transition">
      {children}
    </SurfaceCard>
  );
}

export default AnomalyCard;
