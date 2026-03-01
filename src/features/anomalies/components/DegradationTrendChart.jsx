import {
  Area,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';
import AnomalyCard from './AnomalyCard';

function DegradationTrendChart({ data }) {
  return (
    <AnomalyCard
      title="Degradation Trend"
      subtitle="Asset health degradation trajectory across recent periods."
    >
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data}>
            <defs>
              <linearGradient id="deviationFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#EF4444" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#EF4444" stopOpacity={0.03} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#E2E8F0" strokeDasharray="3 3" />
            <XAxis dataKey="period" stroke="#334155" />
            <YAxis domain={[50, 90]} stroke="#334155" />
            <Tooltip
              formatter={(value) => [`${value}`, 'Health Score']}
              contentStyle={{
                borderRadius: '0.75rem',
                border: '1px solid #E2E8F0',
                backgroundColor: '#0F172A',
                color: '#F8FAFC'
              }}
            />
            <Area
              type="monotone"
              dataKey="score"
              stroke="none"
              fill="url(#deviationFill)"
              isAnimationActive
              animationDuration={800}
              animationEasing="ease-in-out"
            />
            <Line
              type="monotone"
              dataKey="score"
              stroke="#EF4444"
              strokeWidth={3}
              dot={{ r: 4, fill: '#EF4444' }}
              isAnimationActive
              animationDuration={800}
              animationEasing="ease-in-out"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </AnomalyCard>
  );
}

export default DegradationTrendChart;

