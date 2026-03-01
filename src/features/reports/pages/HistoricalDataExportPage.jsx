import { Link } from 'react-router-dom';
import HistoricalDataExportUI from '../components/HistoricalDataExportUI';

function HistoricalDataExportPage() {
  return (
    <div className="section-gap">
      <div className="page-header-row">
        <div className="page-header">
          <h2>Historical Data Export</h2>
          <p>Configure historical extraction scope and output format.</p>
        </div>
        <Link to="/reports" className="tbl-btn">← Back</Link>
      </div>
      <HistoricalDataExportUI />
    </div>
  );
}

export default HistoricalDataExportPage;

