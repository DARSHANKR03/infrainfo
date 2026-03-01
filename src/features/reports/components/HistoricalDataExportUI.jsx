import { useState } from 'react';
import ReportCard from './ReportCard';
import ExportButtons from './ExportButtons';

function HistoricalDataExportUI() {
  const [filters, setFilters] = useState({
    from: '2025-01-01',
    to: '2026-02-28',
    includeTelemetry: true,
    includeAlerts: true,
    includeInspections: true
  });

  // Prepare export data based on selected filters
  const exportColumns = [
    { key: 'dataType', label: 'Data Type' },
    { key: 'dateRange', label: 'Date Range' },
    { key: 'status', label: 'Status' }
  ];

  const exportRows = [];
  if (filters.includeTelemetry) {
    exportRows.push({ 
      dataType: 'Telemetry Data', 
      dateRange: `${filters.from} to ${filters.to}`,
      status: 'Ready for Export'
    });
  }
  if (filters.includeAlerts) {
    exportRows.push({ 
      dataType: 'Alert Data', 
      dateRange: `${filters.from} to ${filters.to}`,
      status: 'Ready for Export'
    });
  }
  if (filters.includeInspections) {
    exportRows.push({ 
      dataType: 'Inspection Data', 
      dateRange: `${filters.from} to ${filters.to}`,
      status: 'Ready for Export'
    });
  }

  return (
    <ReportCard
      title="Historical Data Export UI"
      subtitle="Prepare historical datasets for analytics, audits, and external systems."
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Field label="From Date">
          <input
            type="date"
            value={filters.from}
            onChange={(event) => setFilters((prev) => ({ ...prev, from: event.target.value }))}
            className="w-full rounded-lg border border-neutral-border px-3 py-2 text-sm"
          />
        </Field>
        <Field label="To Date">
          <input
            type="date"
            value={filters.to}
            onChange={(event) => setFilters((prev) => ({ ...prev, to: event.target.value }))}
            className="w-full rounded-lg border border-neutral-border px-3 py-2 text-sm"
          />
        </Field>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-3">
        <Check
          label="Telemetry Data"
          checked={filters.includeTelemetry}
          onChange={(value) => setFilters((prev) => ({ ...prev, includeTelemetry: value }))}
        />
        <Check
          label="Alert Data"
          checked={filters.includeAlerts}
          onChange={(value) => setFilters((prev) => ({ ...prev, includeAlerts: value }))}
        />
        <Check
          label="Inspection Data"
          checked={filters.includeInspections}
          onChange={(value) => setFilters((prev) => ({ ...prev, includeInspections: value }))}
        />
      </div>

      <div className="mt-4">
        <ExportButtons 
          columns={exportColumns} 
          rows={exportRows} 
          title="Historical Data Export" 
        />
      </div>
    </ReportCard>
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

function Check({ label, checked, onChange }) {
  return (
    <label className="flex items-center gap-2 rounded-lg border border-neutral-border bg-neutral-bg px-3 py-2 text-sm">
      <input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} />
      <span>{label}</span>
    </label>
  );
}

export default HistoricalDataExportUI;

