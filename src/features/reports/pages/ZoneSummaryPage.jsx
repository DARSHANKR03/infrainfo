import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ExportButtons from '../components/ExportButtons';
import ReportTable from '../components/ReportTable';
import { getZoneSummaryReport } from '../../../shared/services/mockApi/reportsApi';

function ZoneSummaryPage() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const load = async () => {
      const data = await getZoneSummaryReport();
      setRows(data);
    };
    load();
  }, []);

  const columns = [
    { key: 'zone', label: 'Zone' },
    { key: 'assets', label: 'Assets' },
    { key: 'healthy', label: 'Healthy' },
    { key: 'warning', label: 'Warning' },
    { key: 'critical', label: 'Critical' },
    { key: 'compliance', label: 'Compliance %' }
  ];

  return (
    <div className="section-gap">
      <div className="page-header-row">
        <div className="page-header">
          <h2>Zone-wise Summary Report</h2>
          <p>Comparative operational summary across all municipal zones.</p>
        </div>
        <Link to="/reports" className="tbl-btn">← Back</Link>
      </div>

      <ReportTable title="Zone Summary" subtitle="Current reporting cycle overview." columns={columns} rows={rows} />

      <div className="ui-card">
        <h3 style={{ marginBottom: '0.75rem', fontWeight: 600 }}>Export</h3>
        <ExportButtons columns={columns} rows={rows} title="Zone-wise Summary Report" />
      </div>
    </div>
  );
}

export default ZoneSummaryPage;

