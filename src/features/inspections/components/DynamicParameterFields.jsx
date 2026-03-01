function DynamicParameterFields({
  parameters,
  values,
  errors,
  onParameterChange
}) {
  if (!parameters.length) {
    return (
      <p className="rounded-xl border border-dashed border-neutral-border p-3 text-sm text-primary-500">
        Select an asset type to load dynamic inspection parameters.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {parameters.map((parameter) => (
        <article
          key={parameter.key}
          className="rounded-xl border border-neutral-border bg-white p-4 shadow-lg ds-fade-in"
        >
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-primary-700">
              {parameter.label}
            </span>
            <input
              type={parameter.type}
              min={parameter.min}
              max={parameter.max}
              value={values[parameter.key] ?? ''}
              onChange={(event) => onParameterChange(parameter.key, event.target.value)}
              className={[
                'w-full rounded-xl border px-3 py-2 text-sm outline-none ds-transition hover:shadow-lg',
                errors[parameter.key]
                  ? 'border-danger focus:border-danger focus:ring-2 focus:ring-danger/25'
                  : 'border-neutral-border focus:border-accent-400 focus:ring-2 focus:ring-accent-400/30'
              ].join(' ')}
            />
            {errors[parameter.key] ? (
              <span className="mt-1 block text-xs text-danger">{errors[parameter.key]}</span>
            ) : (
              <span className="mt-1 block text-xs text-primary-500">
                Range: {parameter.min} to {parameter.max}
              </span>
            )}
          </label>
        </article>
      ))}
    </div>
  );
}

export default DynamicParameterFields;
