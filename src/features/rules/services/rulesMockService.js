import { getAllParameters } from './thresholdConfig';

// Complete parameter catalog for infrastructure monitoring
const parameterCatalog = [
  // Structural Monitoring
  'vibration',
  'temperature',
  'pressure',
  'corrosion',
  'crackWidth',
  'flowRate',
  'strain',
  'displacement',
  'tiltAngle',
  'loadStress',
  
  // Environmental
  'humidity',
  'windLoad',
  
  // Piping & Leakage
  'leakageRate',
  'pipeThicknessLoss',
  'pumpEfficiency',
  
  // Road Infrastructure
  'surfaceRoughness',
  'potholeDensity',
  
  // Electrical
  'voltageLevel',
  'currentLoad',
  'powerConsumption',
  
  // Operational
  'maintenanceDelay',
  'inspectionFrequency',
  'trafficLoad',
  'failureFrequency',
  
  // Health Indices
  'healthIndex',
  'riskScore'
];

const operators = ['>', '>=', '<', '<=', '=='];

// Comprehensive rules based on infrastructure monitoring thresholds
let rules = [
  {
    id: 'RULE-001',
    name: 'Critical Structural Deterioration',
    description: 'IF crackWidth > 0.5mm AND vibration > 10mm/s THEN assetHealth = CRITICAL',
    category: 'Bridge',
    logic: 'AND',
    active: true,
    thresholds: { warning: 40, critical: 70, failed: 85 },
    conditions: [
      { id: 'C1', parameter: 'crackWidth', operator: '>', value: 0.5, weight: 50 },
      { id: 'C2', parameter: 'vibration', operator: '>', value: 10, weight: 50 }
    ],
    updatedAt: '2026-03-06',
    updatedBy: 'SHM Engineer'
  },
  {
    id: 'RULE-002',
    name: 'High Pipeline Risk',
    description: 'IF corrosion > 15% AND pipeThicknessLoss > 10% THEN pipelineRisk = HIGH',
    category: 'Pipeline',
    logic: 'AND',
    active: true,
    thresholds: { warning: 35, critical: 60, failed: 80 },
    conditions: [
      { id: 'C1', parameter: 'corrosion', operator: '>', value: 15, weight: 55 },
      { id: 'C2', parameter: 'pipeThicknessLoss', operator: '>', value: 10, weight: 45 }
    ],
    updatedAt: '2026-03-06',
    updatedBy: 'Pipeline Inspector'
  },
  {
    id: 'RULE-003',
    name: 'Asset Failure Detection',
    description: 'IF healthIndex < 40 THEN status = FAILED and Generate ALERT',
    category: 'General',
    logic: 'OR',
    active: true,
    thresholds: { warning: 50, critical: 75, failed: 90 },
    conditions: [
      { id: 'C1', parameter: 'healthIndex', operator: '<', value: 40, weight: 100 }
    ],
    updatedAt: '2026-03-06',
    updatedBy: 'Asset Manager'
  },
  {
    id: 'RULE-004',
    name: 'Pump Station Critical Overload',
    description: 'Detects critical pump station conditions: high temperature, pressure and low efficiency',
    category: 'Pump Station',
    logic: 'OR',
    active: true,
    thresholds: { warning: 40, critical: 65, failed: 85 },
    conditions: [
      { id: 'C1', parameter: 'temperature', operator: '>', value: 60, weight: 30 },
      { id: 'C2', parameter: 'pressure', operator: '>', value: 15, weight: 30 },
      { id: 'C3', parameter: 'pumpEfficiency', operator: '<', value: 70, weight: 40 }
    ],
    updatedAt: '2026-03-06',
    updatedBy: 'Maintenance Chief'
  },
  {
    id: 'RULE-005',
    name: 'Bridge Structural Instability',
    description: 'Monitors displacement, tilt angle and strain for bridge structural health',
    category: 'Bridge',
    logic: 'OR',
    active: true,
    thresholds: { warning: 35, critical: 60, failed: 80 },
    conditions: [
      { id: 'C1', parameter: 'displacement', operator: '>', value: 10, weight: 35 },
      { id: 'C2', parameter: 'tiltAngle', operator: '>', value: 1, weight: 35 },
      { id: 'C3', parameter: 'strain', operator: '>', value: 1000, weight: 30 }
    ],
    updatedAt: '2026-03-06',
    updatedBy: 'Bridge Engineer'
  },
  {
    id: 'RULE-006',
    name: 'Road Surface Degradation',
    description: 'Monitors road surface quality through roughness and pothole metrics',
    category: 'Road',
    logic: 'OR',
    active: true,
    thresholds: { warning: 40, critical: 65, failed: 85 },
    conditions: [
      { id: 'C1', parameter: 'surfaceRoughness', operator: '>', value: 5, weight: 50 },
      { id: 'C2', parameter: 'potholeDensity', operator: '>', value: 15, weight: 50 }
    ],
    updatedAt: '2026-03-06',
    updatedBy: 'Road Maintenance'
  },
  {
    id: 'RULE-007',
    name: 'Electrical System Overload',
    description: 'Monitors electrical infrastructure for voltage, current and power anomalies',
    category: 'Electrical',
    logic: 'OR',
    active: true,
    thresholds: { warning: 40, critical: 70, failed: 90 },
    conditions: [
      { id: 'C1', parameter: 'currentLoad', operator: '>', value: 80, weight: 35 },
      { id: 'C2', parameter: 'powerConsumption', operator: '>', value: 100, weight: 35 },
      { id: 'C3', parameter: 'voltageLevel', operator: '>', value: 10, weight: 30 }
    ],
    updatedAt: '2026-03-06',
    updatedBy: 'Electrical Engineer'
  },
  {
    id: 'RULE-008',
    name: 'High Operational Risk',
    description: 'Identifies assets with poor maintenance and inspection compliance',
    category: 'Operations',
    logic: 'OR',
    active: true,
    thresholds: { warning: 40, critical: 65, failed: 85 },
    conditions: [
      { id: 'C1', parameter: 'maintenanceDelay', operator: '>', value: 30, weight: 40 },
      { id: 'C2', parameter: 'inspectionFrequency', operator: '>', value: 90, weight: 30 },
      { id: 'C3', parameter: 'failureFrequency', operator: '>', value: 3, weight: 30 }
    ],
    updatedAt: '2026-03-06',
    updatedBy: 'Operations Manager'
  },
  {
    id: 'RULE-009',
    name: 'Environmental Stress Alert',
    description: 'Monitors environmental factors: humidity, wind load affecting infrastructure',
    category: 'Environmental',
    logic: 'OR',
    active: true,
    thresholds: { warning: 45, critical: 70, failed: 85 },
    conditions: [
      { id: 'C1', parameter: 'humidity', operator: '>', value: 75, weight: 40 },
      { id: 'C2', parameter: 'windLoad', operator: '>', value: 60, weight: 60 }
    ],
    updatedAt: '2026-03-06',
    updatedBy: 'Environmental Monitor'
  },
  {
    id: 'RULE-010',
    name: 'Critical Load Stress',
    description: 'Monitors load stress and traffic load for asset capacity management',
    category: 'Load Management',
    logic: 'OR',
    active: true,
    thresholds: { warning: 40, critical: 70, failed: 85 },
    conditions: [
      { id: 'C1', parameter: 'loadStress', operator: '>', value: 70, weight: 60 },
      { id: 'C2', parameter: 'trafficLoad', operator: '>', value: 85, weight: 40 }
    ],
    updatedAt: '2026-03-06',
    updatedBy: 'Structural Engineer'
  },
  {
    id: 'RULE-011',
    name: 'Pipeline Leakage Alert',
    description: 'Monitors pipeline leakage rate and flow rate deviations',
    category: 'Pipeline',
    logic: 'OR',
    active: true,
    thresholds: { warning: 40, critical: 65, failed: 85 },
    conditions: [
      { id: 'C1', parameter: 'leakageRate', operator: '>', value: 5, weight: 60 },
      { id: 'C2', parameter: 'flowRate', operator: '<', value: 80, weight: 40 }
    ],
    updatedAt: '2026-03-06',
    updatedBy: 'Pipeline Operator'
  },
  {
    id: 'RULE-012',
    name: 'High Risk Score Alert',
    description: 'Overall risk assessment based on risk score threshold',
    category: 'Risk Management',
    logic: 'OR',
    active: true,
    thresholds: { warning: 50, critical: 75, failed: 90 },
    conditions: [
      { id: 'C1', parameter: 'riskScore', operator: '>', value: 50, weight: 100 }
    ],
    updatedAt: '2026-03-06',
    updatedBy: 'Risk Manager'
  }
];

