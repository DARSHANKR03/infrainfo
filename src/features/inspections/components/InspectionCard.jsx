import SurfaceCard from '../../../shared/components/ui/SurfaceCard';

function InspectionCard({ title, subtitle, children, action }) {
  return (
    <SurfaceCard title={title} subtitle={subtitle} action={action}>
      {children}
    </SurfaceCard>
  );
}

export default InspectionCard;
