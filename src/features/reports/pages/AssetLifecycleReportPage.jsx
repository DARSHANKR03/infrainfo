import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ExportButtons from '../components/ExportButtons';
import ReportTable from '../components/ReportTable';
import { getAssetLifecycleReport } from '../../../shared/services/mockApi/reportsApi';

function PriorityBadge({ priority }) {
  const map = { Low: 'badge-success', Medium: 'badge-warning', High: 'badge-danger', Urgent: 'badge-danger' };
  return <span className={['badge', map[priority] || 'badge-neutral'].join(' ')}>{priority}</span>;
}

function AssetLifecycleReportPage() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const load = async () => {
      const data = await getAssetLifecycleReport();
      setRows(data);
    };
    load();
  }, []);

  const columns = [
    { key: 'asset', label: 'Asset' },
    { key: 'stage', label: 'Lifecycle Stage' },
    { key: 'installYear', label: 'Install Year' },
    { key: 'expectedEol', label: 'Expected EOL' },
    { key: 'replacementPriority', label: 'Replacement Priority' }
  ];

  return (
    <div className="section-gap">
      <div className="page-header-row">
        <div className="page-header">
          <h2>Asset Lifecycle Report</h2>
          <p>Lifecycle stage and replacement planning intelligence.</p>
        </div>
        <Link to="/reports" className="tbl-btn">← Back</Link>
      </div>

      <ReportTable
        title="Asset Lifecycle Report"
        subtitle="Lifecycle and replacement horizon by critical assets."
        columns={columns}
        rows={rows}
        renderCell={(row, column) => {
          if (column.key === 'asset') {
            return (
              <div>
                <p className="font-semibold text-primary-900">{row.assetName}</p>
                <p className="text-xs text-primary-500">{row.assetId}</p>
              </div>
            );
          }
          if (column.key === 'replacementPriority') {
            return <PriorityBadge priority={row.replacementPriority} />;
          }
          return row[column.key];
        }}
      />

      <div className="ui-card">
        <h3 style={{ marginBottom: '0.75rem', fontWeight: 600 }}>Export</h3>
        <ExportButtons columns={columns} rows={rows} title="Asset Lifecycle Report" />
      </div>
    </div>
  );
}

export default AssetLifecycleReportPage;

