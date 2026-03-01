import DataTable from '../../../shared/components/table/DataTable';

function ReusableTable({ columns, rows, renderCell, emptyMessage }) {
  return (
    <DataTable
      columns={columns}
      rows={rows}
      renderCell={renderCell}
      emptyMessage={emptyMessage}
    />
  );
}

export default ReusableTable;
