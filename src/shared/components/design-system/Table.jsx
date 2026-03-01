import DataTable from '../table/DataTable';

function Table({ columns, rows, rowKey, renderCell, emptyMessage = 'No records found.' }) {
  return (
    <DataTable
      columns={columns}
      rows={rows}
      rowKey={rowKey}
      renderCell={renderCell}
      emptyMessage={emptyMessage}
    />
  );
}

export default Table;
