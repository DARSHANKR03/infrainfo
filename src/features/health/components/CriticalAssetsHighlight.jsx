import HealthCard from './HealthCard';
import HealthClassificationBadge from './HealthClassificationBadge';

function CriticalAssetsHighlight({ assets }) {
  return (
    <HealthCard
      title="Critical Assets Highlights"
      subtitle="Immediate attention candidates based on low health scores."
    >
      <div className="space-y-3">
        {assets.map((asset) => (
          <article key={asset.assetId} className="rounded-lg border border-danger/30 bg-danger/10 p-3">
            <div className="mb-1 flex items-center justify-between gap-2">
              <p className="text-sm font-semibold text-primary-900">
                {asset.assetName}
                <span className="ml-2 text-xs font-normal text-primary-500">{asset.assetId}</span>
              </p>
              <HealthClassificationBadge score={asset.healthScore} />
            </div>
            <p className="text-xs text-primary-500">Zone: {asset.zone}</p>
            <p className="mt-1 text-sm text-primary-700">{asset.issue}</p>
          </article>
        ))}
      </div>
    </HealthCard>
  );
}

export default CriticalAssetsHighlight;

