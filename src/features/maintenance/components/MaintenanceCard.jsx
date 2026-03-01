import SurfaceCard from '../../../shared/components/ui/SurfaceCard';

function MaintenanceCard({ title, subtitle, children, action }) {
  return (
    <SurfaceCard title={title} subtitle={subtitle} action={action}>
      {children}
    </SurfaceCard>
  );
}

export default MaintenanceCard;
