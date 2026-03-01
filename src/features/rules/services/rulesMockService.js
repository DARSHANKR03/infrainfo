const parameterCatalog = [
  'vibration',
  'temperature',
  'pressure',
  'corrosion',
  'crackWidth',
  'flowRate'
];

const operators = ['>', '>=', '<', '<=', '=='];

let rules = [
  {
    id: 'RULE-001',
    name: 'Bridge Structural Stress Rule',
    description: 'Detects structurally risky bridge conditions from field and sensor values.',
    category: 'Bridge',
    logic: 'OR',
    active: true,
    thresholds: { warning: 35, critical: 65, failed: 85 },
    conditions: [
      { id: 'C1', parameter: 'crackWidth', operator: '>', value: 6, weight: 35 },
      { id: 'C2', parameter: 'corrosion', operator: '>', value: 45, weight: 30 },
      { id: 'C3', parameter: 'vibration', operator: '>', value: 12, weight: 35 }
    ],
    updatedAt: '2026-02-25',
    updatedBy: 'Engineering Admin'
  },
  {
    id: 'RULE-002',
    name: 'Pump Overload Rule',
    description: 'Flags pump station overload and thermal stress conditions.',
    category: 'Pump Station',
    logic: 'AND',
    active: true,
    thresholds: { warning: 30, critical: 60, failed: 80 },
    conditions: [
      { id: 'C1', parameter: 'temperature', operator: '>', value: 82, weight: 40 },
      { id: 'C2', parameter: 'pressure', operator: '>', value: 18, weight: 30 },
      { id: 'C3', parameter: 'vibration', operator: '>', value: 10, weight: 30 }
    ],
    updatedAt: '2026-02-20',
    updatedBy: 'Reliability Lead'
  }
];

let ruleVersions = {
  'RULE-001': [
    {
      version: 'v1',
      changedAt: '2025-12-08',
      changedBy: 'Engineering Admin',
      note: 'Initial production threshold baseline.'
    },
    {
      version: 'v2',
      changedAt: '2026-01-18',
      changedBy: 'Engineering Admin',
      note: 'Updated crack width threshold and weights.'
    },
    {
      version: 'v3',
      changedAt: '2026-02-25',
      changedBy: 'Engineering Admin',
      note: 'Added vibration condition and recalibrated failed threshold.'
    }
  ],
  'RULE-002': [
    {
      version: 'v1',
      changedAt: '2026-01-07',
      changedBy: 'Reliability Lead',
      note: 'Initial version.'
    },
    {
      version: 'v2',
      changedAt: '2026-02-20',
      changedBy: 'Reliability Lead',
      note: 'Changed logic to AND and increased thermal sensitivity.'
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
