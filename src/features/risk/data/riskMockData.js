export const overallRiskScore = 72;

export const riskTrendData = [
  { period: 'Sep', score: 58 },
  { period: 'Oct', score: 61 },
  { period: 'Nov', score: 64 },
  { period: 'Dec', score: 67 },
  { period: 'Jan', score: 69 },
  { period: 'Feb', score: 72 }
];

export const criticalityIndexData = [
  { assetId: 'AST-001', assetName: 'North Bridge Expansion Joint', zone: 'North', criticalityIndex: 95, failureImpact: 'Severe' },
  { assetId: 'AST-004', assetName: 'Industrial Ring Road Segment C', zone: 'Industrial', criticalityIndex: 93, failureImpact: 'Severe' },
  { assetId: 'AST-012', assetName: 'West Grid Transformer T5', zone: 'West', criticalityIndex: 89, failureImpact: 'High' },
  { assetId: 'AST-002', assetName: 'Central Pumping Station #2', zone: 'Central', criticalityIndex: 87, failureImpact: 'High' },
  { assetId: 'AST-010', assetName: 'East Waste Transfer Compactor', zone: 'East', criticalityIndex: 84, failureImpact: 'High' }
];

export const highRiskRanking = [
  { rank: 1, assetId: 'AST-001', assetName: 'North Bridge Expansion Joint', riskScore: 96, estimatedLoss: 1_800_000 },
  { rank: 2, assetId: 'AST-004', assetName: 'Industrial Ring Road Segment C', riskScore: 94, estimatedLoss: 1_550_000 },
  { rank: 3, assetId: 'AST-012', assetName: 'West Grid Transformer T5', riskScore: 91, estimatedLoss: 1_230_000 },
  { rank: 4, assetId: 'AST-002', assetName: 'Central Pumping Station #2', riskScore: 89, estimatedLoss: 980_000 },
  { rank: 5, assetId: 'AST-010', assetName: 'East Waste Transfer Compactor', riskScore: 87, estimatedLoss: 920_000 }
];

export const budgetBaseline = {
  preventive: 35,
  predictive: 25,
  corrective: 40
};
