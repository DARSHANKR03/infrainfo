export const anomalyRecords = [
  {
    id: 'ANM-001',
    assetId: 'AST-001',
    assetName: 'North Bridge Expansion Joint',
    type: 'Spike',
    metric: 'Vibration',
    detectedAt: '2026-02-26 10:12',
    severity: 'High',
    deviationSigma: 3.8,
    repeatedCount: 4
  },
  {
    id: 'ANM-002',
    assetId: 'AST-012',
    assetName: 'West Grid Transformer T5',
    type: 'Drift',
    metric: 'Oil Temperature',
    detectedAt: '2026-02-25 18:40',
    severity: 'Medium',
    deviationSigma: 2.6,
    repeatedCount: 2
  },
  {
    id: 'ANM-003',
    assetId: 'AST-007',
    assetName: 'North Trunk Main 19',
    type: 'Outlier',
    metric: 'Pressure',
    detectedAt: '2026-02-24 09:20',
    severity: 'Low',
    deviationSigma: 2.1,
    repeatedCount: 1
  },
  {
    id: 'ANM-004',
    assetId: 'AST-004',
    assetName: 'Industrial Ring Road Segment C',
    type: 'Repeated',
    metric: 'Surface Deflection',
    detectedAt: '2026-02-23 14:05',
    severity: 'High',
    deviationSigma: 3.2,
    repeatedCount: 6
  },
  {
    id: 'ANM-005',
    assetId: 'AST-010',
    assetName: 'East Waste Transfer Compactor',
    type: 'Spike',
    metric: 'Hydraulic Pressure',
    detectedAt: '2026-02-22 11:33',
    severity: 'Critical',
    deviationSigma: 4.6,
    repeatedCount: 3
  },
  {
    id: 'ANM-006',
    assetId: 'AST-002',
    assetName: 'Central Pumping Station #2',
    type: 'Drift',
    metric: 'Motor Current',
    detectedAt: '2026-02-21 16:18',
    severity: 'Medium',
    deviationSigma: 2.8,
    repeatedCount: 2
  }
];

export const degradationTrendData = [
  { period: 'Sep', score: 82 },
  { period: 'Oct', score: 80 },
  { period: 'Nov', score: 78 },
  { period: 'Dec', score: 76 },
  { period: 'Jan', score: 73 },
  { period: 'Feb', score: 70 }
];

export const historicalComparisonData = [
  { period: 'W1', baseline: 12, current: 14 },
  { period: 'W2', baseline: 11, current: 15 },
  { period: 'W3', baseline: 13, current: 18 },
  { period: 'W4', baseline: 12, current: 20 },
  { period: 'W5', baseline: 11, current: 17 },
  { period: 'W6', baseline: 10, current: 16 }
];
