function DataTable({
  columns,
  rows,
  rowKey = (row, index) => row.id || index,
  renderCell,
  emptyMessage = 'No records found.',
  scrollable = false
}) {
  return (
    <div className={['ui-table-wrap', scrollable ? 'ui-table-scrollable' : ''].filter(Boolean).join(' ')}>
      <table className="ui-table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key}>{column.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length ? (
            rows.map((row, rowIndex) => (
              <tr key={rowKey(row, rowIndex)}>
                {columns.map((column) => (
                  <td key={`${rowKey(row, rowIndex)}-${column.key}`}>
                    {renderCell ? renderCell(row, column, rowIndex) : row[column.key]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="tbl-empty">{emptyMessage}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
