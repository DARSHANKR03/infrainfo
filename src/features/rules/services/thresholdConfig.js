/**
 * Infrastructure Monitoring Thresholds Configuration
 * Defines healthy, warning, critical, and failed ranges for all monitored parameters
 */

export const thresholdConfig = {
  // Structural Monitoring Parameters
  vibration: {
    unit: 'mm/s',
    healthy: { min: 0, max: 5 },
    warning: { min: 5, max: 10 },
    critical: { min: 10, max: 20 },
    failed: { min: 20, max: Infinity }
  },
  
  temperature: {
    unit: '°C',
    healthy: { min: 10, max: 40 },
    warning: { min: 40, max: 60 },
    critical: { min: 60, max: 80 },
    failed: { min: 80, max: Infinity }
  },
  
  pressure: {
    unit: 'bar',
    healthy: { min: 1, max: 10 },
    warning: { min: 10, max: 15 },
    critical: { min: 15, max: 20 },
    failed: { min: 20, max: Infinity }
  },
  
  corrosion: {
    unit: '%',
    healthy: { min: 0, max: 5 },
    warning: { min: 5, max: 15 },
    critical: { min: 15, max: 30 },
    failed: { min: 30, max: 100 }
  },
  
  crackWidth: {
    unit: 'mm',
    healthy: { min: 0, max: 0.2 },
    warning: { min: 0.2, max: 0.5 },
    critical: { min: 0.5, max: 1 },
    failed: { min: 1, max: Infinity }
  },
  
  flowRate: {
    unit: 'L/s',
    description: '% of design flow',
    healthy: { min: 90, max: 110 },
    warning: { min: 80, max: 90, max2: 110, max2To: 120 },
    critical: { min: 60, max: 80, max2: 120, max2To: 140 },
    failed: { min: 0, max: 60, max2: 140, max2To: Infinity }
  },
  
  strain: {
    unit: 'µε',
    healthy: { min: 0, max: 500 },
    warning: { min: 500, max: 1000 },
    critical: { min: 1000, max: 1500 },
    failed: { min: 1500, max: Infinity }
  },
  
  displacement: {
    unit: 'mm',
    healthy: { min: 0, max: 5 },
    warning: { min: 5, max: 10 },
    critical: { min: 10, max: 20 },
    failed: { min: 20, max: Infinity }
  },
  
  tiltAngle: {
    unit: '°',
    healthy: { min: 0, max: 0.5 },
    warning: { min: 0.5, max: 1 },
    critical: { min: 1, max: 2 },
    failed: { min: 2, max: Infinity }
  },
  
  loadStress: {
    unit: 'MPa',
    description: '% of capacity',
    healthy: { min: 0, max: 40 },
    warning: { min: 40, max: 70 },
    critical: { min: 70, max: 90 },
    failed: { min: 90, max: 100 }
  },
  
  humidity: {
    unit: '%',
    healthy: { min: 30, max: 60 },
    warning: { min: 60, max: 75 },
    critical: { min: 75, max: 90 },
    failed: { min: 90, max: 100 }
  },
  
  windLoad: {
    unit: 'km/h',
    healthy: { min: 0, max: 40 },
    warning: { min: 40, max: 60 },
    critical: { min: 60, max: 90 },
    failed: { min: 90, max: Infinity }
  },
  
  leakageRate: {
    unit: '%',
    healthy: { min: 0, max: 2 },
    warning: { min: 2, max: 5 },
    critical: { min: 5, max: 10 },
    failed: { min: 10, max: 100 }
  },
  
  pipeThicknessLoss: {
    unit: '%',
    healthy: { min: 0, max: 5 },
    warning: { min: 5, max: 10 },
    critical: { min: 10, max: 20 },
    failed: { min: 20, max: 100 }
  },
  
  pumpEfficiency: {
    unit: '%',
    healthy: { min: 85, max: 100 },
    warning: { min: 70, max: 85 },
    critical: { min: 50, max: 70 },
    failed: { min: 0, max: 50 }
  },
  
  // Road Infrastructure Parameters
  surfaceRoughness: {
    unit: 'IRI m/km',
    healthy: { min: 0, max: 3 },
    warning: { min: 3, max: 5 },
    critical: { min: 5, max: 8 },
    failed: { min: 8, max: Infinity }
  },
  
  potholeDensity: {
    unit: '/km',
    healthy: { min: 0, max: 5 },
    warning: { min: 5, max: 15 },
    critical: { min: 15, max: 30 },
    failed: { min: 30, max: Infinity }
  },
  
  // Electrical Parameters
  voltageLevel: {
    unit: 'V',
    description: '% of nominal',
    healthy: { min: -5, max: 5 },
    warning: { min: -10, max: -5, max2: 5, max2To: 10 },
    critical: { min: -15, max: -10, max2: 10, max2To: 15 },
    failed: { min: -Infinity, max: -15, max2: 15, max2To: Infinity }
  },
  
  currentLoad: {
    unit: '%',
    healthy: { min: 0, max: 60 },
    warning: { min: 60, max: 80 },
    critical: { min: 80, max: 100 },
    failed: { min: 100, max: Infinity }
  },
  
  powerConsumption: {
    unit: '%',
    healthy: { min: 0, max: 80 },
    warning: { min: 80, max: 100 },
    critical: { min: 100, max: 120 },
    failed: { min: 120, max: Infinity }
  },
  
  // Maintenance & Operational Parameters
  maintenanceDelay: {
    unit: 'days',
    healthy: { min: 0, max: 7 },
    warning: { min: 7, max: 30 },
    critical: { min: 30, max: 90 },
    failed: { min: 90, max: Infinity }
  },
  
  inspectionFrequency: {
    unit: 'days',
    healthy: { min: 0, max: 30 },
    warning: { min: 30, max: 90 },
    critical: { min: 90, max: 180 },
    failed: { min: 180, max: Infinity }
  },
  
  trafficLoad: {
    unit: '%',
    healthy: { min: 0, max: 70 },
    warning: { min: 70, max: 85 },
    critical: { min: 85, max: 100 },
    failed: { min: 100, max: Infinity }
  },
  
  failureFrequency: {
    unit: '/year',
    healthy: { min: 0, max: 1 },
    warning: { min: 1, max: 3 },
    critical: { min: 3, max: 6 },
    failed: { min: 6, max: Infinity }
  },
  
  // Overall Health & Risk Indices
  healthIndex: {
    unit: '0-100',
    healthy: { min: 80, max: 100 },
    warning: { min: 60, max: 80 },
    critical: { min: 40, max: 60 },
    failed: { min: 0, max: 40 }
  },
  
  riskScore: {
    unit: '0-100',
    healthy: { min: 0, max: 30 },
    warning: { min: 30, max: 50 },
    critical: { min: 50, max: 75 },
    failed: { min: 75, max: 100 }
  }
};

