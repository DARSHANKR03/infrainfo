import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';
import RiskCard from './RiskCard';

function RiskTrendGraph({ data }) {
  return (
    <RiskCard title="Risk Trend Graph" subtitle="Progressive risk movement across recent periods.">
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid stroke="#E2E8F0" strokeDasharray="3 3" />
            <XAxis dataKey="period" stroke="#334155" />
            <YAxis domain={[40, 90]} stroke="#334155" />
            <Tooltip formatter={(value) => [`${value}`, 'Risk Score']} />
            <Line
              type="monotone"
              dataKey="score"
              stroke="#3B82F6"
              strokeWidth={3}
              dot={{ r: 4, fill: '#3B82F6' }}
              isAnimationActive
              animationDuration={850}
              animationEasing="ease-in-out"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </RiskCard>
  );
}

export default RiskTrendGraph;

