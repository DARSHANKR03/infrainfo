import { useState } from 'react';
import { Link } from 'react-router-dom';
import AdminCard from '../components/AdminCard';

function SystemConfigurationPage() {
  const [config, setConfig] = useState({
    anomalySensitivity: 70,
    autoEscalationMinutes: 20,
    retentionDays: 365,
    enableEmailAlerts: true,
    enableSmsAlerts: false,
    enableAutoReportDispatch: true
  });

  return (
    <div className="section-gap">
      <div className="page-header-row">
        <div className="page-header">
          <h2>System Configuration</h2>
          <p>Platform-level policy and runtime controls.</p>
        </div>
        <Link to="/administration" className="tbl-btn">
          ← Back to Admin
        </Link>
      </div>

      <AdminCard title="Core Configuration">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Field label={`Anomaly Sensitivity (${config.anomalySensitivity})`}>
            <input
              type="range"
              min="0"
              max="100"
              value={config.anomalySensitivity}
              onChange={(event) =>
                setConfig((prev) => ({
                  ...prev,
                  anomalySensitivity: Number(event.target.value)
                }))
              }
              className="w-full"
            />
          </Field>
          <Field label="Auto Escalation (minutes)">
            <input
              type="number"
              min="1"
              value={config.autoEscalationMinutes}
              onChange={(event) =>
                setConfig((prev) => ({
                  ...prev,
                  autoEscalationMinutes: Number(event.target.value)
                }))
              }
              className="w-full rounded-xl border border-neutral-border px-3 py-2 text-sm text-primary-900 outline-none ds-transition focus:border-accent-400 focus:ring-2 focus:ring-accent-400/30"
            />
          </Field>
          <Field label="Data Retention (days)">
            <input
              type="number"
              min="30"
              value={config.retentionDays}
              onChange={(event) =>
                setConfig((prev) => ({
                  ...prev,
                  retentionDays: Number(event.target.value)
                }))
              }
              className="w-full rounded-xl border border-neutral-border px-3 py-2 text-sm text-primary-900 outline-none ds-transition focus:border-accent-400 focus:ring-2 focus:ring-accent-400/30"
            />
          </Field>
        </div>
      </AdminCard>

      <AdminCard title="Notification Configuration">
        <div className="space-y-2">
          <Toggle
            label="Enable Email Alerts"
            checked={config.enableEmailAlerts}
            onChange={(value) => setConfig((prev) => ({ ...prev, enableEmailAlerts: value }))}
          />
          <Toggle
            label="Enable SMS Alerts"
            checked={config.enableSmsAlerts}
            onChange={(value) => setConfig((prev) => ({ ...prev, enableSmsAlerts: value }))}
          />
          <Toggle
            label="Enable Auto Report Dispatch"
            checked={config.enableAutoReportDispatch}
            onChange={(value) =>
              setConfig((prev) => ({ ...prev, enableAutoReportDispatch: value }))
            }
          />
        </div>
      </AdminCard>

      <button type="button" className="ui-btn ui-btn-primary">
        Save Configuration
      </button>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-primary-700">{label}</span>
      {children}
    </label>
  );
}

function Toggle({ label, checked, onChange }) {
  return (
    <label className="flex items-center gap-2 rounded-xl border border-neutral-border bg-neutral-bg px-3 py-2 text-sm text-primary-700">
      <input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} />
      <span>{label}</span>
    </label>
  );
}

export default SystemConfigurationPage;
