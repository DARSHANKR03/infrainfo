import AdminCard from './AdminCard';

function RoleAccessMatrix({ rows, roles }) {
  return (
    <AdminCard title="Role-Based Access UI" subtitle="Permission matrix by role and module.">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-neutral-border">
              <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-primary-500">
                Module
              </th>
              {roles.map((role) => (
                <th
                  key={role}
                  className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-primary-500"
                >
                  {role}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.module} className="border-b border-neutral-border text-sm text-primary-700">
                <td className="px-3 py-2 font-semibold text-primary-900">{row.module}</td>
                {roles.map((role) => (
                  <td key={`${row.module}-${role}`} className="px-3 py-2">
                    <span
                      className={[
                        'inline-flex rounded-full px-2 py-1 text-xs font-semibold',
                        row[role] ? 'bg-success/15 text-success' : 'bg-neutral-bg text-primary-500'
                      ].join(' ')}
                    >
                      {row[role] ? 'Allowed' : 'Blocked'}
                    </span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminCard>
  );
}

export default RoleAccessMatrix;

