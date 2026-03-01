const reportCatalog = [
  {
    id: 'monthly',
    title: 'Monthly Infrastructure Health Report',
    description: 'Executive monthly status including health, risk, and alerts.',
    route: '/reports'
  },
  {
    id: 'zone-summary',
    title: 'Zone-wise Summary',
    description: 'Operational summary by city zone and performance indicators.',
    route: '/reports/zone-summary'
  },
  {
    id: 'asset-lifecycle',
    title: 'Asset Lifecycle Report',
    description: 'Lifecycle stage and replacement horizon analysis.',
    route: '/reports/asset-lifecycle'
  },
  {
    id: 'historical-export',
    title: 'Historical Data Export',
    description: 'Bulk export utility for historical operational datasets.',
    route: '/reports/historical-export'
  }
];

const monthlyPreview = {
  month: 'February 2026',
  summary: [
    { label: 'Total Assets Monitored', value: '1,284' },
    { label: 'Healthy Asset Ratio', value: '86.4%' },
    { label: 'Critical Alerts Raised', value: '39' },
    { label: 'Work Orders Closed', value: '112' }
  ],
  trend: [
    { week: 'W1', health: 84, alerts: 11 },
    { week: 'W2', health: 85, alerts: 10 },
    { week: 'W3', health: 86, alerts: 9 },
    { week: 'W4', health: 86.4, alerts: 9 }
  ]
};

const zoneSummary = [
  { zone: 'North', assets: 220, healthy: 188, warning: 24, critical: 8, compliance: 92 },
  { zone: 'South', assets: 204, healthy: 172, warning: 24, critical: 8, compliance: 90 },
  { zone: 'East', assets: 198, healthy: 164, warning: 27, critical: 7, compliance: 91 },
  { zone: 'West', assets: 193, healthy: 154, warning: 31, critical: 8, compliance: 88 },
  { zone: 'Central', assets: 269, healthy: 238, warning: 24, critical: 7, compliance: 94 },
  { zone: 'Industrial', assets: 200, healthy: 154, warning: 31, critical: 15, compliance: 83 }
];

const lifecycleReport = [
  { assetId: 'AST-001', assetName: 'North Bridge Expansion Joint', stage: 'Late Life', installYear: 2012, expectedEol: 2042, replacementPriority: 'High' },
  { assetId: 'AST-004', assetName: 'Industrial Ring Road Segment C', stage: 'End of Life', installYear: 2010, expectedEol: 2028, replacementPriority: 'Urgent' },
  { assetId: 'AST-012', assetName: 'West Grid Transformer T5', stage: 'Mid Life', installYear: 2012, expectedEol: 2037, replacementPriority: 'Medium' },
  { assetId: 'AST-002', assetName: 'Central Pumping Station #2', stage: 'Mid Life', installYear: 2018, expectedEol: 2038, replacementPriority: 'Medium' },
  { assetId: 'AST-011', assetName: 'Industrial Water Metering Hub', stage: 'Early Life', installYear: 2020, expectedEol: 2032, replacementPriority: 'Low' }
];

const wait = (ms = 160) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getReportCatalog() {
  await wait();
  return [...reportCatalog];
}

export async function getMonthlyReportPreview() {
  await wait();
  return { ...monthlyPreview, summary: [...monthlyPreview.summary], trend: [...monthlyPreview.trend] };
}

export async function getZoneSummaryReport() {
  await wait();
  return [...zoneSummary];
}

export async function getAssetLifecycleReport() {
  await wait();
  return [...lifecycleReport];
}
