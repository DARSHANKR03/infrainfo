export const kpiData = [
  { key: 'totalAssets', label: 'Total Assets', value: '1,284', delta: '+2.1% vs last month', deltaType: 'positive' },
  { key: 'healthyPercent', label: 'Healthy %', value: '86.4%', delta: '+1.4% vs last month', deltaType: 'positive' },
  { key: 'criticalAssets', label: 'Critical Assets', value: '74', delta: '-6 this week', deltaType: 'positive' },
  { key: 'activeAlerts', label: 'Active Alerts', value: '39', delta: '+5 in last 24h', deltaType: 'negative' },
  { key: 'overdueInspections', label: 'Overdue Inspections', value: '18', delta: '+2 this week', deltaType: 'negative' }
];

export const healthDistributionData = [
  { name: 'Healthy', value: 864, color: '#22C55E' },
  { name: 'Warning', value: 346, color: '#F59E0B' },
  { name: 'Critical', value: 74, color: '#EF4444' }
];

export const healthTrendByPeriod = {
  '7D': [
    { period: 'Mon', health: 85.1 },
    { period: 'Tue', health: 85.4 },
    { period: 'Wed', health: 85.8 },
    { period: 'Thu', health: 85.6 },
    { period: 'Fri', health: 86.0 },
    { period: 'Sat', health: 86.2 },
    { period: 'Sun', health: 86.4 }
  ],
  '30D': [
    { period: 'W1', health: 84.2 },
    { period: 'W2', health: 84.9 },
    { period: 'W3', health: 85.5 },
    { period: 'W4', health: 86.4 }
  ],
  '90D': [
    { period: 'Nov', health: 82.8 },
    { period: 'Dec', health: 83.6 },
    { period: 'Jan', health: 84.9 },
    { period: 'Feb', health: 86.4 }
  ]
};

export const zoneHealthData = [
  { zone: 'North', score: 88 },
  { zone: 'South', score: 81 },
  { zone: 'East', score: 84 },
  { zone: 'West', score: 79 },
  { zone: 'Central', score: 90 },
  { zone: 'Industrial', score: 74 }
];

export const topRiskAssets = [
  { assetId: 'BRG-014', assetName: 'Riverfront Bridge Expansion Joint', zone: 'West', riskScore: 96, condition: 'Critical', lastInspection: '2026-01-14' },
  { assetId: 'WTP-022', assetName: 'North Water Treatment Pump #2', zone: 'North', riskScore: 94, condition: 'Critical', lastInspection: '2025-12-29' },
  { assetId: 'RD-311', assetName: 'Industrial Ring Road Segment C', zone: 'Industrial', riskScore: 93, condition: 'Critical', lastInspection: '2026-01-08' },
  { assetId: 'STN-087', assetName: 'Metro Substation Panel 4', zone: 'Central', riskScore: 91, condition: 'Warning', lastInspection: '2026-01-24' },
  { assetId: 'DRN-201', assetName: 'Storm Drain Cluster 201', zone: 'South', riskScore: 90, condition: 'Warning', lastInspection: '2025-12-18' },
  { assetId: 'BRG-031', assetName: 'Canal Bridge Bearing Set', zone: 'East', riskScore: 89, condition: 'Warning', lastInspection: '2026-01-12' },
  { assetId: 'PWR-055', assetName: 'West Grid Transformer T5', zone: 'West', riskScore: 88, condition: 'Warning', lastInspection: '2026-01-27' },
  { assetId: 'WW-109', assetName: 'Wastewater Valve Cluster A', zone: 'South', riskScore: 87, condition: 'Warning', lastInspection: '2025-12-21' },
  { assetId: 'RD-222', assetName: 'Central Flyover Deck', zone: 'Central', riskScore: 86, condition: 'Warning', lastInspection: '2026-01-20' },
  { assetId: 'TRK-019', assetName: 'Utility Trunk Main 19', zone: 'North', riskScore: 85, condition: 'Warning', lastInspection: '2026-01-19' }
];

export const notifications = [
  { id: 1, title: 'Critical vibration spike detected', detail: 'North Water Treatment Pump #2 exceeded threshold by 18%.', time: '8 min ago', severity: 'Critical' },
  { id: 2, title: 'Inspection overdue', detail: 'Storm Drain Cluster 201 inspection overdue by 11 days.', time: '24 min ago', severity: 'High' },
  { id: 3, title: 'Alert acknowledged', detail: 'West Grid Transformer T5 thermal alert marked in progress.', time: '1 hr ago', severity: 'Medium' },
  { id: 4, title: 'Risk score elevated', detail: 'Riverfront Bridge Expansion Joint moved to risk score 96.', time: '2 hrs ago', severity: 'Critical' },
  { id: 5, title: 'Rule update deployed', detail: 'Leak anomaly threshold update applied for Industrial zone.', time: '5 hrs ago', severity: 'Info' }
];

export const riskHeatmap = {
  likelihood: ['Rare', 'Unlikely', 'Possible', 'Likely', 'Almost Certain'],
  impact: ['Negligible', 'Minor', 'Moderate', 'Major', 'Severe'],
  cells: [
    [1, 1, 2, 2, 3],
    [1, 2, 2, 3, 3],
    [2, 2, 3, 4, 4],
    [2, 3, 4, 4, 5],
    [3, 4, 4, 5, 5]
  ]
};
