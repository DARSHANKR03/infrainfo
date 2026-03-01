function SectionContainer({ children, className = '' }) {
  return (
    <section
      className={[
        'mx-auto w-full max-w-content px-6 py-6',
        className
      ].join(' ')}
    >
      <div className="grid gap-6">{children}</div>
    </section>
  );
}

export default SectionContainer;
