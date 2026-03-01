import { Link } from 'react-router-dom';
import AdminCard from './AdminCard';
import StatusBadge from '../../../shared/components/status/StatusBadge';

const ROLE_CLASS = {
  'Admin':              'badge-role badge-role-admin',
  'Operations Manager': 'badge-role badge-role-ops',
  'Field Engineer':     'badge-role badge-role-engineer',
  'Auditor':            'badge-role badge-role-auditor',
  'Viewer':             'badge-role badge-role-viewer',
};

function RoleBadge({ role }) {
  return (
    <span className={ROLE_CLASS[role] || 'badge-role badge-role-viewer'}>{role}</span>
  );
}

function UserManagementTable({ users }) {
  return (
    <AdminCard
      title="User Management"
      subtitle="Manage platform users and role assignments."
      action={
        <Link to="/administration/users/new" className="ui-btn ui-btn-primary">
          + Add User
        </Link>
      }
    >
      <div className="ui-table-wrap" style={{ boxShadow: 'none', border: 'none', borderRadius: 0 }}>
        <table className="ui-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Role</th>
              <th>City</th>
              <th>Status</th>
              <th>Last Active</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.length ? users.map((user) => (
              <tr key={user.id}>
                <td>
                  <p className="tbl-primary">{user.name}</p>
                  <p className="tbl-sub">{user.email}</p>
                </td>
                <td><RoleBadge role={user.role} /></td>
                <td>{user.city}</td>
                <td><StatusBadge value={user.status} /></td>
                <td>{user.lastActive}</td>
                <td>
                  <div className="tbl-actions">
                    <Link to={`/administration/users/${user.id}/edit`} className="tbl-btn">Edit</Link>
                  </div>
                </td>
              </tr>
            )) : (
              <tr><td colSpan={6} className="tbl-empty">No users found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </AdminCard>
  );
}

export default UserManagementTable;
