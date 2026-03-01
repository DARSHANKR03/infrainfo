export const overallHealthScore = 78;

export const healthTrendData = [
  { period: 'Sep', score: 71 },
  { period: 'Oct', score: 72 },
  { period: 'Nov', score: 73 },
  { period: 'Dec', score: 75 },
  { period: 'Jan', score: 76 },
  { period: 'Feb', score: 78 }
];

export const zoneComparisonData = [
  { zone: 'North', score: 82 },
  { zone: 'South', score: 76 },
  { zone: 'East', score: 79 },
  { zone: 'West', score: 72 },
  { zone: 'Central', score: 84 },
  { zone: 'Industrial', score: 68 }
];

export const assetRankingData = [
  { rank: 1, assetId: 'AST-011', assetName: 'Industrial Water Metering Hub', score: 91, zone: 'Industrial' },
  { rank: 2, assetId: 'AST-009', assetName: 'South Zone Water Reservoir A', score: 89, zone: 'South' },
  { rank: 3, assetId: 'AST-007', assetName: 'North Trunk Main 19', score: 87, zone: 'North' },
  { rank: 4, assetId: 'AST-002', assetName: 'Central Pumping Station #2', score: 80, zone: 'Central' },
  { rank: 5, assetId: 'AST-005', assetName: 'East Substation Panel 4', score: 78, zone: 'East' },
  { rank: 6, assetId: 'AST-012', assetName: 'West Grid Transformer T5', score: 74, zone: 'West' },
  { rank: 7, assetId: 'AST-008', assetName: 'Central Flyover Deck Slab', score: 73, zone: 'Central' },
  { rank: 8, assetId: 'AST-006', assetName: 'West Storm Drain Cluster 14', score: 69, zone: 'West' }
];

export const criticalAssets = [
  {
    assetId: 'AST-001',
    assetName: 'North Bridge Expansion Joint',
    zone: 'North',
    healthScore: 41,
    issue: 'Rapid crack expansion in load-bearing section'
  },
  {
    assetId: 'AST-004',
    assetName: 'Industrial Ring Road Segment C',
    zone: 'Industrial',
    healthScore: 38,
    issue: 'Surface failure and structural base settlement'
  },
  {
    assetId: 'AST-010',
    assetName: 'East Waste Transfer Compactor',
    zone: 'East',
    healthScore: 44,
    issue: 'Hydraulic instability and elevated vibration'
  }
];
