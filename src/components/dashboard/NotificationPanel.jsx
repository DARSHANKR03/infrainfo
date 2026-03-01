import DashboardCard from './DashboardCard';
import { notifications } from '../../pages/dashboardData';

const severityStyles = {
  Critical: 'bg-danger/15 text-danger',
  High: 'bg-warning/15 text-warning',
  Medium: 'bg-accent-300/20 text-accent-500',
  Info: 'bg-neutral-bg text-primary-700'
};

function NotificationPanel() {
  return (
    <DashboardCard title="Notifications">
      <div className="space-y-3">
        {notifications.map((item) => (
          <article key={item.id} className="rounded-xl border border-neutral-border p-3">
            <div className="mb-2 flex items-center justify-between gap-2">
              <p className="text-sm font-semibold text-primary-900">{item.title}</p>
              <span className={['rounded-full px-2 py-1 text-xs font-semibold', severityStyles[item.severity]].join(' ')}>
                {item.severity}
              </span>
            </div>
            <p className="text-sm text-primary-500">{item.detail}</p>
            <p className="mt-2 text-xs text-primary-500">{item.time}</p>
          </article>
        ))}
      </div>
    </DashboardCard>
  );
}

export default NotificationPanel;

