import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import LogicBuilder from '../components/LogicBuilder';
import RuleCard from '../components/RuleCard';
import RuleVersionHistoryTable from '../components/RuleVersionHistoryTable';
import {
  createRule,
  getRuleById,
  getRuleMeta,
  getRuleVersionHistory,
  updateRule
} from '../../../shared/services/mockApi/rulesApi';

const defaultCondition = () => ({
  id: `C-${Date.now()}-${Math.random().toString(16).slice(2, 7)}`,
  parameter: '',
  operator: '',
  value: '',
  weight: ''
});

const defaultForm = {
  name: '',
  description: '',
  category: '',
  logic: 'AND',
  active: true,
  thresholds: {
    warning: 35,
    critical: 65,
    failed: 85
  },
  conditions: [defaultCondition()]
};

function RuleFormPage() {
  const { ruleId } = useParams();
  const isEditMode = Boolean(ruleId);
  const navigate = useNavigate();

  const [form, setForm] = useState(defaultForm);
  const [meta, setMeta] = useState({ parameterCatalog: [], operators: [] });
  const [versions, setVersions] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const loadMeta = async () => {
      const result = await getRuleMeta();
      setMeta(result);
    };
    loadMeta();
  }, []);

  useEffect(() => {
    const loadRule = async () => {
      if (!isEditMode) {
        setLoading(false);
        return;
      }

      const [rule, history] = await Promise.all([
        getRuleById(ruleId),
        getRuleVersionHistory(ruleId)
      ]);
      if (!rule) {
        navigate('/rules-thresholds');
        return;
      }

      setForm({
        ...rule,
        conditions: rule.conditions.map((condition) => ({
          ...condition,
          value: String(condition.value),
          weight: String(condition.weight)
        }))
      });
      setVersions(history);
      setLoading(false);
    };

    loadRule();
  }, [isEditMode, navigate, ruleId]);

  const pageTitle = useMemo(
    () => (isEditMode ? `Edit Rule ${ruleId}` : 'Add Rule'),
    [isEditMode, ruleId]
  );

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const updateThreshold = (field, value) => {
    setForm((prev) => ({
      ...prev,
      thresholds: {
        ...prev.thresholds,
        [field]: value
      }
    }));
  };

  const updateCondition = (conditionId, field, value) => {
    setForm((prev) => ({
      ...prev,
      conditions: prev.conditions.map((condition) =>
        condition.id === conditionId ? { ...condition, [field]: value } : condition
      )
    }));
  };

  const addCondition = () => {
    setForm((prev) => ({
      ...prev,
      conditions: [...prev.conditions, defaultCondition()]
    }));
  };

  const removeCondition = (conditionId) => {
    setForm((prev) => ({
      ...prev,
      conditions: prev.conditions.filter((condition) => condition.id !== conditionId)
    }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);

    const payload = {
      ...form,
      thresholds: {
        warning: Number(form.thresholds.warning),
        critical: Number(form.thresholds.critical),
        failed: Number(form.thresholds.failed)
      },
      conditions: form.conditions.map((condition) => ({
        ...condition,
        value: Number(condition.value),
        weight: Number(condition.weight)
      }))
    };

    if (isEditMode) {
      await updateRule(ruleId, payload);
    } else {
      await createRule(payload);
    }

    setSubmitting(false);
    navigate('/rules-thresholds');
  };

  if (loading) {
    return (
      <div className="loading-state">
        <div className="loading-spinner" />
        <span>Loading rule form…</span>
      </div>
    );
  }

  return (
    <div className="section-gap">
      <div className="page-header-row">
        <div className="page-header">
          <h2>{pageTitle}</h2>
          <p>Structured and configurable rule definitions for health scoring.</p>
        </div>
        <Link to="/rules-thresholds" className="tbl-btn">← Back to Rules</Link>
      </div>

      <RuleCard title="Rule Configuration">
        <form className="space-y-5" onSubmit={onSubmit}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Field label="Rule Name" error={errors.name}>
              <input
                value={form.name}
                onChange={(event) => updateField('name', event.target.value)}
                className={inputClass(errors.name)}
              />
            </Field>
            <Field label="Category" error={errors.category}>
              <input
                value={form.category}
                onChange={(event) => updateField('category', event.target.value)}
                className={inputClass(errors.category)}
              />
            </Field>
          </div>

          <Field label="Description" error={errors.description}>
            <textarea
              rows={3}
              value={form.description}
              onChange={(event) => updateField('description', event.target.value)}
              className={inputClass(errors.description)}
            />
          </Field>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <Field label="Warning Threshold" error={errors.warning}>
              <input
                type="number"
                value={form.thresholds.warning}
                onChange={(event) => updateThreshold('warning', event.target.value)}
                className={inputClass(errors.warning)}
              />
            </Field>
            <Field label="Critical Threshold" error={errors.critical}>
              <input
                type="number"
                value={form.thresholds.critical}
                onChange={(event) => updateThreshold('critical', event.target.value)}
                className={inputClass(errors.critical)}
              />
            </Field>
            <Field label="Failed Threshold" error={errors.failed}>
              <input
                type="number"
                value={form.thresholds.failed}
                onChange={(event) => updateThreshold('failed', event.target.value)}
                className={inputClass(errors.failed)}
              />
            </Field>
            <Field label="Rule Active">
              <div className="flex h-10 items-center">
                <input
                  type="checkbox"
                  checked={form.active}
                  onChange={(event) => updateField('active', event.target.checked)}
                />
              </div>
            </Field>
          </div>

          <LogicBuilder
            conditions={form.conditions}
            logic={form.logic}
            parameterCatalog={meta.parameterCatalog}
            operators={meta.operators}
            onLogicChange={(value) => updateField('logic', value)}
            onConditionChange={updateCondition}
            onAddCondition={addCondition}
            onRemoveCondition={removeCondition}
            errors={errors.conditions}
          />
          {errors.conditionsGeneral ? (
            <p className="text-xs text-danger">{errors.conditionsGeneral}</p>
          ) : null}

          <button
            type="submit"
            disabled={submitting}
            className="rounded-lg bg-accent-500 px-4 py-2 text-sm font-semibold text-white hover:bg-accent-400 disabled:opacity-60"
          >
            {submitting ? 'Saving…' : isEditMode ? 'Update Rule' : 'Create Rule'}
          </button>
        </form>
      </RuleCard>

      {isEditMode ? <RuleVersionHistoryTable versions={versions} /> : null}
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
    'w-full rounded-xl border px-3 py-2 text-sm outline-none ds-transition',
    hasError ? 'border-danger' : 'border-neutral-border'
  ].join(' ');
}

