import ReportCard from './ReportCard';
import DataTable from '../../../shared/components/table/DataTable';

function ReportTable({ title, subtitle, columns, rows, renderCell }) {
  return (
    <ReportCard title={title} subtitle={subtitle}>
      <DataTable
        columns={columns}
        rows={rows}
        rowKey={(row, index) => row.id || row.assetId || row.zone || index}
        renderCell={renderCell}
      />
    </ReportCard>
  );
}

export default ReportTable;
