function LogicBuilder({
  conditions,
  logic,
  parameterCatalog,
  operators,
  onLogicChange,
  onConditionChange,
  onAddCondition,
  onRemoveCondition,
  errors
}) {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-neutral-border bg-neutral-bg p-3">
        <p className="text-sm font-medium text-primary-700">Condition Logic:</p>
        <select
          value={logic}
          onChange={(event) => onLogicChange(event.target.value)}
          className={[
            'rounded-xl border px-3 py-1.5 text-sm outline-none ds-transition',
            logic === 'AND'
              ? 'border-accent-400 bg-accent-300/15 text-accent-500 focus:border-accent-500'
              : 'border-warning bg-warning/10 text-warning focus:border-warning'
          ].join(' ')}
        >
          <option value="AND">AND (all conditions must pass)</option>
          <option value="OR">OR (any condition can pass)</option>
        </select>
        <span
          className={[
            'rounded-full border px-2.5 py-1 text-xs font-semibold',
            logic === 'AND'
              ? 'border-accent-400/40 bg-accent-300/25 text-accent-500'
              : 'border-warning/40 bg-warning/15 text-warning'
          ].join(' ')}
        >
          {logic} Block Mode
        </span>
      </div>

      {conditions.map((condition, index) => (
        <div key={condition.id} className="space-y-3">
          {index > 0 ? (
            <div className="flex items-center justify-center">
              <span
                className={[
                  'rounded-full border px-2.5 py-1 text-[11px] font-semibold tracking-wide',
                  logic === 'AND'
                    ? 'border-accent-400/40 bg-accent-300/25 text-accent-500'
                    : 'border-warning/40 bg-warning/15 text-warning'
                ].join(' ')}
              >
                {logic}
              </span>
            </div>
          ) : null}
          <div className="rounded-2xl border border-neutral-border bg-white p-4 shadow-lg ds-transition hover:-translate-y-1 hover:shadow-lg">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="cursor-grab select-none rounded-lg border border-neutral-border bg-neutral-bg px-2 py-1 text-xs text-primary-500">
                  ::
                </span>
                <p className="text-xs font-semibold uppercase tracking-wide text-primary-500">
                  Condition {index + 1}
                </p>
              </div>
            {conditions.length > 1 ? (
              <button
                type="button"
                onClick={() => onRemoveCondition(condition.id)}
                  className="text-xs text-danger ds-transition hover:opacity-80"
              >
                Remove
              </button>
            ) : null}
          </div>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
              <Field label="Parameter" error={errors?.[condition.id]?.parameter}>
                <select
                  value={condition.parameter}
                  onChange={(event) =>
                    onConditionChange(condition.id, 'parameter', event.target.value)
                  }
                  className={inputClass(errors?.[condition.id]?.parameter)}
                >
                  <option value="">Select</option>
                  {parameterCatalog.map((parameter) => (
                    <option key={parameter} value={parameter}>
                      {parameter}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="Operator" error={errors?.[condition.id]?.operator}>
                <select
                  value={condition.operator}
                  onChange={(event) =>
                    onConditionChange(condition.id, 'operator', event.target.value)
                  }
                  className={inputClass(errors?.[condition.id]?.operator)}
                >
                  <option value="">Select</option>
                  {operators.map((operator) => (
                    <option key={operator} value={operator}>
                      {operator}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="Threshold Value" error={errors?.[condition.id]?.value}>
                <input
                  type="number"
                  value={condition.value}
                  onChange={(event) =>
                    onConditionChange(condition.id, 'value', event.target.value)
                  }
                  className={inputClass(errors?.[condition.id]?.value)}
                />
              </Field>

              <Field label="Weight (%)" error={errors?.[condition.id]?.weight}>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={condition.weight}
                  onChange={(event) =>
                    onConditionChange(condition.id, 'weight', event.target.value)
                  }
                  className={inputClass(errors?.[condition.id]?.weight)}
                />
              </Field>
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={onAddCondition}
        className="rounded-xl border border-neutral-border bg-white px-3 py-2 text-sm text-primary-700 ds-transition hover:bg-neutral-bg"
      >
        Add Condition
      </button>
    </div>
  );
}

function Field({ label, error, children }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-primary-700">{label}</span>
      {children}
      {error ? <span className="mt-1 block text-xs text-danger">{error}</span> : null}
    </label>
  );
}

function inputClass(hasError) {
  return [
    'w-full rounded-xl border bg-white px-3 py-2 text-sm text-primary-900 outline-none ds-transition hover:shadow-lg',
    hasError
      ? 'border-danger focus:border-danger focus:ring-2 focus:ring-danger/25'
      : 'border-neutral-border focus:border-accent-400 focus:ring-2 focus:ring-accent-400/30'
  ].join(' ');
}

export default LogicBuilder;
