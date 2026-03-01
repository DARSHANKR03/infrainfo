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
import DashboardCard from './DashboardCard';
import { zoneHealthData } from '../../pages/dashboardData';

function ZoneHealthChart() {
  return (
    <DashboardCard title="Zone-wise Health">
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={zoneHealthData}>
            <CartesianGrid stroke="#CBD5E1" strokeDasharray="4 4" />
            <XAxis dataKey="zone" stroke="#334155" />
            <YAxis domain={[60, 100]} stroke="#334155" />
            <Tooltip
              formatter={(value) => [`${value}`, 'Health Index']}
              contentStyle={{
                backgroundColor: '#0F172A',
                border: 'none',
                borderRadius: 12,
                color: '#F8FAFC'
              }}
              labelStyle={{ color: '#93C5FD' }}
              itemStyle={{ color: '#F8FAFC' }}
            />
            <Legend verticalAlign="top" align="right" />
            <Bar dataKey="score" fill="#60A5FA" radius={[6, 6, 0, 0]} isAnimationActive animationDuration={900} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </DashboardCard>
  );
}

export default ZoneHealthChart;
