const initialAssets = [
  {
    id: 'AST-001',
    assetName: 'North Bridge Expansion Joint',
    assetType: 'Bridge',
    category: 'Transportation',
    city: 'Metro City',
    zone: 'North',
    ward: 'Ward 11',
    installationDate: '2012-03-15',
    expectedLifespan: 30,
    status: 'Critical',
    tags: ['structural', 'high-traffic'],
    riskRank: 'Very High'
  },
  {
    id: 'AST-002',
    assetName: 'Central Pumping Station #2',
    assetType: 'Pump Station',
    category: 'Water Supply',
    city: 'Metro City',
    zone: 'Central',
    ward: 'Ward 04',
    installationDate: '2018-07-21',
    expectedLifespan: 20,
    status: 'Warning',
    tags: ['pump', 'electrical'],
    riskRank: 'High'
  },
  {
    id: 'AST-003',
    assetName: 'South Wastewater Lift System',
    assetType: 'Lift Station',
    category: 'Wastewater',
    city: 'Metro City',
    zone: 'South',
    ward: 'Ward 19',
    installationDate: '2015-10-09',
    expectedLifespan: 25,
    status: 'Healthy',
    tags: ['wastewater', 'network'],
    riskRank: 'Medium'
  },
  {
    id: 'AST-004',
    assetName: 'Industrial Ring Road Segment C',
    assetType: 'Road',
    category: 'Transportation',
    city: 'Metro City',
    zone: 'Industrial',
    ward: 'Ward 27',
    installationDate: '2010-01-30',
    expectedLifespan: 18,
    status: 'Failed',
    tags: ['pavement', 'freight'],
    riskRank: 'Very High'
  },
  {
    id: 'AST-005',
    assetName: 'East Substation Panel 4',
    assetType: 'Substation',
    category: 'Power',
    city: 'Metro City',
    zone: 'East',
    ward: 'Ward 08',
    installationDate: '2016-12-11',
    expectedLifespan: 22,
    status: 'Warning',
    tags: ['power', 'critical-load'],
    riskRank: 'High'
  },
  {
    id: 'AST-006',
    assetName: 'West Storm Drain Cluster 14',
    assetType: 'Drainage',
    category: 'Stormwater',
    city: 'Metro City',
    zone: 'West',
    ward: 'Ward 23',
    installationDate: '2013-05-05',
    expectedLifespan: 20,
    status: 'Critical',
    tags: ['drain', 'flood-prone'],
    riskRank: 'Very High'
  },
  {
    id: 'AST-007',
    assetName: 'North Trunk Main 19',
    assetType: 'Pipeline',
    category: 'Water Supply',
    city: 'Metro City',
    zone: 'North',
    ward: 'Ward 13',
    installationDate: '2017-09-01',
    expectedLifespan: 35,
    status: 'Healthy',
    tags: ['pipeline', 'bulk-flow'],
    riskRank: 'Medium'
  },
  {
    id: 'AST-008',
    assetName: 'Central Flyover Deck Slab',
    assetType: 'Flyover',
    category: 'Transportation',
    city: 'Metro City',
    zone: 'Central',
    ward: 'Ward 05',
    installationDate: '2011-08-14',
    expectedLifespan: 30,
    status: 'Warning',
    tags: ['bridge', 'urban-core'],
    riskRank: 'High'
  },
  {
    id: 'AST-009',
    assetName: 'South Zone Water Reservoir A',
    assetType: 'Reservoir',
    category: 'Water Supply',
    city: 'Metro City',
    zone: 'South',
    ward: 'Ward 17',
    installationDate: '2019-02-18',
    expectedLifespan: 40,
    status: 'Healthy',
    tags: ['reservoir', 'storage'],
    riskRank: 'Low'
  },
  {
    id: 'AST-010',
    assetName: 'East Waste Transfer Compactor',
    assetType: 'Compactor',
    category: 'Solid Waste',
    city: 'Metro City',
    zone: 'East',
    ward: 'Ward 09',
    installationDate: '2014-06-22',
    expectedLifespan: 15,
    status: 'Critical',
    tags: ['waste', 'mechanical'],
    riskRank: 'Very High'
  },
  {
    id: 'AST-011',
    assetName: 'Industrial Water Metering Hub',
    assetType: 'Metering Hub',
    category: 'Water Supply',
    city: 'Metro City',
    zone: 'Industrial',
    ward: 'Ward 29',
    installationDate: '2020-04-03',
    expectedLifespan: 12,
    status: 'Healthy',
    tags: ['metering', 'iot'],
    riskRank: 'Low'
  },
  {
    id: 'AST-012',
    assetName: 'West Grid Transformer T5',
    assetType: 'Transformer',
    category: 'Power',
    city: 'Metro City',
    zone: 'West',
    ward: 'Ward 22',
    installationDate: '2012-11-02',
    expectedLifespan: 25,
    status: 'Warning',
    tags: ['power', 'grid'],
    riskRank: 'High'
  }
];

let assets = [...initialAssets];

