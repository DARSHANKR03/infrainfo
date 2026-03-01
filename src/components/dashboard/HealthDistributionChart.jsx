import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip
} from 'recharts';
import DashboardCard from './DashboardCard';
import { healthDistributionData } from '../../pages/dashboardData';

function HealthDistributionChart() {
  return (
    <DashboardCard title="Health Distribution">
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={healthDistributionData}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              outerRadius={95}
              paddingAngle={3}
              isAnimationActive
              animationDuration={900}
            >
              {healthDistributionData.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: '#0F172A',
                border: 'none',
                borderRadius: 12,
                color: '#F8FAFC'
              }}
              labelStyle={{ color: '#93C5FD' }}
              itemStyle={{ color: '#F8FAFC' }}
            />
            <Legend verticalAlign="bottom" align="center" wrapperStyle={{ paddingTop: 8 }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </DashboardCard>
  );
}

export default HealthDistributionChart;
