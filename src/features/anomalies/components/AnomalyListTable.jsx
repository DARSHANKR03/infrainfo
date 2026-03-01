import StatisticalDeviationBadge from './StatisticalDeviationBadge';

const STRIPE_CLASS = {
  Spike:    'anom-stripe-spike',
  Drift:    'anom-stripe-drift',
  Outlier:  'anom-stripe-outlier',
  Repeated: 'anom-stripe-repeated',
};

const SEV_CLASS = {
  Critical: 'badge-sev badge-sev-critical',
  High:     'badge-sev badge-sev-high',
  Medium:   'badge-sev badge-sev-medium',
  Low:      'badge-sev badge-sev-low',
};

function AnomalyListTable({ rows }) {
  return (
    <div className="ui-table-wrap">
      <table className="ui-table">
        <thead>
          <tr>
            <th>Anomaly</th>
            <th>Type</th>
            <th>Metric</th>
            <th>Detected At</th>
            <th>Severity</th>
            <th>Statistical Deviation</th>
          </tr>
        </thead>
        <tbody>
          {rows.length ? rows.map((item) => (
            <tr key={item.id}>
              <td className={STRIPE_CLASS[item.type] || 'anom-stripe-default'}>
                <p className="tbl-primary">{item.assetName}</p>
                <p className="tbl-sub">{item.id} · {item.assetId}</p>
              </td>
              <td>{item.type}</td>
              <td>{item.metric}</td>
              <td>{item.detectedAt}</td>
              <td>
                <span className={SEV_CLASS[item.severity] || 'badge-sev badge-sev-low'}>
                  {item.severity}
                </span>
              </td>
              <td><StatisticalDeviationBadge sigma={item.deviationSigma} /></td>
            </tr>
          )) : (
            <tr><td colSpan={6} className="tbl-empty">No anomalies detected.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AnomalyListTable;
