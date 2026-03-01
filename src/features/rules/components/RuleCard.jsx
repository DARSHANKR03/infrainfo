import SurfaceCard from '../../../shared/components/ui/SurfaceCard';

function RuleCard({ title, subtitle, children, action }) {
  return (
    <SurfaceCard title={title} subtitle={subtitle} action={action}>
      {children}
    </SurfaceCard>
  );
}

export default RuleCard;
