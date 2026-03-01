import { Link } from 'react-router-dom';

function RuleListTable({ rules, onToggleActive }) {
  return (
    <div className="ui-table-wrap">
      <table className="ui-table">
        <thead>
          <tr>
            <th>Rule</th>
            <th>Category</th>
            <th>Logic</th>
            <th>Conditions</th>
            <th>Status</th>
            <th>Updated</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rules.length ? rules.map((rule) => (
            <tr key={rule.id}>
              <td>
                <p className="tbl-primary">{rule.name}</p>
                <p className="tbl-sub">{rule.id}</p>
              </td>
              <td>{rule.category}</td>
              <td>
                <span className={rule.logic === 'AND' ? 'badge-logic badge-logic-and' : 'badge-logic badge-logic-or'}>
                  {rule.logic}
                </span>
              </td>
              <td style={{ textAlign: 'center' }}>{rule.conditions.length}</td>
              <td>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={rule.active}
                    onClick={() => onToggleActive(rule.id)}
                    className={['tbl-toggle', rule.active ? 'is-on' : ''].filter(Boolean).join(' ')}
                  >
                    <span className="tbl-toggle-thumb" />
                  </button>
                  <span className={rule.active ? 'badge badge-success' : 'badge badge-neutral'}>
                    {rule.active ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </td>
              <td>
                <p className="tbl-primary" style={{ fontWeight: 500 }}>{rule.updatedAt}</p>
                <p className="tbl-sub">{rule.updatedBy}</p>
              </td>
              <td>
                <div className="tbl-actions">
                  <Link to={`/rules-thresholds/${rule.id}/edit`} className="tbl-btn">Edit</Link>
                  <Link to={`/rules-thresholds/${rule.id}/simulate`} className="tbl-btn tbl-btn-view">Simulate</Link>
                </div>
              </td>
            </tr>
          )) : (
            <tr><td colSpan={7} className="tbl-empty">No rules configured.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default RuleListTable;
