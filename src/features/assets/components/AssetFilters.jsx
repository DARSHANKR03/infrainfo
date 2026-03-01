function AssetFilters({ filters, options, onFilterChange, onReset }) {
  return (
    <div className="grid grid-cols-1 gap-3 lg:grid-cols-4">
      <input
        type="text"
        value={filters.search}
        onChange={(event) => onFilterChange('search', event.target.value)}
        placeholder="Search by asset name, id, or tags"
        className="rounded-lg border border-neutral-border px-3 py-2 text-sm outline-none focus:border-accent-400"
      />

      <select
        value={filters.type}
        onChange={(event) => onFilterChange('type', event.target.value)}
        className="rounded-lg border border-neutral-border px-3 py-2 text-sm outline-none focus:border-accent-400"
      >
        <option value="">All Types</option>
        {options.types.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>

      <select
        value={filters.zone}
        onChange={(event) => onFilterChange('zone', event.target.value)}
        className="rounded-lg border border-neutral-border px-3 py-2 text-sm outline-none focus:border-accent-400"
      >
        <option value="">All Zones</option>
        {options.zones.map((zone) => (
          <option key={zone} value={zone}>
            {zone}
          </option>
        ))}
      </select>

      <div className="flex gap-2">
        <select
          value={filters.status}
          onChange={(event) => onFilterChange('status', event.target.value)}
          className="w-full rounded-lg border border-neutral-border px-3 py-2 text-sm outline-none focus:border-accent-400"
        >
          <option value="">All Statuses</option>
          {options.statuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={onReset}
          className="rounded-lg border border-neutral-border px-3 py-2 text-sm text-primary-500 hover:bg-neutral-bg"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default AssetFilters;