/**
 * Get the health status for a parameter value
 * @param {string} parameter - The parameter name
 * @param {number} value - The measured value
 * @returns {string} - 'Healthy', 'Warning', 'Critical', or 'Failed'
 */
export function getHealthStatus(parameter, value) {
  const config = thresholdConfig[parameter];
  if (!config) return 'Unknown';
  
  const numValue = Number(value);
  
  // Check for parameters with dual ranges (like flowRate, voltageLevel)
  if (config.healthy.min !== undefined && config.healthy.max !== undefined) {
    if (numValue >= config.healthy.min && numValue <= config.healthy.max) {
      return 'Healthy';
    }
  }
  
  if (config.warning.min !== undefined && config.warning.max !== undefined) {
    if (numValue >= config.warning.min && numValue <= config.warning.max) {
      return 'Warning';
    }
    // Check second range if exists
    if (config.warning.max2 !== undefined && config.warning.max2To !== undefined) {
      if (numValue >= config.warning.max2 && numValue <= config.warning.max2To) {
        return 'Warning';
      }
    }
  }
  
  if (config.critical.min !== undefined && config.critical.max !== undefined) {
    if (numValue >= config.critical.min && numValue <= config.critical.max) {
      return 'Critical';
    }
    // Check second range if exists
    if (config.critical.max2 !== undefined && config.critical.max2To !== undefined) {
      if (numValue >= config.critical.max2 && numValue <= config.critical.max2To) {
        return 'Critical';
      }
    }
  }
  
  // If not in healthy, warning, or critical, it's failed
  return 'Failed';
}

/**
 * Get all parameter names
 * @returns {string[]} - Array of parameter names
 */
export function getAllParameters() {
  return Object.keys(thresholdConfig);
}

/**
 * Get parameter info including unit and description
 * @param {string} parameter - The parameter name
 * @returns {object} - Parameter configuration
 */
export function getParameterInfo(parameter) {
  return thresholdConfig[parameter] || null;
}

/**
 * Color mapping for health statuses (for UI)
 */
export const healthColors = {
  Healthy: '#10B981',   // Green
  Warning: '#F59E0B',   // Yellow
  Critical: '#F97316',  // Orange
  Failed: '#EF4444'     // Red
};

/**
 * Best 12 Core Monitoring Metrics (as recommended for SHM)
 */
export const coreMetrics = [
  'vibration',
  'strain',
  'crackWidth',
  'displacement',
  'tiltAngle',
  'corrosion',
  'pressure',
  'flowRate',
  'temperature',
  'trafficLoad',
  'maintenanceDelay',
  'healthIndex'
];
