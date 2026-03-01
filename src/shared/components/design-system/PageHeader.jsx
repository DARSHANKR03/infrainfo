function PageHeader({ title, subtitle, actions }) {
  return (
    <header className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-2xl font-bold text-primary-900">{title}</h1>
        {subtitle ? <p className="text-sm text-primary-500">{subtitle}</p> : null}
      </div>
      {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
    </header>
  );
}

export default PageHeader;
