import { useEffect, useState } from 'react';
import { PolarAngleAxis, RadialBar, RadialBarChart, ResponsiveContainer } from 'recharts';
import RiskCard from './RiskCard';

function RiskScoringDisplay({ score }) {
  const [animatedScore, setAnimatedScore] = useState(0);
  const chartData = [{ name: 'Risk Score', value: animatedScore, fill: '#3B82F6' }];

  useEffect(() => {
    const durationMs = 700;
    const start = 0;
    const end = score;
    const startTime = performance.now();

    let frameId;
    const tick = (now) => {
      const progress = Math.min((now - startTime) / durationMs, 1);
      setAnimatedScore(Math.round(start + (end - start) * progress));
      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [score]);

  let bandLabel = 'Moderate Risk';
  let bandStyle = 'border border-warning/35 bg-warning/15 text-warning';
  if (score >= 80) {
    bandLabel = 'High Risk';
    bandStyle = 'border border-danger/35 bg-danger/15 text-danger';
  } else if (score < 50) {
    bandLabel = 'Low Risk';
    bandStyle = 'border border-success/35 bg-success/15 text-success';
  }

  return (
    <RiskCard
      title="Risk Scoring Display"
      subtitle="Composite weighted municipal risk index."
      className="ds-hover-lift"
    >
      <div className="flex flex-col items-center">
        <div className="h-52 w-full max-w-[260px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart data={chartData} innerRadius="75%" outerRadius="100%" startAngle={180} endAngle={0}>
              <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
              <RadialBar
                background={{ fill: '#E2E8F0' }}
                dataKey="value"
                cornerRadius={10}
                isAnimationActive
                animationDuration={700}
                animationEasing="ease-in-out"
              />
            </RadialBarChart>
          </ResponsiveContainer>
        </div>
        <p className="-mt-8 text-4xl font-bold text-primary-900">{animatedScore}</p>
        <p className="text-xs text-primary-500">Risk Score / 100</p>
        <span className={['mt-3 rounded-full px-3 py-1 text-xs font-semibold', bandStyle].join(' ')}>
          {bandLabel}
        </span>
      </div>
    </RiskCard>
  );
}

export default RiskScoringDisplay;
