import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import RuleListTable from '../components/RuleListTable';
import { listRules, toggleRuleActive } from '../../../shared/services/mockApi/rulesApi';

function RulesListPage() {
  const [rules, setRules] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRules();
  }, []);

  const handleToggleActive = async (ruleId) => {
    await toggleRuleActive(ruleId);
    await loadRules();
  };

  async function loadRules() {
    const result = await listRules();
    setRules(result);
    setLoading(false);
  }

  if (loading) {
    return (
      <div className="loading-state">
        <div className="loading-spinner" />
        <span>Loading rules…</span>
      </div>
    );
  }

  return (
    <div className="section-gap">
      <div className="page-header-row">
        <div className="page-header">
          <h2>Rule &amp; Threshold Management</h2>
          <p>Configure scoring rules, activation controls, and threshold logic.</p>
        </div>
        <Link to="/rules-thresholds/new" className="ui-btn ui-btn-primary">+ Add Rule</Link>
      </div>
      <RuleListTable rules={rules} onToggleActive={handleToggleActive} />
    </div>
  );
}

export default RulesListPage;

