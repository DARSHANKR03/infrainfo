import { useEffect, useState } from 'react';
import ExportButtons from '../components/ExportButtons';
import MonthlyReportPreview from '../components/MonthlyReportPreview';
import ReportSchedulingForm from '../components/ReportSchedulingForm';
import ReportSelectionPanel from '../components/ReportSelectionPanel';
import { getMonthlyReportPreview, getReportCatalog } from '../../../shared/services/mockApi/reportsApi';

function ReportsHomePage() {
  const [catalog, setCatalog] = useState([]);
  const [monthlyPreview, setMonthlyPreview] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const [catalogData, monthlyData] = await Promise.all([
        getReportCatalog(),
        getMonthlyReportPreview()
      ]);
      setCatalog(catalogData);
      setMonthlyPreview(monthlyData);
      setLoading(false);
    };
    load();
  }, []);

  if (loading || !monthlyPreview) {
    return (
      <div className="loading-state">
        <div className="loading-spinner" />
        <span>Loading reports…</span>
      </div>
    );
  }

  // Prepare data for export - convert summary data to table format
  const summaryColumns = [
    { key: 'label', label: 'Metric' },
    { key: 'value', label: 'Value' }
  ];
  const summaryRows = monthlyPreview.summary || [];

  return (
    <div className="section-gap">
      <div className="page-header">
        <h2>Reporting Center</h2>
        <p>Generate, preview, schedule, and export infrastructure intelligence reports.</p>
      </div>

      <ReportSelectionPanel reports={catalog} />
      <MonthlyReportPreview data={monthlyPreview} />

      <div className="ui-card">
        <h3 style={{ marginBottom: '0.75rem', fontWeight: 600 }}>Export Actions</h3>
        <ExportButtons 
          columns={summaryColumns} 
          rows={summaryRows} 
          title={`Monthly Report - ${monthlyPreview.month}`} 
        />
      </div>

      <ReportSchedulingForm />
    </div>
  );
}

export default ReportsHomePage;
