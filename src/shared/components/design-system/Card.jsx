import SurfaceCard from '../ui/SurfaceCard';

function Card({ title, subtitle, children, action, className = '' }) {
  return (
    <SurfaceCard
      title={title}
      subtitle={subtitle}
      action={action}
      className={['rounded-2xl p-5 shadow-lg ds-fade-in', className].join(' ')}
    >
      {children}
    </SurfaceCard>
  );
}

export default Card;