const wait = (ms = 250) => new Promise((resolve) => setTimeout(resolve, ms));

const buildProfile = (asset) => {
  const installYear = new Date(asset.installationDate).getFullYear();

  return {
    lifecycleTimeline: [
      {
        date: `${installYear}-01-01`,
        label: 'Planned',
        detail: 'Asset approved in municipal CAPEX plan.'
      },
      {
        date: asset.installationDate,
        label: 'Commissioned',
        detail: 'Asset installed and handed to operations.'
      },
      {
        date: `${installYear + 5}-06-01`,
        label: 'Mid-life Overhaul',
        detail: 'Core components serviced and recalibrated.'
      },
      {
        date: `${installYear + asset.expectedLifespan}-12-31`,
        label: 'End-of-Life Estimate',
        detail: 'Replacement planning milestone.'
      }
    ],
    inspections: [
      {
        id: 'INSP-901',
        date: '2026-01-16',
        inspector: 'Priya N.',
        score: 63,
        status: 'Needs Action'
      },
      {
        id: 'INSP-844',
        date: '2025-10-08',
        inspector: 'Karan S.',
        score: 71,
        status: 'Monitor'
      },
      {
        id: 'INSP-802',
        date: '2025-06-22',
        inspector: 'Anita R.',
        score: 77,
        status: 'Stable'
      }
    ],
    healthTrend: [
      { month: 'Sep', health: 79 },
      { month: 'Oct', health: 76 },
      { month: 'Nov', health: 74 },
      { month: 'Dec', health: 71 },
      { month: 'Jan', health: 68 },
      { month: 'Feb', health: 66 }
    ],
    maintenanceHistory: [
      {
        date: '2026-01-18',
        workOrder: 'WO-1041',
        type: 'Preventive',
        summary: 'Bearing lubrication and sensor calibration.'
      },
      {
        date: '2025-11-07',
        workOrder: 'WO-996',
        type: 'Corrective',
        summary: 'Replaced worn coupler and re-tested load.'
      },
      {
        date: '2025-07-11',
        workOrder: 'WO-933',
        type: 'Inspection Follow-up',
        summary: 'Surface crack sealing and vibration test.'
      }
    ],
    alertsHistory: [
      {
        date: '2026-02-22',
        code: 'ALT-2301',
        severity: 'Critical',
        message: 'Abnormal vibration crossing threshold.'
      },
      {
        date: '2026-02-12',
        code: 'ALT-2285',
        severity: 'High',
        message: 'Temperature drift on component cluster.'
      },
      {
        date: '2026-01-29',
        code: 'ALT-2248',
        severity: 'Medium',
        message: 'Intermittent telemetry dropout observed.'
      }
    ]
  };
};

export async function listAssets() {
  await wait();
  return [...assets];
}

export async function getAssetById(assetId) {
  await wait();
  return assets.find((asset) => asset.id === assetId) || null;
}

export async function getAssetDigitalProfile(assetId) {
  await wait();
  const asset = assets.find((item) => item.id === assetId);

  if (!asset) {
    return null;
  }

  return {
    asset,
    ...buildProfile(asset)
  };
}

export async function createAsset(payload) {
  await wait();

  const nextId = `AST-${String(assets.length + 1).padStart(3, '0')}`;
  const newAsset = {
    id: nextId,
    riskRank: payload.riskRank || 'Medium',
    ...payload
  };

  assets = [newAsset, ...assets];
  return newAsset;
}

export async function updateAsset(assetId, payload) {
  await wait();

  assets = assets.map((asset) =>
    asset.id === assetId
      ? {
          ...asset,
          ...payload
        }
      : asset
  );

  return assets.find((asset) => asset.id === assetId) || null;
}

export async function deleteAsset(assetId) {
  await wait();
  assets = assets.filter((asset) => asset.id !== assetId);
  return true;
}

export async function bulkUploadAssets(records) {
  await wait();

  const inserted = records.map((record, index) => ({
    id: `AST-${String(assets.length + index + 1).padStart(3, '0')}`,
    assetName: record.assetName || `Uploaded Asset ${index + 1}`,
    assetType: record.assetType || 'Unknown',
    category: record.category || 'General',
    city: record.city || 'Metro City',
    zone: record.zone || 'Central',
    ward: record.ward || 'Ward 01',
    installationDate: record.installationDate || '2024-01-01',
    expectedLifespan: Number(record.expectedLifespan || 15),
    status: record.status || 'Healthy',
    tags: record.tags
      ? record.tags.split('|').map((item) => item.trim()).filter(Boolean)
      : ['uploaded'],
    riskRank: record.riskRank || 'Medium'
  }));

  assets = [...inserted, ...assets];

  return {
    uploaded: inserted.length,
    failed: 0
  };
}

export function getAssetFilterOptions(dataset) {
  return {
    types: [...new Set(dataset.map((item) => item.assetType))],
    zones: [...new Set(dataset.map((item) => item.zone))],
    statuses: ['Healthy', 'Warning', 'Critical', 'Failed']
  };
}
