function SurfaceCard({ title, subtitle, children, action, className = '' }) {
  return (
    <section className={['ui-card', className].join(' ')}>
      {(title || subtitle || action) && (
        <div className="ui-card-header">
          <div>
            {title    && <h3 className="ui-card-title">{title}</h3>}
            {subtitle && <p style={{ fontSize: 13, color: 'var(--primary-400)', marginTop: 2 }}>{subtitle}</p>}
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      {children}
    </section>
  );
}

export default SurfaceCard;

