import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';
import DashboardCard from './DashboardCard';

function HealthTrendChart({ data, period, onPeriodChange }) {
  const periods = ['7D', '30D', '90D'];

  return (
    <DashboardCard
      title="Health Trend Over Time"
      action={
        <div className="flex rounded-xl border border-neutral-border p-1">
          {periods.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => onPeriodChange(item)}
              className={[
                'rounded-lg px-2 py-1 text-xs font-semibold ds-transition',
                period === item
                  ? 'bg-accent-300/30 text-accent-500'
                  : 'text-primary-500 hover:bg-accent-300/20'
              ].join(' ')}
            >
              {item}
            </button>
          ))}
        </div>
      }
    >
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
            <CartesianGrid stroke="#CBD5E1" strokeDasharray="4 4" />
            <XAxis dataKey="period" stroke="#334155" />
            <YAxis domain={[75, 95]} stroke="#334155" />
            <Tooltip
              formatter={(value) => [`${value}%`, 'Health Score']}
              contentStyle={{
                backgroundColor: '#0F172A',
                border: 'none',
                borderRadius: 12,
                color: '#F8FAFC'
              }}
              labelStyle={{ color: '#93C5FD' }}
              itemStyle={{ color: '#F8FAFC' }}
            />
            <Line
              type="monotone"
              dataKey="health"
              stroke="#3B82F6"
              strokeWidth={3}
              dot={{ r: 4, fill: '#3B82F6' }}
              isAnimationActive
              animationDuration={900}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </DashboardCard>
  );
}

export default HealthTrendChart;
