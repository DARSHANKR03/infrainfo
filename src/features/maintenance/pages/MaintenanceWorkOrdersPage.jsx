import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import MaintenanceCalendarView from '../components/MaintenanceCalendarView';
import ReusableTable from '../components/ReusableTable';
import StatusTracker from '../components/StatusTracker';
import StatusBadge from '../../../shared/components/status/StatusBadge';
import {
  buildCalendarEvents,
  listWorkOrders,
  updateWorkOrderStatus
} from '../../../shared/services/mockApi/maintenanceApi';

function PriorityBadge({ priority }) {
  const map = {
    Low:       'badge badge-success',
    Medium:    'badge badge-info',
    High:      'badge badge-warning',
    Emergency: 'badge badge-danger'
  };
  return <span className={map[priority] || 'badge badge-neutral'}>{priority}</span>;
}

function MaintenanceWorkOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  const calendarEvents = useMemo(() => buildCalendarEvents(orders), [orders]);

  const columns = [
    { key: 'id', label: 'Work Order' },
    { key: 'assetName', label: 'Asset' },
    { key: 'priority', label: 'Priority' },
    { key: 'technician', label: 'Technician' },
    { key: 'status', label: 'Status' },
    { key: 'scheduledDate', label: 'Scheduled' },
    { key: 'estimatedCost', label: 'Estimated Cost' },
    { key: 'actions', label: 'Actions' }
  ];

  const handleStatusChange = async (id, nextStatus) => {
    await updateWorkOrderStatus(id, nextStatus);
    await loadOrders();
  };

  async function loadOrders() {
    const data = await listWorkOrders();
    setOrders(data);
    setLoading(false);
  }

  if (loading) {
    return (
      <div className="loading-state">
        <div className="loading-spinner" />
        <span>Loading work orders…</span>
      </div>
    );
  }

  return (
    <div className="section-gap">
      <div className="page-header-row">
        <div className="page-header">
          <h2>Maintenance &amp; Work Orders</h2>
          <p>Plan, assign, and track maintenance execution across municipal assets.</p>
        </div>
        <Link
          to="/maintenance-work-orders/new"
          className="ui-btn ui-btn-primary"
        >
          + Create Work Order
        </Link>
      </div>

      <StatusTracker workOrders={orders} />

      <ReusableTable
        columns={columns}
        rows={orders}
        renderCell={(row, column) => {
          if (column.key === 'id') {
            return (
              <div>
                <p className="font-semibold text-primary-900">{row.id}</p>
                <p className="text-xs text-primary-500">{row.title}</p>
              </div>
            );
          }
          if (column.key === 'priority') return <PriorityBadge priority={row.priority} />;
          if (column.key === 'status') {
            return (
              <StatusBadge value={row.status} />
            );
          }
          if (column.key === 'estimatedCost') return row.estimatedCost.toLocaleString();
          if (column.key === 'actions') {
            return (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                <button type="button" onClick={() => handleStatusChange(row.id, 'Open')} className="tbl-btn">
                  Open
                </button>
                <button type="button" onClick={() => handleStatusChange(row.id, 'In Progress')} className="tbl-btn tbl-btn-warn">
                  In Progress
                </button>
                <button type="button" onClick={() => handleStatusChange(row.id, 'Completed')} className="tbl-btn tbl-btn-ok">
                  Completed
                </button>
              </div>
            );
          }
          return row[column.key];
        }}
      />

      <MaintenanceCalendarView events={calendarEvents} />
    </div>
  );
}

export default MaintenanceWorkOrdersPage;
