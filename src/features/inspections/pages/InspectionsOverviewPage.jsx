import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ComplianceTrackerTable from '../components/ComplianceTrackerTable';
import InspectionHistoryTimeline from '../components/InspectionHistoryTimeline';
import InspectionSchedulingCalendar from '../components/InspectionSchedulingCalendar';
import { getInspectionOverview } from '../../../shared/services/mockApi/inspectionsApi';

function InspectionsOverviewPage() {
  const [overview, setOverview] = useState({
    timeline: [],
    compliance: [],
    schedule: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOverview = async () => {
      const data = await getInspectionOverview();
      setOverview(data);
      setLoading(false);
    };

    loadOverview();
  }, []);

  if (loading) {
    return (
      <div className="loading-state">
        <div className="loading-spinner" />
        <span>Loading inspection dashboard…</span>
      </div>
    );
  }

  return (
    <div className="section-gap">
      <div className="page-header-row">
        <div className="page-header">
          <h2>Inspection &amp; Data Entry</h2>
          <p>Capture field inspections, monitor compliance, and schedule upcoming tasks.</p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Link to="/inspections/bulk-upload" className="tbl-btn">Bulk Upload</Link>
          <Link to="/inspections/new" className="ui-btn ui-btn-primary">+ New Inspection</Link>
        </div>
      </div>

      <div className="grid-3-2">
        <div><InspectionHistoryTimeline items={overview.timeline} /></div>
        <div><ComplianceTrackerTable rows={overview.compliance} /></div>
      </div>

      <InspectionSchedulingCalendar entries={overview.schedule} />
    </div>
  );
}

export default InspectionsOverviewPage;

