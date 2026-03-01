import { PolarAngleAxis, RadialBar, RadialBarChart, ResponsiveContainer } from 'recharts';
import HealthCard from './HealthCard';
import HealthClassificationBadge from './HealthClassificationBadge';

function HealthScoreCircular({ score }) {
  const data = [{ name: 'Health', value: score, fill: '#3B82F6' }];

  return (
    <HealthCard
      title="Health Score"
      subtitle="Overall weighted infrastructure health index."
    >
      <div className="flex flex-col items-center">
        <div className="h-56 w-full max-w-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart
              innerRadius="75%"
              outerRadius="100%"
              data={data}
              startAngle={180}
              endAngle={0}
            >
              <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
              <RadialBar background dataKey="value" cornerRadius={10} />
            </RadialBarChart>
          </ResponsiveContainer>
        </div>
        <p className="-mt-10 text-4xl font-bold text-primary-900">{score}</p>
        <p className="text-xs text-primary-500">out of 100</p>
        <div className="mt-3">
          <HealthClassificationBadge score={score} />
        </div>
      </div>
    </HealthCard>
  );
}

export default HealthScoreCircular;

