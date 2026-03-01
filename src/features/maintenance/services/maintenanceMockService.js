let workOrders = [
  {
    id: 'WO-1301',
    assetId: 'AST-001',
    assetName: 'North Bridge Expansion Joint',
    title: 'Emergency structural check',
    priority: 'Emergency',
    technician: 'A. Kumar',
    status: 'Open',
    scheduledDate: '2026-03-02',
    estimatedCost: 12500
  },
  {
    id: 'WO-1302',
    assetId: 'AST-012',
    assetName: 'West Grid Transformer T5',
    title: 'Oil cooling system servicing',
    priority: 'High',
    technician: 'R. Patel',
    status: 'In Progress',
    scheduledDate: '2026-03-03',
    estimatedCost: 7200
  },
  {
    id: 'WO-1303',
    assetId: 'AST-002',
    assetName: 'Central Pumping Station #2',
    title: 'Hydraulic pressure stabilization',
    priority: 'Medium',
    technician: 'S. Menon',
    status: 'Completed',
    scheduledDate: '2026-02-28',
    estimatedCost: 4600
  },
  {
    id: 'WO-1304',
    assetId: 'AST-004',
    assetName: 'Industrial Ring Road Segment C',
    title: 'Surface settlement repair',
    priority: 'High',
    technician: 'P. Nair',
    status: 'Open',
    scheduledDate: '2026-03-06',
    estimatedCost: 9800
  }
];

const technicians = [
  'A. Kumar',
  'R. Patel',
  'S. Menon',
  'P. Nair',
  'D. Iyer',
  'M. Rao'
];

const wait = (ms = 180) => new Promise((resolve) => setTimeout(resolve, ms));

export async function listWorkOrders() {
  await wait();
  return [...workOrders];
}

export async function getTechnicians() {
  await wait();
  return [...technicians];
}

export async function createWorkOrder(payload) {
  await wait();
  const nextId = `WO-${String(1301 + workOrders.length).padStart(4, '0')}`;
  const record = {
    id: nextId,
    ...payload
  };
  workOrders = [record, ...workOrders];
  return record;
}

export async function updateWorkOrderStatus(workOrderId, nextStatus) {
  await wait();
  workOrders = workOrders.map((order) =>
    order.id === workOrderId
      ? {
          ...order,
          status: nextStatus
        }
      : order
  );
  return workOrders.find((order) => order.id === workOrderId) || null;
}

export function buildCalendarEvents(sourceOrders) {
  return sourceOrders.map((order) => ({
    date: order.scheduledDate,
    label: `${order.id} - ${order.assetName}`,
    status: order.status
  }));
}