let ruleVersions = {
  'RULE-001': [
    {
      version: 'v1',
      changedAt: '2026-03-06',
      changedBy: 'SHM Engineer',
      note: 'Initial rule based on SHM standard thresholds for critical structural deterioration.'
    }
  ],
  'RULE-002': [
    {
      version: 'v1',
      changedAt: '2026-03-06',
      changedBy: 'Pipeline Inspector',
      note: 'Pipeline risk rule based on corrosion and thickness loss thresholds.'
    }
  ],
  'RULE-003': [
    {
      version: 'v1',
      changedAt: '2026-03-06',
      changedBy: 'Asset Manager',
      note: 'General asset failure detection rule based on health index.'
    }
  ],
  'RULE-004': [
    {
      version: 'v1',
      changedAt: '2026-03-06',
      changedBy: 'Maintenance Chief',
      note: 'Comprehensive pump station monitoring rule.'
    }
  ],
  'RULE-005': [
    {
      version: 'v1',
      changedAt: '2026-03-06',
      changedBy: 'Bridge Engineer',
      note: 'Bridge structural instability monitoring rule.'
    }
  ],
  'RULE-006': [
    {
      version: 'v1',
      changedAt: '2026-03-06',
      changedBy: 'Road Maintenance',
      note: 'Road surface quality assessment rule.'
    }
  ],
  'RULE-007': [
    {
      version: 'v1',
      changedAt: '2026-03-06',
      changedBy: 'Electrical Engineer',
      note: 'Electrical system overload detection rule.'
    }
  ],
  'RULE-008': [
    {
      version: 'v1',
      changedAt: '2026-03-06',
      changedBy: 'Operations Manager',
      note: 'Operational risk assessment based on maintenance compliance.'
    }
  ],
  'RULE-009': [
    {
      version: 'v1',
      changedAt: '2026-03-06',
      changedBy: 'Environmental Monitor',
      note: 'Environmental stress monitoring rule.'
    }
  ],
  'RULE-010': [
    {
      version: 'v1',
      changedAt: '2026-03-06',
      changedBy: 'Structural Engineer',
      note: 'Load stress and traffic load monitoring rule.'
    }
  ],
  'RULE-011': [
    {
      version: 'v1',
      changedAt: '2026-03-06',
      changedBy: 'Pipeline Operator',
      note: 'Pipeline leakage detection and flow monitoring rule.'
    }
  ],
  'RULE-012': [
    {
      version: 'v1',
      changedAt: '2026-03-06',
      changedBy: 'Risk Manager',
      note: 'High-level risk score assessment rule.'
    }
  ]
};

