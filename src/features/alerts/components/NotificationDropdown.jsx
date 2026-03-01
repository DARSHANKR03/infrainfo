import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { getNotificationFeed, listAlerts } from '../../../shared/services/mockApi/alertsApi';
import AlertSeverityBadge from './AlertSeverityBadge';

const SEVERITIES = {
  Emergency: 'badge-danger',
  Critical:  'badge-danger',
  High:      'badge-warning',
  Medium:    'badge-info',
  Low:       'badge-neutral',
  Info:      'badge-neutral'
};

function BellIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
      <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
    </svg>
  );
}

function NotificationDropdown() {
  const [open, setOpen]   = useState(false);
  const [alerts, setAlerts] = useState([]);
  const dropRef = useRef(null);

  useEffect(() => {
    const load = async () => {
      const data = await listAlerts();
      setAlerts(data);
    };
    load();
    const id = setInterval(load, 8000);
    return () => clearInterval(id);
  }, []);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  const notifications = useMemo(() => getNotificationFeed(alerts), [alerts]);
  const unreadCount = notifications.length;

  return (
    <div ref={dropRef} style={{ position: 'relative' }}>
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="icon-btn"
        aria-label={`Notifications${unreadCount ? ` (${unreadCount} unread)` : ''}`}
        aria-expanded={open}
        style={{ position: 'relative' }}
      >
        <BellIcon />
        {unreadCount > 0 && (
          <span className="notif-badge">{unreadCount > 99 ? '99+' : unreadCount}</span>
        )}
      </button>

      {open && (
        <div className="notif-dropdown anim-dropdown" role="dialog" aria-label="Notifications">
          <div className="notif-header">
            <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--primary-900)' }}>
              Notifications
              {unreadCount > 0 && (
                <span className="badge badge-danger" style={{ marginLeft: 8, fontSize: 10 }}>
                  {unreadCount}
                </span>
              )}
            </span>
            <Link
              to="/alerts"
              onClick={() => setOpen(false)}
              style={{ fontSize: 12, fontWeight: 600, color: 'var(--accent-500)' }}
            >
              View all →
            </Link>
          </div>

          <div style={{ maxHeight: 340, overflowY: 'auto' }}>
            {notifications.length === 0 ? (
              <div style={{ padding: '1.5rem', textAlign: 'center' }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>🔔</div>
                <p style={{ fontSize: 13, color: 'var(--neutral-muted)' }}>All clear — no active alerts.</p>
              </div>
            ) : (
              notifications.map((alert) => (
                <Link
                  key={alert.id}
                  to={`/alerts/${alert.id}`}
                  className="notif-item"
                  onClick={() => setOpen(false)}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8, marginBottom: 4 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--primary-900)', lineHeight: 1.3 }}>
                      {alert.title}
                    </span>
                    <AlertSeverityBadge severity={alert.severity} />
                  </div>
                  <span style={{ fontSize: 11.5, color: 'var(--neutral-muted)' }}>
                    {alert.detectedAt}
                  </span>
                </Link>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default NotificationDropdown;

