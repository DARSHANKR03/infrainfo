import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';
import AnomalyCard from './AnomalyCard';

function HistoricalComparisonChart({ data }) {
  return (
    <AnomalyCard
      title="Historical Comparison"
      subtitle="Current anomaly count compared with historical baseline."
    >
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid stroke="#E2E8F0" strokeDasharray="3 3" />
            <XAxis dataKey="period" stroke="#334155" />
            <YAxis stroke="#334155" />
            <Tooltip
              contentStyle={{
                borderRadius: '0.75rem',
                border: '1px solid #E2E8F0',
                backgroundColor: '#0F172A',
                color: '#F8FAFC'
              }}
            />
            <Legend />
            <Bar
              dataKey="baseline"
              fill="#334155"
              radius={[4, 4, 0, 0]}
              isAnimationActive
              animationDuration={850}
              animationEasing="ease-in-out"
            />
            <Bar
              dataKey="current"
              fill="#3B82F6"
              radius={[4, 4, 0, 0]}
              isAnimationActive
              animationDuration={850}
              animationEasing="ease-in-out"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </AnomalyCard>
  );
}

export default HistoricalComparisonChart;

