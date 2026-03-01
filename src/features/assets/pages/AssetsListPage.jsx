import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import AssetFilters from '../components/AssetFilters';
import AssetsTable from '../components/AssetsTable';
import Pagination from '../components/Pagination';
import {
  deleteAsset,
  getAssetFilterOptions,
  listAssets
} from '../../../shared/services/mockApi/assetsApi';

const PAGE_SIZE = 6;

function AssetsListPage() {
  const [assets, setAssets] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    type: '',
    zone: '',
    status: ''
  });
  const [sortBy, setSortBy] = useState('assetName');
  const [sortOrder, setSortOrder] = useState('asc');
  const [page, setPage] = useState(1);

  useEffect(() => {
    loadAssets();
  }, []);

  const options = useMemo(() => getAssetFilterOptions(assets), [assets]);

  const filteredAndSorted = useMemo(() => {
    const searchToken = filters.search.trim().toLowerCase();

    const filtered = assets.filter((asset) => {
      const matchesSearch =
        !searchToken ||
        [asset.assetName, asset.id, asset.tags.join(' ')]
          .join(' ')
          .toLowerCase()
          .includes(searchToken);
      const matchesType = !filters.type || asset.assetType === filters.type;
      const matchesZone = !filters.zone || asset.zone === filters.zone;
      const matchesStatus = !filters.status || asset.status === filters.status;

      return matchesSearch && matchesType && matchesZone && matchesStatus;
    });

    return filtered.sort((a, b) => {
      const left = String(a[sortBy] ?? '').toLowerCase();
      const right = String(b[sortBy] ?? '').toLowerCase();
      const base = left.localeCompare(right);
      return sortOrder === 'asc' ? base : -base;
    });
  }, [assets, filters, sortBy, sortOrder]);

  const totalPages = Math.max(1, Math.ceil(filteredAndSorted.length / PAGE_SIZE));

  const pagedRows = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filteredAndSorted.slice(start, start + PAGE_SIZE);
  }, [filteredAndSorted, page]);

  useEffect(() => {
    setPage(1);
  }, [filters, sortBy, sortOrder]);

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  const handleDelete = async (assetId) => {
    const shouldDelete = window.confirm('Delete this asset?');

    if (!shouldDelete) {
      return;
    }

    await deleteAsset(assetId);
    await loadAssets();
  };

  const handleSort = (column) => {
    if (column === sortBy) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
      return;
    }

    setSortBy(column);
    setSortOrder('asc');
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters({ search: '', type: '', zone: '', status: '' });
  };

  async function loadAssets() {
    const result = await listAssets();
    setAssets(result);
  }

  return (
    <div className="section-gap">
      <div className="page-header-row">
        <div className="page-header">
          <h2>Asset Management</h2>
          <p>Municipal asset registry with operational status and risk context.</p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Link to="/assets/bulk-upload" className="tbl-btn">
            Bulk Upload
          </Link>
          <Link to="/assets/new" className="ui-btn ui-btn-primary">
            + Add Asset
          </Link>
        </div>
      </div>

      <div className="ui-card" style={{ padding: '1rem' }}>
        <AssetFilters
          filters={filters}
          options={options}
          onFilterChange={handleFilterChange}
          onReset={resetFilters}
        />
      </div>

      <AssetsTable
        rows={pagedRows}
        sortBy={sortBy}
        sortOrder={sortOrder}
        onSort={handleSort}
        onDelete={handleDelete}
      />

      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
}

export default AssetsListPage;

