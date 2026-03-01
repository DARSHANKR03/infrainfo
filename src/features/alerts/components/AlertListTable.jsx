import { Link } from 'react-router-dom';
import AlertSeverityBadge from './AlertSeverityBadge';
import AlertStatusBadge from './AlertStatusBadge';

const STRIPE_CLASS = {
  Low:       'alert-stripe-low',
  Medium:    'alert-stripe-medium',
  High:      'alert-stripe-high',
  Critical:  'alert-stripe-critical',
  Emergency: 'alert-stripe-emergency'
};

function AlertListTable({ rows, onAcknowledge, onResolve }) {
  if (!rows || rows.length === 0) {
    return (
      <div className="ui-card">
        <div className="empty-state">
          <div className="empty-state-icon">🔔</div>
          <p style={{ fontSize: 14, color: 'var(--primary-500)', marginTop: 4 }}>No alerts match the current filter.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="ui-table-wrap">
      <table className="ui-table">
        <thead>
          <tr>
            <th>Alert</th>
            <th>Severity</th>
            <th>Status</th>
            <th>Type</th>
            <th>Detected</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((alert) => (
            <tr key={alert.id} className="tbl-row-hover">
              <td
                className={STRIPE_CLASS[alert.severity] || 'alert-stripe-high'}
                style={{ paddingLeft: '1rem' }}
              >
                <p style={{ fontWeight: 600, color: 'var(--primary-900)', fontSize: 13 }}>{alert.title}</p>
                <p style={{ fontSize: 11.5, color: 'var(--neutral-muted)', marginTop: 2 }}>
                  {alert.id} &nbsp;·&nbsp; {alert.assetId}
                </p>
              </td>
              <td><AlertSeverityBadge severity={alert.severity} /></td>
              <td><AlertStatusBadge status={alert.status} /></td>
              <td style={{ color: 'var(--primary-500)', fontSize: 13 }}>{alert.type}</td>
              <td style={{ color: 'var(--neutral-muted)', fontSize: 12.5, whiteSpace: 'nowrap' }}>{alert.detectedAt}</td>
              <td>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  <Link
                    to={`/alerts/${alert.id}`}
                    className="tbl-btn tbl-btn-view"
                  >
                    View
                  </Link>
                  <button
                    type="button"
                    onClick={() => onAcknowledge(alert.id)}
                    disabled={alert.status === 'Resolved' || alert.status === 'Acknowledged'}
                    className="tbl-btn tbl-btn-warn"
                  >
                    Acknowledge
                  </button>
                  <button
                    type="button"
                    onClick={() => onResolve(alert.id)}
                    disabled={alert.status === 'Resolved'}
                    className="tbl-btn tbl-btn-ok"
                  >
                    Resolve
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AlertListTable;
