import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import AuditLogViewer from '../components/AuditLogViewer';
import MultiCitySelector from '../components/MultiCitySelector';
import RoleAccessMatrix from '../components/RoleAccessMatrix';
import UserManagementTable from '../components/UserManagementTable';
import { getAdminMeta, listUsers } from '../../../shared/services/mockApi/adminApi';

function AdministrationDashboardPage() {
  const [meta, setMeta] = useState({
    roles: [],
    cities: [],
    roleAccess: [],
    activityAuditLog: [],
    ruleChangeAuditLog: []
  });
  const [users, setUsers] = useState([]);
  const [selectedCity, setSelectedCity] = useState('All Cities');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const [metaData, usersData] = await Promise.all([getAdminMeta(), listUsers()]);
      setMeta(metaData);
      setUsers(usersData);
      setLoading(false);
    };
    load();
  }, []);

  const cityFilteredUsers = useMemo(() => {
    if (selectedCity === 'All Cities') return users;
    return users.filter((user) => user.city === selectedCity);
  }, [users, selectedCity]);

  const activityRows = useMemo(() => {
    if (selectedCity === 'All Cities') return meta.activityAuditLog;
    return meta.activityAuditLog.filter((row) => row.city === selectedCity);
  }, [meta.activityAuditLog, selectedCity]);

  if (loading) {
    return (
      <div className="loading-state">
        <div className="loading-spinner" />
        <span>Loading administration dashboard…</span>
      </div>
    );
  }

  return (
    <div className="section-gap">
      <div className="page-header-row">
        <div className="page-header">
          <h2>Administration</h2>
          <p>Manage access, users, and audit trails across cities.</p>
        </div>
        <Link to="/administration/system-config" className="tbl-btn">
          System Configuration
        </Link>
      </div>

      <MultiCitySelector
        cities={meta.cities}
        selectedCity={selectedCity}
        onChange={setSelectedCity}
      />

      <RoleAccessMatrix rows={meta.roleAccess} roles={meta.roles} />
      <UserManagementTable users={cityFilteredUsers} />

      <div className="grid-2-3">
        <div>
          <AuditLogViewer
            title="Activity Audit Log Viewer"
            subtitle="Recent administrative and operational user actions."
            columns={[
              { key: 'time', label: 'Time' },
              { key: 'user', label: 'User' },
              { key: 'action', label: 'Action' },
              { key: 'city', label: 'City' }
            ]}
            rows={activityRows}
          />
        </div>
        <div>
          <AuditLogViewer
            title="Rule Change Audit Log"
            subtitle="Recent rule and threshold modifications."
            columns={[
              { key: 'time', label: 'Time' },
              { key: 'ruleId', label: 'Rule' },
              { key: 'action', label: 'Change' },
              { key: 'changedBy', label: 'By' },
              { key: 'version', label: 'Version' }
            ]}
            rows={meta.ruleChangeAuditLog}
          />
        </div>
      </div>
    </div>
  );
}

export default AdministrationDashboardPage;

