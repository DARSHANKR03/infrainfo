import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function UserProfilePage() {
  const [activeTab, setActiveTab] = useState('overview');
  const { user } = useAuth();

  // Mock user data - merge with actual user data
  const userData = {
    name: user?.name || 'A. Kumar',
    email: user?.email || 'admin@infrainfo.io',
    role: user?.role || 'System Administrator',
    department: 'IT Operations',
    employeeId: user?.employeeId || 'EMP-001',
    phone: '+1 (555) 123-4567',
    location: 'Metro City HQ',
    joinedDate: 'January 15, 2024',
    lastLogin: 'March 1, 2026 09:15 AM',
    status: 'Active'
  };

  // Get user initials for avatar
  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const userInitials = getInitials(userData.name);

  const recentActivity = [
    { id: 1, action: 'Updated user role for R. Patel', timestamp: '2026-03-01 09:04', type: 'admin' },
    { id: 2, action: 'Generated zone summary report', timestamp: '2026-02-28 18:12', type: 'report' },
    { id: 3, action: 'Created work order WO-2891', timestamp: '2026-02-28 15:30', type: 'maintenance' },
    { id: 4, action: 'Updated threshold for RULE-001', timestamp: '2026-03-01 07:50', type: 'rules' },
    { id: 5, action: 'Approved inspection for ASSET-7821', timestamp: '2026-02-27 14:20', type: 'inspection' }
  ];

  const permissions = [
    { module: 'Dashboard', view: true, edit: true, delete: false },
    { module: 'Assets', view: true, edit: true, delete: true },
    { module: 'Inspections', view: true, edit: true, delete: true },
    { module: 'Alerts', view: true, edit: true, delete: false },
    { module: 'Maintenance', view: true, edit: true, delete: true },
    { module: 'Reports', view: true, edit: true, delete: false },
    { module: 'Administration', view: true, edit: true, delete: true },
    { module: 'System Config', view: true, edit: true, delete: false }
  ];

  const statistics = [
    { label: 'Work Orders Created', value: '47', period: 'Last 30 days' },
    { label: 'Inspections Logged', value: '123', period: 'Last 30 days' },
    { label: 'Reports Generated', value: '18', period: 'Last 30 days' },
    { label: 'Alerts Managed', value: '89', period: 'Last 30 days' }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '👤' },
    { id: 'activity', label: 'Activity Log', icon: '📋' },
    { id: 'permissions', label: 'Permissions', icon: '🔐' },
    { id: 'statistics', label: 'Statistics', icon: '📊' }
  ];

  return (
    <div className="section-gap">
      <div className="page-header-row">
        <div className="page-header">
          <h2>User Profile</h2>
          <p>View and manage your account information and activity.</p>
        </div>
        <Link to="/settings" className="tbl-btn">Settings</Link>
      </div>

      {/* Profile Header Card */}
      <div className="ui-card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
          {/* Avatar */}
          <div style={{
            width: 80,
            height: 80,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--accent-500), var(--accent-400))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontSize: 32,
            fontWeight: 700,
            boxShadow: '0 4px 12px rgba(59,130,246,0.4)'
          }}>
            {userInitials}
          </div>

          {/* User Info */}
          <div style={{ flex: 1, minWidth: 250 }}>
            <h3 style={{ margin: 0, fontSize: 24, fontWeight: 600, color: 'var(--primary-900)' }}>
              {userData.name}
            </h3>
            <p style={{ margin: '0.25rem 0 0', fontSize: 14, color: 'var(--neutral-muted)' }}>
              {userData.email}
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.75rem', flexWrap: 'wrap' }}>
              <span className="badge badge-success">{userData.status}</span>
              <span className="badge badge-primary">{userData.role}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="ui-card" style={{ padding: 0 }}>
        <div style={{
          display: 'flex',
          borderBottom: '2px solid var(--neutral-border)',
          overflowX: 'auto'
        }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '1rem 1.5rem',
                fontSize: 14,
                fontWeight: 600,
                color: activeTab === tab.id ? 'var(--accent-500)' : 'var(--neutral-muted)',
                background: 'transparent',
                border: 'none',
                borderBottom: activeTab === tab.id ? '2px solid var(--accent-500)' : '2px solid transparent',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                whiteSpace: 'nowrap',
                marginBottom: '-2px'
              }}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        <div style={{ padding: '1.5rem' }}>
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <InfoCard label="Employee ID" value={userData.employeeId} />
              <InfoCard label="Department" value={userData.department} />
              <InfoCard label="Phone" value={userData.phone} />
              <InfoCard label="Location" value={userData.location} />
              <InfoCard label="Joined Date" value={userData.joinedDate} />
              <InfoCard label="Last Login" value={userData.lastLogin} />
            </div>
          )}

          {activeTab === 'activity' && (
            <div className="space-y-3">
              <h4 style={{ fontSize: 16, fontWeight: 600, marginBottom: '1rem' }}>Recent Activity</h4>
              {recentActivity.map(activity => (
                <div
                  key={activity.id}
                  style={{
                    padding: '1rem',
                    borderRadius: '0.5rem',
                    border: '1px solid var(--neutral-border)',
                    background: 'var(--neutral-bg)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', gap: '1rem' }}>
                    <div style={{ flex: 1 }}>
                      <p style={{ margin: 0, fontSize: 14, fontWeight: 500, color: 'var(--primary-900)' }}>
                        {activity.action}
                      </p>
                      <p style={{ margin: '0.25rem 0 0', fontSize: 12, color: 'var(--neutral-muted)' }}>
                        {activity.timestamp}
                      </p>
                    </div>
                    <span className={`badge ${
                      activity.type === 'admin' ? 'badge-danger' :
                      activity.type === 'report' ? 'badge-primary' :
                      activity.type === 'maintenance' ? 'badge-warning' :
                      activity.type === 'rules' ? 'badge-info' : 'badge-success'
                    }`}>
                      {activity.type}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'permissions' && (
            <div>
              <h4 style={{ fontSize: 16, fontWeight: 600, marginBottom: '1rem' }}>Access Permissions</h4>
              <div className="ui-table-wrap">
                <table className="ui-table">
                  <thead>
                    <tr>
                      <th>Module</th>
                      <th style={{ textAlign: 'center' }}>View</th>
                      <th style={{ textAlign: 'center' }}>Edit</th>
                      <th style={{ textAlign: 'center' }}>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {permissions.map((perm, idx) => (
                      <tr key={idx}>
                        <td style={{ fontWeight: 500 }}>{perm.module}</td>
                        <td style={{ textAlign: 'center' }}>
                          {perm.view ? <span style={{ color: 'var(--success)', fontSize: 18 }}>✓</span> : <span style={{ color: 'var(--neutral-muted)' }}>—</span>}
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          {perm.edit ? <span style={{ color: 'var(--success)', fontSize: 18 }}>✓</span> : <span style={{ color: 'var(--neutral-muted)' }}>—</span>}
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          {perm.delete ? <span style={{ color: 'var(--success)', fontSize: 18 }}>✓</span> : <span style={{ color: 'var(--neutral-muted)' }}>—</span>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'statistics' && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {statistics.map((stat, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '1.5rem',
                    borderRadius: '0.75rem',
                    border: '1px solid var(--neutral-border)',
                    background: 'var(--neutral-bg)'
                  }}
                >
                  <p style={{ margin: 0, fontSize: 12, fontWeight: 600, color: 'var(--neutral-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {stat.label}
                  </p>
                  <p style={{ margin: '0.5rem 0 0.25rem', fontSize: 32, fontWeight: 700, color: 'var(--accent-500)' }}>
                    {stat.value}
                  </p>
                  <p style={{ margin: 0, fontSize: 11, color: 'var(--neutral-muted)' }}>
                    {stat.period}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function InfoCard({ label, value }) {
  return (
    <div style={{
      padding: '1rem',
      borderRadius: '0.5rem',
      border: '1px solid var(--neutral-border)',
      background: 'var(--neutral-bg)'
    }}>
      <p style={{ margin: 0, fontSize: 12, fontWeight: 600, color: 'var(--neutral-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        {label}
      </p>
      <p style={{ margin: '0.5rem 0 0', fontSize: 14, fontWeight: 500, color: 'var(--primary-900)' }}>
        {value}
      </p>
    </div>
  );
}

export default UserProfilePage;
