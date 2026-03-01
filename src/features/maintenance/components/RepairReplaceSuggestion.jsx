import MaintenanceCard from './MaintenanceCard';

function RepairReplaceSuggestion({
  assetAge,
  expectedLifespan,
  repairCost,
  replacementCost,
  criticality
}) {
  const ageRatio = expectedLifespan ? assetAge / expectedLifespan : 0;
  const costRatio = replacementCost ? repairCost / replacementCost : 0;

  let suggestion = 'Repair';
  let reason = 'Repair cost and asset age are within acceptable limits.';
  let style = 'border-success/35 bg-success/10 text-success';

  if (ageRatio > 0.8 && costRatio > 0.45) {
    suggestion = 'Replace';
    reason = 'Asset is near end-of-life and repair cost is high compared to replacement.';
    style = 'border-danger/35 bg-danger/10 text-danger';
  } else if (criticality === 'High' && costRatio > 0.35) {
    suggestion = 'Replace';
    reason = 'Critical asset with expensive repairs may carry high operational risk.';
    style = 'border-danger/35 bg-danger/10 text-danger';
  } else if (costRatio > 0.25) {
    suggestion = 'Review';
    reason = 'Repair is moderately expensive. Validate long-term reliability before approval.';
    style = 'border-warning/35 bg-warning/10 text-warning';
  }

  return (
    <MaintenanceCard title="Repair vs Replace Suggestion">
      <div className="space-y-3">
        <p className="text-sm text-primary-500">
          Decision support based on age, criticality, and cost ratio.
        </p>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <article
            className={[
              'rounded-2xl border p-4 ds-transition hover:scale-[1.02]',
              suggestion === 'Repair' ? 'border-success/35 bg-success/10' : 'border-neutral-border bg-white'
            ].join(' ')}
          >
            <p className="text-sm font-semibold text-primary-900">Repair</p>
            <p className="mt-1 text-xs text-primary-500">
              Lower immediate cost and faster turnaround for non-terminal assets.
            </p>
          </article>

          <article
            className={[
              'rounded-2xl border p-4 ds-transition hover:scale-[1.02]',
              suggestion === 'Replace' ? 'border-danger/35 bg-danger/10' : 'border-neutral-border bg-white'
            ].join(' ')}
          >
            <p className="text-sm font-semibold text-primary-900">Replace</p>
            <p className="mt-1 text-xs text-primary-500">
              Better for high criticality, end-of-life assets, and high recurring costs.
            </p>
          </article>
        </div>

        <span
          className={['inline-flex rounded-full border px-3 py-1 text-xs font-semibold', style].join(' ')}
        >
          Suggested Action: {suggestion}
        </span>
        <p className="text-sm text-primary-700">{reason}</p>
      </div>
    </MaintenanceCard>
  );
}

export default RepairReplaceSuggestion;
