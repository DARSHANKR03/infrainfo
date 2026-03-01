import SurfaceCard from '../../shared/components/ui/SurfaceCard';

function DashboardCard({ title, children, action }) {
  return (
    <SurfaceCard
      title={title}
      action={action}
      className="p-5"
    >
      {children}
    </SurfaceCard>
  );
}

export default DashboardCard;
