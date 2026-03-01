import { useEffect, useMemo, useState } from 'react';
import AlertListTable from '../components/AlertListTable';
import {
  acknowledgeAlert,
  listAlerts,
  resolveAlert
} from '../../../shared/services/mockApi/alertsApi';

const severityOptions = ['All', 'Low', 'Medium', 'High', 'Emergency'];

function AlertsListPage() {
  const [alerts, setAlerts] = useState([]);
  const [severityFilter, setSeverityFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAlerts();
  }, []);

  const filteredAlerts = useMemo(() => {
    if (severityFilter === 'All') {
      return alerts;
    }
    return alerts.filter((alert) => alert.severity === severityFilter);
  }, [alerts, severityFilter]);

  const handleAcknowledge = async (alertId) => {
    await acknowledgeAlert(alertId);
    await loadAlerts();
  };

  const handleResolve = async (alertId) => {
    await resolveAlert(alertId);
    await loadAlerts();
  };

  async function loadAlerts() {
    const data = await listAlerts();
    setAlerts(data);
    setLoading(false);
  }

  if (loading) {
    return (
      <div className="loading-state">
        <div className="loading-spinner" />
        <span>Loading alerts…</span>
      </div>
    );
  }

  const totalCount    = alerts.length;
  const filteredCount = filteredAlerts.length;

  return (
    <div className="section-gap">
      {/* Page header */}
      <div className="page-header-row">
        <div className="page-header">
          <h2>Alerts &amp; Notifications</h2>
          <p>Triage and action critical municipal infrastructure alerts in real time.</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
          <span className="badge badge-neutral" style={{ fontSize: 12 }}>
            {filteredCount} of {totalCount} alerts
          </span>
        </div>
      </div>

      {/* Filter bar */}
      <div className="filter-bar">
        {severityOptions.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setSeverityFilter(item)}
            className={['filter-pill', severityFilter === item ? 'active' : ''].join(' ')}
          >
            {item}
          </button>
        ))}
      </div>

      <AlertListTable
        rows={filteredAlerts}
        onAcknowledge={handleAcknowledge}
        onResolve={handleResolve}
      />
    </div>
  );
}

export default AlertsListPage;
