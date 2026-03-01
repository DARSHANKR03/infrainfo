import SurfaceCard from '../../../shared/components/ui/SurfaceCard';

function AdminCard({ title, subtitle, children, action }) {
  return (
    <SurfaceCard title={title} subtitle={subtitle} action={action}>
      {children}
    </SurfaceCard>
  );
}

export default AdminCard;
