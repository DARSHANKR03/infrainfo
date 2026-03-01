let users = [
  {
    id: 'USR-001',
    name: 'A. Kumar',
    email: 'akumar@city.gov',
    role: 'Admin',
    city: 'Metro City',
    status: 'Active',
    lastActive: '2026-03-01 09:20'
  },
  {
    id: 'USR-002',
    name: 'R. Patel',
    email: 'rpatel@city.gov',
    role: 'Operations Manager',
    city: 'Metro City',
    status: 'Active',
    lastActive: '2026-03-01 08:54'
  },
  {
    id: 'USR-003',
    name: 'S. Menon',
    email: 'smenon@city.gov',
    role: 'Field Engineer',
    city: 'River City',
    status: 'Active',
    lastActive: '2026-02-28 19:11'
  },
  {
    id: 'USR-004',
    name: 'D. Iyer',
    email: 'diyer@city.gov',
    role: 'Auditor',
    city: 'Coastal City',
    status: 'Inactive',
    lastActive: '2026-02-22 14:07'
  }
];

const roles = ['Admin', 'Operations Manager', 'Field Engineer', 'Auditor', 'Viewer'];
const cities = ['Metro City', 'River City', 'Coastal City', 'Hill City'];

const roleAccess = [
  { module: 'Assets', Admin: true, 'Operations Manager': true, 'Field Engineer': true, Auditor: true, Viewer: true },
  { module: 'Inspections', Admin: true, 'Operations Manager': true, 'Field Engineer': true, Auditor: true, Viewer: false },
  { module: 'Rules & Thresholds', Admin: true, 'Operations Manager': true, 'Field Engineer': false, Auditor: true, Viewer: false },
  { module: 'Alerts', Admin: true, 'Operations Manager': true, 'Field Engineer': true, Auditor: true, Viewer: true },
  { module: 'Administration', Admin: true, 'Operations Manager': false, 'Field Engineer': false, Auditor: true, Viewer: false }
];

const activityAuditLog = [
  { time: '2026-03-01 09:04', user: 'A. Kumar', action: 'Updated user role for R. Patel', city: 'Metro City' },
  { time: '2026-03-01 08:45', user: 'R. Patel', action: 'Acknowledged alert ALT-2401', city: 'Metro City' },
  { time: '2026-03-01 08:18', user: 'S. Menon', action: 'Submitted inspection INS-2026-318', city: 'River City' },
  { time: '2026-02-28 18:12', user: 'A. Kumar', action: 'Generated zone summary report', city: 'Metro City' }
];

const ruleChangeAuditLog = [
  { time: '2026-03-01 07:50', ruleId: 'RULE-001', action: 'Threshold updated', changedBy: 'A. Kumar', version: 'v4' },
  { time: '2026-02-28 16:35', ruleId: 'RULE-002', action: 'Logic changed AND -> OR', changedBy: 'R. Patel', version: 'v3' },
  { time: '2026-02-27 12:10', ruleId: 'RULE-005', action: 'Rule created', changedBy: 'A. Kumar', version: 'v1' }
];

const wait = (ms = 160) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getAdminMeta() {
  await wait();
  return {
    roles: [...roles],
    cities: [...cities],
    roleAccess: [...roleAccess],
    activityAuditLog: [...activityAuditLog],
    ruleChangeAuditLog: [...ruleChangeAuditLog]
  };
}

export async function listUsers() {
  await wait();
  return [...users];
}

export async function getUserById(userId) {
  await wait();
  return users.find((user) => user.id === userId) || null;
}

export async function createUser(payload) {
  await wait();
  const id = `USR-${String(users.length + 1).padStart(3, '0')}`;
  const newUser = {
    id,
    lastActive: 'Never',
    ...payload
  };
  users = [newUser, ...users];
  return newUser;
}

export async function updateUser(userId, payload) {
  await wait();
  users = users.map((user) => (user.id === userId ? { ...user, ...payload } : user));
  return users.find((user) => user.id === userId) || null;
}