const wait = (ms = 220) => new Promise((resolve) => setTimeout(resolve, ms));

const evaluate = (left, operator, right) => {
  switch (operator) {
    case '>':
      return left > right;
    case '>=':
      return left >= right;
    case '<':
      return left < right;
    case '<=':
      return left <= right;
    case '==':
      return left === right;
    default:
      return false;
  }
};

export async function getRuleMeta() {
  await wait();
  return {
    parameterCatalog: [...parameterCatalog],
    operators: [...operators]
  };
}

export async function listRules() {
  await wait();
  return [...rules];
}

export async function getRuleById(ruleId) {
  await wait();
  return rules.find((rule) => rule.id === ruleId) || null;
}

export async function createRule(payload) {
  await wait();
  const id = `RULE-${String(rules.length + 1).padStart(3, '0')}`;
  const newRule = {
    id,
    ...payload,
    updatedAt: '2026-02-28',
    updatedBy: 'Rules Manager'
  };
  rules = [newRule, ...rules];
  ruleVersions[id] = [
    {
      version: 'v1',
      changedAt: '2026-02-28',
      changedBy: 'Rules Manager',
      note: 'Rule created.'
    }
  ];
  return newRule;
}

export async function updateRule(ruleId, payload) {
  await wait();
  const current = rules.find((rule) => rule.id === ruleId);
  if (!current) {
    return null;
  }

  rules = rules.map((rule) =>
    rule.id === ruleId
      ? {
          ...rule,
          ...payload,
          updatedAt: '2026-02-28',
          updatedBy: 'Rules Manager'
        }
      : rule
  );

  const existingVersions = ruleVersions[ruleId] || [];
  const nextVersion = `v${existingVersions.length + 1}`;
  ruleVersions[ruleId] = [
    ...existingVersions,
    {
      version: nextVersion,
      changedAt: '2026-02-28',
      changedBy: 'Rules Manager',
      note: 'Rule updated.'
    }
  ];

  return rules.find((rule) => rule.id === ruleId) || null;
}

export async function toggleRuleActive(ruleId) {
  await wait();
  rules = rules.map((rule) =>
    rule.id === ruleId
      ? {
          ...rule,
          active: !rule.active,
          updatedAt: '2026-02-28',
          updatedBy: 'Rules Manager'
        }
      : rule
  );
  return rules.find((rule) => rule.id === ruleId) || null;
}

export async function getRuleVersionHistory(ruleId) {
  await wait();
  return [...(ruleVersions[ruleId] || [])].reverse();
}

export async function simulateRule(ruleId, sampleValues) {
  await wait();
  const rule = rules.find((item) => item.id === ruleId);
  if (!rule) {
    return null;
  }

  const conditionResults = rule.conditions.map((condition) => {
    const raw = Number(sampleValues[condition.parameter] ?? 0);
    const passed = evaluate(raw, condition.operator, Number(condition.value));
    return {
      ...condition,
      input: raw,
      passed
    };
  });

  const triggerResult =
    rule.logic === 'AND'
      ? conditionResults.every((item) => item.passed)
      : conditionResults.some((item) => item.passed);

  const totalWeight = conditionResults.reduce(
    (sum, item) => sum + Number(item.weight || 0),
    0
  );
  const passedWeight = conditionResults
    .filter((item) => item.passed)
    .reduce((sum, item) => sum + Number(item.weight || 0), 0);
  const weightedScore = totalWeight ? Math.round((passedWeight / totalWeight) * 100) : 0;

  let classification = 'Healthy';
  if (weightedScore >= rule.thresholds.failed) {
    classification = 'Failed';
  } else if (weightedScore >= rule.thresholds.critical) {
    classification = 'Critical';
  } else if (weightedScore >= rule.thresholds.warning) {
    classification = 'Warning';
  }

  return {
    rule,
    weightedScore,
    triggerResult,
    conditionResults,
    classification
  };
}
