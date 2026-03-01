import { useMemo, useState } from 'react';
import AnomalyListTable from '../features/anomalies/components/AnomalyListTable';
import DegradationTrendChart from '../features/anomalies/components/DegradationTrendChart';
import HistoricalComparisonChart from '../features/anomalies/components/HistoricalComparisonChart';
import RepeatedIssueTable from '../features/anomalies/components/RepeatedIssueTable';
import {
  anomalyRecords,
  degradationTrendData,
  historicalComparisonData
} from '../features/anomalies/data/anomalyMockData';

function AnomaliesPage() {
  const [typeFilter, setTypeFilter] = useState('All');
  const [filtersOpen, setFiltersOpen] = useState(true);
  const filterOptions = ['All', 'Spike', 'Drift', 'Outlier', 'Repeated'];

  const filteredAnomalies = useMemo(() => {
    if (typeFilter === 'All') {
      return anomalyRecords;
    }
    return anomalyRecords.filter((item) => item.type === typeFilter);
  }, [typeFilter]);

  const repeatedIssues = useMemo(
    () => anomalyRecords.filter((item) => item.repeatedCount >= 2),
    []
  );

  return (
    <div className="section-gap">
      <div className="page-header">
        <h2>Anomaly Detection</h2>
        <p>Monitor detected anomalies, compare historical baselines, and identify recurring issues.</p>
      </div>

      <div style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))' }}>
        <DegradationTrendChart data={degradationTrendData} />
        <HistoricalComparisonChart data={historicalComparisonData} />
      </div>

      <div className="ui-card">
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem', marginBottom: filtersOpen ? '1rem' : 0 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--primary-900)' }}>Anomaly List</h3>
          <button
            type="button"
            onClick={() => setFiltersOpen((prev) => !prev)}
            className="tbl-btn"
          >
            {filtersOpen ? '▲ Hide Filters' : '▼ Show Filters'}
          </button>
        </div>

        {filtersOpen && (
          <div className="filter-bar" style={{ marginBottom: '1rem' }}>
            {filterOptions.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setTypeFilter(option)}
                className={['filter-pill', typeFilter === option ? 'active' : ''].join(' ')}
              >
                {option}
              </button>
            ))}
          </div>
        )}

        <AnomalyListTable rows={filteredAnomalies} />
      </div>

      <RepeatedIssueTable rows={repeatedIssues} />
    </div>
  );
}

export default AnomaliesPage;
