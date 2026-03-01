import SurfaceCard from '../../../shared/components/ui/SurfaceCard';

function SectionCard({ title, subtitle, children, action, className = '' }) {
  return (
    <SurfaceCard title={title} subtitle={subtitle} action={action} className={className}>
      {children}
    </SurfaceCard>
  );
}

export default SectionCard;
