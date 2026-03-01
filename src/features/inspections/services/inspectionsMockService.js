const assetTypeParameters = {
  Bridge: [
    { key: 'crackWidth', label: 'Crack Width (mm)', type: 'number', min: 0, max: 50 },
    { key: 'jointCondition', label: 'Expansion Joint Condition (1-5)', type: 'number', min: 1, max: 5 },
    { key: 'corrosionLevel', label: 'Corrosion Level (%)', type: 'number', min: 0, max: 100 }
  ],
  Pipeline: [
    { key: 'pressure', label: 'Line Pressure (bar)', type: 'number', min: 0, max: 100 },
    { key: 'flowRate', label: 'Flow Rate (L/s)', type: 'number', min: 0, max: 1000 },
    { key: 'leakSignal', label: 'Leak Signal Strength', type: 'number', min: 0, max: 10 }
  ],
  Transformer: [
    { key: 'oilTemp', label: 'Oil Temperature (C)', type: 'number', min: -20, max: 150 },
    { key: 'loadFactor', label: 'Load Factor (%)', type: 'number', min: 0, max: 150 },
    { key: 'insulationResistance', label: 'Insulation Resistance (MOhm)', type: 'number', min: 0, max: 2000 }
  ],
  'Pump Station': [
    { key: 'vibration', label: 'Vibration (mm/s)', type: 'number', min: 0, max: 25 },
    { key: 'dischargePressure', label: 'Discharge Pressure (bar)', type: 'number', min: 0, max: 50 },
    { key: 'motorCurrent', label: 'Motor Current (A)', type: 'number', min: 0, max: 1000 }
  ]
};

const assets = [
  { id: 'AST-001', name: 'North Bridge Expansion Joint', assetType: 'Bridge', zone: 'North' },
  { id: 'AST-002', name: 'Central Pumping Station #2', assetType: 'Pump Station', zone: 'Central' },
  { id: 'AST-007', name: 'North Trunk Main 19', assetType: 'Pipeline', zone: 'North' },
  { id: 'AST-012', name: 'West Grid Transformer T5', assetType: 'Transformer', zone: 'West' }
];

let inspectionTimeline = [
  {
    id: 'INS-2026-209',
    date: '2026-02-27',
    title: 'Critical follow-up inspection completed',
    detail: 'AST-001 bridge expansion joint marked for urgent maintenance.',
    inspector: 'R. Kumar'
  },
  {
    id: 'INS-2026-204',
    date: '2026-02-25',
    title: 'Routine inspection submitted',
    detail: 'AST-002 pump station vibration above baseline threshold.',
    inspector: 'P. Nair'
  },
  {
    id: 'INS-2026-197',
    date: '2026-02-21',
    title: 'Post-maintenance validation passed',
    detail: 'AST-012 transformer load stabilized after coolant servicing.',
    inspector: 'S. Menon'
  },
  {
    id: 'INS-2026-186',
    date: '2026-02-17',
    title: 'Inspection overdue escalated',
    detail: 'AST-007 pipeline overdue by 9 days in North zone.',
    inspector: 'System'
  }
];

const complianceTracker = [
  { zone: 'North', scheduled: 52, completed: 47, overdue: 5, compliance: 90 },
  { zone: 'South', scheduled: 44, completed: 42, overdue: 2, compliance: 95 },
  { zone: 'East', scheduled: 37, completed: 34, overdue: 3, compliance: 92 },
  { zone: 'West', scheduled: 40, completed: 35, overdue: 5, compliance: 88 },
  { zone: 'Central', scheduled: 49, completed: 46, overdue: 3, compliance: 94 },
  { zone: 'Industrial', scheduled: 33, completed: 27, overdue: 6, compliance: 82 }
];

const scheduleEntries = [
  { date: '2026-03-02', count: 3, zone: 'North' },
  { date: '2026-03-05', count: 5, zone: 'Central' },
  { date: '2026-03-09', count: 2, zone: 'West' },
  { date: '2026-03-12', count: 4, zone: 'South' },
  { date: '2026-03-16', count: 3, zone: 'Industrial' },
  { date: '2026-03-19', count: 2, zone: 'East' },
  { date: '2026-03-23', count: 6, zone: 'North' },
  { date: '2026-03-27', count: 3, zone: 'West' }
];

const wait = (ms = 250) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getInspectionOverview() {
  await wait();
  return {
    timeline: [...inspectionTimeline],
    compliance: [...complianceTracker],
    schedule: [...scheduleEntries]
  };
}

export async function getInspectionFormMeta() {
  await wait();
  return {
    assets: [...assets],
    assetTypes: Object.keys(assetTypeParameters),
    parametersByType: assetTypeParameters
  };
}

export async function submitInspection(payload) {
  await wait();

  const inspectionId = `INS-2026-${Math.floor(300 + Math.random() * 100)}`;
  inspectionTimeline = [
    {
      id: inspectionId,
      date: payload.inspectionDate,
      title: `${payload.inspectionType} inspection submitted`,
      detail: `${payload.assetId} ${payload.assetName} inspected in ${payload.zone} zone.`,
      inspector: payload.inspectorName
    },
    ...inspectionTimeline
  ];

  return { id: inspectionId, success: true };
}

export async function bulkUploadInspections(records) {
  await wait();
  return {
    uploaded: records.length,
    failed: 0
  };
}
