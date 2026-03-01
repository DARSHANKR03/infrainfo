import { useEffect, useMemo, useState } from 'react';
import { kpiData } from '../../pages/dashboardData';

function useAnimatedValue(rawValue, duration = 900) {
  const [display, setDisplay] = useState(rawValue);

  useEffect(() => {
    const numeric = Number(String(rawValue).replace(/[^0-9.]/g, ''));
    const hasPercent = String(rawValue).includes('%');
    const hasComma = String(rawValue).includes(',');

    if (Number.isNaN(numeric)) {
      setDisplay(rawValue);
      return undefined;
    }

    let rafId = 0;
    const start = performance.now();

    const tick = (time) => {
      const progress = Math.min(1, (time - start) / duration);
      const value = numeric * progress;

      const formatted = hasPercent
        ? `${value.toFixed(1)}%`
        : hasComma
          ? Math.round(value).toLocaleString()
          : String(Math.round(value));

      setDisplay(formatted);

      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [duration, rawValue]);

  return display;
}

function TrendIndicator({ deltaType, delta }) {
  const up = deltaType === 'positive';
  const arrow = up ? '↑' : '↓';
  const tone = up ? 'text-success' : 'text-danger';

  return (
    <div className={['mt-2 flex items-center gap-1 text-xs font-medium', tone].join(' ')}>
      <span aria-hidden="true">{arrow}</span>
      <span>{delta}</span>
    </div>
  );
}

function KpiCards() {
  const cards = useMemo(() => kpiData, []);

  return (
    <div className="grid-kpi">
      {cards.map((item) => (
        <KpiCard key={item.key} item={item} />
      ))}
    </div>
  );
}

function KpiCard({ item }) {
  const animatedValue = useAnimatedValue(item.value);
  const barClass = item.deltaType === 'positive' ? 'accent-bar-success' : 'accent-bar-blue';

  return (
    <article className="kpi-card">
      <div className={barClass} />
      <p className="kpi-label">{item.label}</p>
      <p className="kpi-value" style={{ marginTop: '0.6rem' }}>{animatedValue}</p>
      <TrendIndicator deltaType={item.deltaType} delta={item.delta} />
    </article>
  );
}

export default KpiCards;
