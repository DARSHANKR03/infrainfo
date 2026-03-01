import AdminCard from './AdminCard';

function MultiCitySelector({ cities, selectedCity, onChange }) {
  return (
    <AdminCard title="Multi-City Selector" subtitle="Filter administration context by city jurisdiction.">
      <select
        value={selectedCity}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-xl border border-neutral-border px-3 py-2 text-sm text-primary-900 outline-none ds-transition focus:border-accent-400 focus:ring-2 focus:ring-accent-400/30"
      >
        <option value="All Cities">All Cities</option>
        {cities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>
    </AdminCard>
  );
}

export default MultiCitySelector;
