function PrimaryButton({ children, className = '', ...props }) {
  return (
    <button
      type="button"
      className={[
        'inline-flex items-center justify-center rounded-2xl bg-accent-500 px-4 py-2 text-sm font-semibold text-neutral-bg',
        'hover:bg-accent-400 ds-transition ds-press',
        'disabled:cursor-not-allowed disabled:opacity-60',
        className
      ].join(' ')}
      {...props}
    >
      {children}
    </button>
  );
}

export default PrimaryButton;
