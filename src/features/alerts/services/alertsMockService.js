let alerts = [
  {
    id: 'ALT-2401',
    title: 'Bridge vibration threshold exceeded',
    assetId: 'AST-001',
    assetName: 'North Bridge Expansion Joint',
    severity: 'Emergency',
    status: 'Open',
    type: 'Structural',
    detectedAt: '2026-03-01 08:14',
    description:
      'Vibration crossed emergency threshold by 22% for 11 consecutive minutes.',
    escalationHistory: [
      {
        time: '2026-03-01 08:16',
        level: 'L1',
        action: 'Assigned to Zone Engineer',
        actor: 'System'
      },
      {
        time: '2026-03-01 08:22',
        level: 'L2',
        action: 'Escalated to Structural Team',
        actor: 'Operations Control'
      }
    ]
  },
  {
    id: 'ALT-2402',
    title: 'Transformer oil temperature drift',
    assetId: 'AST-012',
    assetName: 'West Grid Transformer T5',
    severity: 'High',
    status: 'Acknowledged',
    type: 'Thermal',
    detectedAt: '2026-03-01 06:42',
    description:
      'Oil temperature trend is steadily rising above baseline for the last 4 hours.',
    escalationHistory: [
      {
        time: '2026-03-01 06:45',
        level: 'L1',
        action: 'Assigned to Electrical Team',
        actor: 'System'
      },
      {
        time: '2026-03-01 07:05',
        level: 'L1',
        action: 'Acknowledged by field engineer',
        actor: 'R. Patel'
      }
    ]
  },
  {
    id: 'ALT-2403',
    title: 'Pump station pressure instability',
    assetId: 'AST-002',
    assetName: 'Central Pumping Station #2',
    severity: 'Medium',
    status: 'Open',
    type: 'Hydraulic',
    detectedAt: '2026-03-01 04:35',
    description:
      'Pressure fluctuations exceed acceptable delta band during peak pumping cycle.',
    escalationHistory: [
      {
        time: '2026-03-01 04:37',
        level: 'L1',
        action: 'Assigned to Mechanical Team',
        actor: 'System'
      }
    ]
  },
  {
    id: 'ALT-2404',
    title: 'Road section deformation outlier',
    assetId: 'AST-004',
    assetName: 'Industrial Ring Road Segment C',
    severity: 'High',
    status: 'Resolved',
    type: 'Surface',
    detectedAt: '2026-02-28 18:19',
    description:
      'Deformation index exceeded 3 sigma and triggered structural inspection workflow.',
    escalationHistory: [
      {
        time: '2026-02-28 18:21',
        level: 'L1',
        action: 'Assigned to Road Maintenance Team',
        actor: 'System'
      },
      {
        time: '2026-02-28 19:10',
        level: 'L2',
        action: 'Escalated to Zone Supervisor',
        actor: 'Operations Control'
      },
      {
        time: '2026-02-28 21:05',
        level: 'L2',
        action: 'Resolved after emergency patch',
        actor: 'Zone Supervisor'
      }
    ]
  },
  {
    id: 'ALT-2405',
    title: 'Telemetry packet loss warning',
    assetId: 'AST-011',
    assetName: 'Industrial Water Metering Hub',
    severity: 'Low',
    status: 'Open',
    type: 'Communication',
    detectedAt: '2026-02-28 16:03',
    description:
      'Intermittent telemetry packet loss observed from edge gateway channel.',
    escalationHistory: [
      {
        time: '2026-02-28 16:06',
        level: 'L1',
        action: 'Assigned to IoT Support',
        actor: 'System'
      }
    ]
  }
];

const wait = (ms = 180) => new Promise((resolve) => setTimeout(resolve, ms));

export async function listAlerts() {
  await wait();
  return [...alerts];
}

export async function getAlertById(alertId) {
  await wait();
  return alerts.find((alert) => alert.id === alertId) || null;
}

export async function acknowledgeAlert(alertId) {
  await wait();
  alerts = alerts.map((alert) =>
    alert.id === alertId
      ? {
          ...alert,
          status: alert.status === 'Resolved' ? 'Resolved' : 'Acknowledged',
          escalationHistory: [
            ...alert.escalationHistory,
            {
              time: '2026-03-01 09:05',
              level: 'L1',
              action: 'Alert acknowledged',
              actor: 'Control Room'
            }
          ]
        }
      : alert
  );
  return alerts.find((alert) => alert.id === alertId) || null;
}

export async function resolveAlert(alertId) {
  await wait();
  alerts = alerts.map((alert) =>
    alert.id === alertId
      ? {
          ...alert,
          status: 'Resolved',
          escalationHistory: [
            ...alert.escalationHistory,
            {
              time: '2026-03-01 09:22',
              level: 'L2',
              action: 'Alert resolved',
              actor: 'Control Room'
            }
          ]
        }
      : alert
  );
  return alerts.find((alert) => alert.id === alertId) || null;
}

export function getNotificationFeed(sourceAlerts) {
  return sourceAlerts
    .filter((alert) => alert.status !== 'Resolved')
    .sort((a, b) => String(b.detectedAt).localeCompare(String(a.detectedAt)))
    .slice(0, 6);
}
