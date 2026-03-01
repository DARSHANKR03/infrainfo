import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';
import HealthCard from './HealthCard';

function ZoneComparisonBarChart({ data }) {
  return (
    <HealthCard
      title="Zone Comparison"
      subtitle="Relative health performance by municipal zone."
    >
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid stroke="#E2E8F0" strokeDasharray="3 3" />
            <XAxis dataKey="zone" stroke="#334155" />
            <YAxis domain={[40, 100]} stroke="#334155" />
            <Tooltip formatter={(value) => [`${value}`, 'Score']} />
            <Bar dataKey="score" fill="#60A5FA" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </HealthCard>
  );
}

export default ZoneComparisonBarChart;