function validate(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = 'Rule name is required.';
  if (!form.category.trim()) errors.category = 'Category is required.';
  if (!form.description.trim()) errors.description = 'Description is required.';

  const warning = Number(form.thresholds.warning);
  const critical = Number(form.thresholds.critical);
  const failed = Number(form.thresholds.failed);

  if (Number.isNaN(warning)) errors.warning = 'Invalid number.';
  if (Number.isNaN(critical)) errors.critical = 'Invalid number.';
  if (Number.isNaN(failed)) errors.failed = 'Invalid number.';
  if (!errors.warning && !errors.critical && warning >= critical) {
    errors.critical = 'Critical must be greater than warning.';
  }
  if (!errors.critical && !errors.failed && critical >= failed) {
    errors.failed = 'Failed must be greater than critical.';
  }

  if (!form.conditions.length) {
    errors.conditionsGeneral = 'At least one condition is required.';
  }

  const conditionErrors = {};
  form.conditions.forEach((condition) => {
    const rowError = {};
    if (!condition.parameter) rowError.parameter = 'Required.';
    if (!condition.operator) rowError.operator = 'Required.';
    if (condition.value === '' || Number.isNaN(Number(condition.value))) {
      rowError.value = 'Numeric value required.';
    }
    const weight = Number(condition.weight);
    if (condition.weight === '' || Number.isNaN(weight)) {
      rowError.weight = 'Weight required.';
    } else if (weight < 0 || weight > 100) {
      rowError.weight = 'Weight must be 0-100.';
    }
    if (Object.keys(rowError).length) {
      conditionErrors[condition.id] = rowError;
    }
  });
  if (Object.keys(conditionErrors).length) {
    errors.conditions = conditionErrors;
  }

  return errors;
}

export default RuleFormPage;

