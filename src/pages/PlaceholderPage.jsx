function PlaceholderPage({ title, description, icon = '🚧' }) {
  return (
    <div>
      {/* Page header */}
      <div className="page-header">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>

      {/* Empty state card */}
      <div className="placeholder-page">
        <div className="placeholder-icon">{icon}</div>
        <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--primary-900)', marginBottom: '0.4rem' }}>
          {title}
        </h3>
        <p style={{ fontSize: 14, color: 'var(--primary-400)', maxWidth: 420, lineHeight: 1.6 }}>
          {description}
        </p>
        <p style={{ marginTop: '1.25rem', fontSize: 12.5, color: 'var(--neutral-muted)' }}>
          This feature is under development and will be available soon.
        </p>
      </div>
    </div>
  );
}

export default PlaceholderPage;

