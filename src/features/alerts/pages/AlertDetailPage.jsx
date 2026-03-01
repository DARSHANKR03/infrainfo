import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import AlertEscalationHistoryTable from '../components/AlertEscalationHistoryTable';
import AlertSeverityBadge from '../components/AlertSeverityBadge';
import AlertStatusBadge from '../components/AlertStatusBadge';
import {
  acknowledgeAlert,
  getAlertById,
  resolveAlert
} from '../../../shared/services/mockApi/alertsApi';

function AlertDetailPage() {
  const { alertId } = useParams();
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAlert();
  }, [alertId]);

  const handleAcknowledge = async () => {
    await acknowledgeAlert(alertId);
    await loadAlert();
  };

  const handleResolve = async () => {
    await resolveAlert(alertId);
    await loadAlert();
  };

  async function loadAlert() {
    const data = await getAlertById(alertId);
    setAlert(data);
    setLoading(false);
  }

  if (loading) {
    return (
      <div className="loading-state">
        <div className="loading-spinner" />
        <span>Loading alert details…</span>
      </div>
    );
  }

  if (!alert) {
    return (
      <div className="ui-card">
        <h2>Alert not found</h2>
        <Link to="/alerts" className="back-link" style={{ marginTop: '0.75rem', display: 'inline-block', color: 'var(--accent)', fontSize: '0.875rem' }}>
          Return to alerts list
        </Link>
      </div>
    );
  }

  return (
    <div className="section-gap">
      <div className="page-header-row">
        <div className="page-header">
          <h2>Alert Detail</h2>
          <p>Full context and escalation trail for {alert.id}.</p>
        </div>
        <Link to="/alerts" className="tbl-btn">
          ← Back to Alerts
        </Link>
      </div>

      <div className="ui-card">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
          <AlertSeverityBadge severity={alert.severity} />
          <AlertStatusBadge status={alert.status} />
        </div>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>{alert.title}</h3>
        <p style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{alert.description}</p>

        <div className="grid-2-1" style={{ marginTop: '1rem' }}>
          <Info label="Asset" value={`${alert.assetName} (${alert.assetId})`} />
          <Info label="Type" value={alert.type} />
          <Info label="Detected At" value={alert.detectedAt} />
          <Info label="Current Status" value={alert.status} />
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.25rem' }}>
          <button
            type="button"
            onClick={handleAcknowledge}
            disabled={alert.status === 'Resolved'}
            className="tbl-btn tbl-btn-warn"
            style={{ opacity: alert.status === 'Resolved' ? 0.5 : 1 }}
          >
            Acknowledge
          </button>
          <button
            type="button"
            onClick={handleResolve}
            disabled={alert.status === 'Resolved'}
            className="tbl-btn tbl-btn-ok"
            style={{ opacity: alert.status === 'Resolved' ? 0.5 : 1 }}
          >
            Resolve
          </button>
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: '0.75rem', fontWeight: 600 }}>Escalation History</h3>
        <AlertEscalationHistoryTable entries={alert.escalationHistory} />
      </div>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div className="ui-card" style={{ padding: '0.625rem 0.75rem' }}>
      <p style={{ fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>{label}</p>
      <p style={{ fontSize: '0.875rem', color: 'var(--text-primary)' }}>{value}</p>
    </div>
  );
}

export default AlertDetailPage;
