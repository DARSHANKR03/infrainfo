import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';
import HealthCard from './HealthCard';

function HealthTrendGraph({ data }) {
  return (
    <HealthCard
      title="Time-Series Health Trend"
      subtitle="Month-over-month movement in system-wide health score."
    >
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid stroke="#E2E8F0" strokeDasharray="3 3" />
            <XAxis dataKey="period" stroke="#334155" />
            <YAxis domain={[40, 100]} stroke="#334155" />
            <Tooltip formatter={(value) => [`${value}`, 'Health Score']} />
            <Line
              type="monotone"
              dataKey="score"
              stroke="#3B82F6"
              strokeWidth={3}
              dot={{ r: 4, fill: '#3B82F6' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </HealthCard>
  );
}

export default HealthTrendGraph;

