function FormField({ label, error, children, className = '' }) {
  return (
    <label className={['block', className].join(' ')}>
      {label ? <span className="mb-1 block text-sm font-medium text-primary-700">{label}</span> : null}
      {children}
      {error ? <span className="mt-1 block text-xs text-danger">{error}</span> : null}
    </label>
  );
}

export function getInputClass(hasError) {
  return [
    'w-full rounded-xl border px-3 py-2 text-sm outline-none ds-transition',
    hasError
      ? 'border-danger focus:border-danger focus:ring-2 focus:ring-danger/25'
      : 'border-neutral-border focus:border-accent-400 focus:ring-2 focus:ring-accent-400/30'
  ].join(' ');
}

export default FormField;

