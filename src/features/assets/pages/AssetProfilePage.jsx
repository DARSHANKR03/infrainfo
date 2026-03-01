import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  PolarAngleAxis,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer
} from 'recharts';
import AssetStatusBadge from '../components/AssetStatusBadge';
import RiskBadge from '../components/RiskBadge';
import SectionCard from '../components/SectionCard';
import { getAssetDigitalProfile } from '../../../shared/services/mockApi/assetsApi';

function AssetProfilePage() {
  const { assetId } = useParams();
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('timeline');

  useEffect(() => {
    const loadProfile = async () => {
      const result = await getAssetDigitalProfile(assetId);
      setProfile(result);
      setIsLoading(false);
    };

    loadProfile();
  }, [assetId]);

  if (isLoading) {
    return (
      <div className="loading-state">
        <div className="loading-spinner" />
        <span>Loading digital profile…</span>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="ui-card">
        <h2>Asset not found</h2>
        <Link to="/assets" style={{ marginTop: '0.75rem', display: 'inline-block', color: 'var(--accent)', fontSize: '0.875rem' }}>Return to asset list</Link>
      </div>
    );
  }

  const {
    asset,
    lifecycleTimeline,
    inspections,
    healthTrend,
    maintenanceHistory,
    alertsHistory
  } = profile;

  const latestHealth = useMemo(
    () => Math.max(0, Math.min(100, Number(healthTrend.at(-1)?.health || 0))),
    [healthTrend]
  );

  return (
    <div className="section-gap">
      <div className="page-header-row">
        <div className="page-header">
          <h2>Asset Digital Profile</h2>
          <p>Comprehensive lifecycle and risk intelligence for {asset.id}.</p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Link to={`/assets/${asset.id}/edit`} className="tbl-btn">Edit Asset</Link>
          <Link to="/assets" className="ui-btn ui-btn-primary">← Back to List</Link>
        </div>
      </div>

      <div className="grid-3-2">
        <div>
          <SectionCard title="Asset Summary" className="shadow-lg">
            <div className="space-y-3">
              <SummaryItem label="Asset Name" value={asset.assetName} />
              <SummaryItem label="Asset Type" value={asset.assetType} />
              <SummaryItem label="Category" value={asset.category} />
              <SummaryItem label="Location" value={`${asset.city} / ${asset.zone} / ${asset.ward}`} />
              <SummaryItem label="Installed On" value={asset.installationDate} />
              <SummaryItem label="Expected Lifespan" value={`${asset.expectedLifespan} years`} />
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <AssetStatusBadge status={asset.status} />
              <RiskBadge rank={asset.riskRank} />
            </div>

            <div className="mt-5 rounded-2xl border border-neutral-border p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-primary-500">Health Score</p>
              <div className="mx-auto mt-2 h-44 w-full max-w-[220px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadialBarChart
                    data={[{ name: 'Health', value: latestHealth, fill: '#3B82F6' }]}
                    innerRadius="76%"
                    outerRadius="100%"
                    startAngle={180}
                    endAngle={0}
                  >
                    <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                    <RadialBar dataKey="value" background cornerRadius={10} isAnimationActive animationDuration={900} />
                  </RadialBarChart>
                </ResponsiveContainer>
              </div>
              <p className="-mt-6 text-center text-3xl font-bold text-primary-900">{latestHealth}</p>
              <p className="text-center text-xs text-primary-500">Health / 100</p>
            </div>
          </SectionCard>
        </div>

        <div style={{ flex: '1 1 0' }}>
          <SectionCard title="Profile Insights" className="shadow-lg">
            <div className="mb-4 flex flex-wrap gap-2">
              <TabButton id="timeline" label="Lifecycle Timeline" activeTab={activeTab} onChange={setActiveTab} />
              <TabButton id="inspections" label="Inspections" activeTab={activeTab} onChange={setActiveTab} />
              <TabButton id="maintenance" label="Maintenance" activeTab={activeTab} onChange={setActiveTab} />
              <TabButton id="alerts" label="Alerts" activeTab={activeTab} onChange={setActiveTab} />
            </div>

            {activeTab === 'timeline' ? (
              <VerticalTimeline events={lifecycleTimeline} />
            ) : null}

            {activeTab === 'inspections' ? (
              <SimpleTable
                columns={['Date', 'Inspector', 'Score', 'Status']}
                rows={inspections.map((item) => [
                  item.date,
                  item.inspector,
                  String(item.score),
                  item.status
                ])}
              />
            ) : null}

            {activeTab === 'maintenance' ? (
              <SimpleTable
                columns={['Date', 'Work Order', 'Type', 'Summary']}
                rows={maintenanceHistory.map((item) => [
                  item.date,
                  item.workOrder,
                  item.type,
                  item.summary
                ])}
              />
            ) : null}

            {activeTab === 'alerts' ? (
              <SimpleTable
                columns={['Date', 'Alert Code', 'Severity', 'Message']}
                rows={alertsHistory.map((item) => [
                  item.date,
                  item.code,
                  item.severity,
                  item.message
                ])}
              />
            ) : null}
          </SectionCard>
        </div>
      </div>
    </div>
  );
}

function SummaryItem({ label, value }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>
      <span style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-secondary)' }}>{label}</span>
      <span style={{ fontSize: '0.875rem', fontWeight: 500, textAlign: 'right', maxWidth: '60%' }}>{value}</span>
    </div>
  );
}

function TabButton({ id, label, activeTab, onChange }) {
  const active = activeTab === id;
  return (
    <button
      type="button"
      onClick={() => onChange(id)}
      className={['filter-pill', active ? 'active' : ''].join(' ').trim()}
    >
      {label}
    </button>
  );
}

function VerticalTimeline({ events }) {
  return (
    <ol className="relative ml-2 border-l border-neutral-border pl-5">
      {events.map((event, index) => (
        <li key={`${event.date}-${event.label}-${index}`} className="mb-5">
          <span className="absolute -left-[6px] mt-1 inline-flex h-3 w-3 animate-pulse rounded-full bg-accent-500 shadow-lg shadow-accent-400/40" />
          <p className="text-xs font-semibold uppercase tracking-wide text-primary-500">{event.date}</p>
          <p className="text-sm font-semibold text-primary-900">{event.label}</p>
          <p className="text-sm text-primary-700">{event.detail}</p>
        </li>
      ))}
    </ol>
  );
}

function SimpleTable({ columns, rows }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-neutral-border">
      <table className="min-w-full">
        <thead className="bg-neutral-bg">
          <tr>
            {columns.map((column) => (
              <th
                key={column}
                className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-primary-500"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr
              key={`${row[0]}-${rowIndex}`}
              className="border-t border-neutral-border text-sm text-primary-700 hover:bg-accent-50 ds-transition"
            >
              {row.map((cell, index) => (
                <td key={`${rowIndex}-${index}`} className="px-3 py-2">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AssetProfilePage;
