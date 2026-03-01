import { exportToPDF, exportToCSV, exportToXLSX, sanitizeFileName } from '../utils/exportUtils';

function ExportButtons({ columns = [], rows = [], title = 'Report' }) {
  const handleExport = (format) => {
    if (!rows.length) {
      alert('No data available to export');
      return;
    }

    if (!columns.length) {
      alert('No columns defined for export');
      return;
    }

    const fileName = sanitizeFileName(title);

    try {
      switch (format) {
        case 'pdf':
          exportToPDF(columns, rows, title, fileName);
          break;
        case 'csv':
          exportToCSV(columns, rows, fileName);
          break;
        case 'xlsx':
          exportToXLSX(columns, rows, fileName, title);
          break;
        default:
          console.error('Unknown export format:', format);
      }
    } catch (error) {
      console.error('Export failed:', error);
      alert('Export failed. Please try again.');
    }
  };

  const items = [
    { label: 'Export PDF', icon: 'PDF', format: 'pdf' },
    { label: 'Export CSV', icon: 'CSV', format: 'csv' },
    { label: 'Export XLSX', icon: 'XLS', format: 'xlsx' }
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <button
          key={item.label}
          type="button"
          onClick={() => handleExport(item.format)}
          className="group inline-flex items-center gap-2 rounded-full bg-accent-gradient px-4 py-2 text-sm font-semibold text-white shadow-lg ds-transition hover:scale-[1.02]"
          disabled={!rows.length}
        >
          <span className="rounded-full bg-white/20 px-2 py-0.5 text-[10px] leading-none">
            {item.icon}
          </span>
          <span>{item.label}</span>
          <span className="text-sm ds-transition group-hover:translate-x-1">-></span>
        </button>
      ))}
    </div>
  );
}

export default ExportButtons;
