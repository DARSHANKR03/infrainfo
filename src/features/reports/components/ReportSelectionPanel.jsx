import { Link } from 'react-router-dom';
import ReportCard from './ReportCard';

function ReportSelectionPanel({ reports }) {
  return (
    <ReportCard title="Report Selection Panel" subtitle="Select reporting views and export utilities.">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {reports.map((report) => (
          <Link
            key={report.id}
            to={report.route}
            className="rounded-xl border border-neutral-border bg-white p-4 ds-transition hover:shadow-lg"
          >
            <p className="text-sm font-semibold text-primary-900">{report.title}</p>
            <p className="mt-1 text-xs text-primary-500">{report.description}</p>
          </Link>
        ))}
      </div>
    </ReportCard>
  );
}

export default ReportSelectionPanel;
