import { Link } from 'react-router-dom';
import AssetStatusBadge from './AssetStatusBadge';

function SortButton({ label, column, sortBy, sortOrder, onSort }) {
  const isActive = sortBy === column;
  return (
    <button
      type="button"
      onClick={() => onSort(column)}
      className={['tbl-sort-btn', isActive ? 'active' : ''].filter(Boolean).join(' ')}
    >
      {label}
      <span className="tbl-sort-icon">
        {isActive ? (sortOrder === 'asc' ? '▲' : '▼') : '⇅'}
      </span>
    </button>
  );
}

function AssetsTable({ rows, sortBy, sortOrder, onSort, onDelete }) {
  return (
    <div className="ui-table-wrap ui-table-scrollable">
      <table className="ui-table">
        <thead>
          <tr>
            <th><SortButton label="Asset Name" column="assetName" sortBy={sortBy} sortOrder={sortOrder} onSort={onSort} /></th>
            <th><SortButton label="Type" column="assetType" sortBy={sortBy} sortOrder={sortOrder} onSort={onSort} /></th>
            <th><SortButton label="Zone" column="zone" sortBy={sortBy} sortOrder={sortOrder} onSort={onSort} /></th>
            <th><SortButton label="Status" column="status" sortBy={sortBy} sortOrder={sortOrder} onSort={onSort} /></th>
            <th><SortButton label="Installed" column="installationDate" sortBy={sortBy} sortOrder={sortOrder} onSort={onSort} /></th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.length ? rows.map((asset) => (
            <tr key={asset.id}>
              <td>
                <p className="tbl-primary">{asset.assetName}</p>
                <p className="tbl-sub">{asset.id}</p>
              </td>
              <td>{asset.assetType}</td>
              <td>{asset.zone}</td>
              <td><AssetStatusBadge status={asset.status} /></td>
              <td>{asset.installationDate}</td>
              <td>
                <div className="tbl-actions">
                  <Link to={`/assets/${asset.id}`} className="tbl-btn tbl-btn-view">View</Link>
                  <Link to={`/assets/${asset.id}/edit`} className="tbl-btn">Edit</Link>
                  <button type="button" onClick={() => onDelete(asset.id)} className="tbl-btn tbl-btn-danger">Delete</button>
                </div>
              </td>
            </tr>
          )) : (
            <tr><td colSpan={6} className="tbl-empty">No assets found.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AssetsTable;
