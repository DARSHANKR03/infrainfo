import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import RuleCard from '../components/RuleCard';
import { getRuleById, simulateRule } from '../../../shared/services/mockApi/rulesApi';

function RuleSimulationPage() {
  const { ruleId } = useParams();
  const [rule, setRule] = useState(null);
  const [sampleValues, setSampleValues] = useState({});
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRule = async () => {
      const data = await getRuleById(ruleId);
      setRule(data);
      if (data) {
        const initialValues = data.conditions.reduce((acc, condition) => {
          acc[condition.parameter] = condition.value;
          return acc;
        }, {});
        setSampleValues(initialValues);
      }
      setLoading(false);
    };

    loadRule();
  }, [ruleId]);

  const uniqueParameters = useMemo(() => {
    if (!rule) return [];
    return [...new Set(rule.conditions.map((condition) => condition.parameter))];
  }, [rule]);

  const onRunSimulation = async (event) => {
    event.preventDefault();
    const response = await simulateRule(ruleId, sampleValues);
    setResult(response);
  };

  if (loading) {
    return (
      <div className="loading-state">
        <div className="loading-spinner" />
        <span>Loading simulation…</span>
      </div>
    );
  }

  if (!rule) {
    return (
      <div className="ui-card">
        <h3>Rule Not Found</h3>
        <Link to="/rules-thresholds" style={{ color: 'var(--accent)', fontSize: '0.875rem' }}>Return to rules list</Link>
      </div>
    );
  }

  return (
    <div className="section-gap">
      <div className="page-header-row">
        <div className="page-header">
          <h2>Rule Testing &amp; Simulation</h2>
          <p>Input sample values and calculate the resulting health classification.</p>
        </div>
        <Link to="/rules-thresholds" className="tbl-btn">← Back to Rules</Link>
      </div>

      <RuleCard title={rule.name} subtitle={`${rule.id} | Logic: ${rule.logic}`}>
        <div className="grid-2-1">
          <form
            className="sim-result-panel"
            onSubmit={onRunSimulation}
          >
            <h4>Input Sample Values</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '0.75rem', marginBottom: '0.75rem' }}>
              {uniqueParameters.map((parameter) => (
                <label key={parameter} className="form-label" style={{ display: 'block' }}>
                  {parameter}
                  <input
                    type="number"
                    value={sampleValues[parameter] ?? ''}
                    onChange={(event) =>
                      setSampleValues((prev) => ({
                        ...prev,
                        [parameter]: event.target.value
                      }))
                    }
                    className="form-input"
                    style={{ marginTop: '0.25rem' }}
                  />
                </label>
              ))}
            </div>
            <button type="submit" className="ui-btn ui-btn-primary">
              Run Simulation
            </button>
          </form>

          <div className="sim-result-panel">
            <h4>Classification Result</h4>
            {result ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.5rem' }}>
                <p style={{ fontSize: '0.875rem' }}>
                  Weighted Score: <strong>{result.weightedScore}</strong>
                </p>
                <span className={[
                  'badge',
                  result.classification === 'Healthy' ? 'badge-success' :
                  result.classification === 'Warning' ? 'badge-warning' :
                  result.classification === 'Critical' ? 'badge-danger' :
                  'badge-neutral'
                ].join(' ')}>
                  {result.classification}
                </span>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                  Rule Triggered: {result.triggerResult ? 'Yes' : 'No'}
                </p>
              </div>
            ) : (
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                Run a simulation to view calculated health classification.
              </p>
            )}
          </div>
        </div>
      </RuleCard>

      {result ? (
        <RuleCard title="Simulation Result">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-neutral-border">
                  <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-primary-500">
                    Parameter
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-primary-500">
                    Condition
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-primary-500">
                    Input
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-primary-500">
                    Weight
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-primary-500">
                    Result
                  </th>
                </tr>
              </thead>
              <tbody>
                {result.conditionResults.map((item, index) => (
                  <tr
                    key={`${item.parameter}-${index}`}
                    className="border-b border-neutral-border text-sm text-primary-700"
                  >
                    <td className="px-3 py-2">{item.parameter}</td>
                    <td className="px-3 py-2">
                      {item.operator} {item.value}
                    </td>
                    <td className="px-3 py-2">{item.input}</td>
                    <td className="px-3 py-2">{item.weight}%</td>
                    <td className="px-3 py-2">
                      <span className={item.passed ? 'badge badge-success' : 'badge badge-neutral'}>
                        {item.passed ? 'Pass' : 'Fail'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </RuleCard>
      ) : null}
    </div>
  );
}

export default RuleSimulationPage;
