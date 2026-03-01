function SecondaryButton({ children, className = '', ...props }) {
  return (
    <button
      type="button"
      className={[
        'inline-flex items-center justify-center rounded-2xl border border-neutral-border bg-neutral-bg px-4 py-2 text-sm font-semibold text-primary-700',
        'hover:bg-accent-300/20 ds-transition ds-press',
        'disabled:cursor-not-allowed disabled:opacity-60',
        className
      ].join(' ')}
      {...props}
    >
      {children}
    </button>
  );
}

export default SecondaryButton;
