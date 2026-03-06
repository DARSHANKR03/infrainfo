# Infrastructure Monitoring Thresholds & Rules Guide

## Overview
This guide provides a comprehensive reference for all infrastructure monitoring parameters, their thresholds, and rule logic implemented in the InfraInfo system.

---

## Health Status Color Coding

| Status    | Color  | Description |
|-----------|--------|-------------|
| Healthy   | 🟢 Green | Parameter within normal operating range |
| Warning   | 🟡 Yellow | Parameter showing early signs of concern |
| Critical  | 🟠 Orange | Parameter requires immediate attention |
| Failed    | 🔴 Red | Parameter has exceeded safe limits |

---

## Complete Threshold Reference

### 1. Structural Monitoring Parameters

#### Vibration
- **Unit**: mm/s
- **Healthy**: 0–5
- **Warning**: 5–10
- **Critical**: 10–20
- **Failed**: >20

#### Temperature
- **Unit**: °C
- **Healthy**: 10–40
- **Warning**: 40–60
- **Critical**: 60–80
- **Failed**: >80

#### Pressure
- **Unit**: bar
- **Healthy**: 1–10
- **Warning**: 10–15
- **Critical**: 15–20
- **Failed**: >20

#### Corrosion
- **Unit**: %
- **Healthy**: 0–5
- **Warning**: 5–15
- **Critical**: 15–30
- **Failed**: >30

#### Crack Width
- **Unit**: mm
- **Healthy**: 0–0.2
- **Warning**: 0.2–0.5
- **Critical**: 0.5–1
- **Failed**: >1

#### Flow Rate
- **Unit**: L/s (% of design flow)
- **Healthy**: 90–110%
- **Warning**: ±20% deviation
- **Critical**: ±40% deviation
- **Failed**: >40% deviation

#### Strain
- **Unit**: µε (micro-strain)
- **Healthy**: 0–500
- **Warning**: 500–1000
- **Critical**: 1000–1500
- **Failed**: >1500

#### Displacement
- **Unit**: mm
- **Healthy**: 0–5
- **Warning**: 5–10
- **Critical**: 10–20
- **Failed**: >20

#### Tilt Angle
- **Unit**: ° (degrees)
- **Healthy**: 0–0.5
- **Warning**: 0.5–1
- **Critical**: 1–2
- **Failed**: >2

#### Load Stress
- **Unit**: MPa (% of capacity)
- **Healthy**: <40%
- **Warning**: 40–70%
- **Critical**: 70–90%
- **Failed**: >90%

---

### 2. Environmental Parameters

#### Humidity
- **Unit**: %
- **Healthy**: 30–60
- **Warning**: 60–75
- **Critical**: 75–90
- **Failed**: >90

#### Wind Load
- **Unit**: km/h
- **Healthy**: <40
- **Warning**: 40–60
- **Critical**: 60–90
- **Failed**: >90

---

### 3. Pipeline & Leakage Parameters

#### Leakage Rate
- **Unit**: %
- **Healthy**: 0–2
- **Warning**: 2–5
- **Critical**: 5–10
- **Failed**: >10

#### Pipe Thickness Loss
- **Unit**: %
- **Healthy**: 0–5
- **Warning**: 5–10
- **Critical**: 10–20
- **Failed**: >20

#### Pump Efficiency
- **Unit**: %
- **Healthy**: >85
- **Warning**: 70–85
- **Critical**: 50–70
- **Failed**: <50

---

### 4. Road Infrastructure Parameters

#### Surface Roughness
- **Unit**: IRI m/km
- **Healthy**: <3
- **Warning**: 3–5
- **Critical**: 5–8
- **Failed**: >8

#### Pothole Density
- **Unit**: /km
- **Healthy**: 0–5
- **Warning**: 5–15
- **Critical**: 15–30
- **Failed**: >30

---

### 5. Electrical Parameters

#### Voltage Level
- **Unit**: V (% of nominal)
- **Healthy**: ±5%
- **Warning**: ±10%
- **Critical**: ±15%
- **Failed**: >±15%

#### Current Load
- **Unit**: %
- **Healthy**: <60
- **Warning**: 60–80
- **Critical**: 80–100
- **Failed**: >100

#### Power Consumption
- **Unit**: %
- **Healthy**: <80
- **Warning**: 80–100
- **Critical**: 100–120
- **Failed**: >120

---

### 6. Maintenance & Operational Parameters

#### Maintenance Delay
- **Unit**: days
- **Healthy**: 0–7
- **Warning**: 7–30
- **Critical**: 30–90
- **Failed**: >90

#### Inspection Frequency
- **Unit**: days
- **Healthy**: <30
- **Warning**: 30–90
- **Critical**: 90–180
- **Failed**: >180

#### Traffic Load
- **Unit**: %
- **Healthy**: <70
- **Warning**: 70–85
- **Critical**: 85–100
- **Failed**: >100

#### Failure Frequency
- **Unit**: /year
- **Healthy**: 0–1
- **Warning**: 1–3
- **Critical**: 3–6
- **Failed**: >6

---

### 7. Overall Health & Risk Indices

#### Health Index
- **Unit**: 0–100
- **Healthy**: 80–100
- **Warning**: 60–80
- **Critical**: 40–60
- **Failed**: <40

#### Risk Score
- **Unit**: 0–100
- **Healthy**: <30
- **Warning**: 30–50
- **Critical**: 50–75
- **Failed**: >75

---

## Example Rule Logic

### Rule 1: Critical Structural Deterioration
```
IF crackWidth > 0.5 mm AND vibration > 10 mm/s
THEN assetHealth = CRITICAL
```
**Explanation**: When both crack width exceeds critical threshold AND vibration is excessive, the asset is marked as critically damaged.

### Rule 2: High Pipeline Risk
```
IF corrosion > 15% AND pipeThicknessLoss > 10%
THEN pipelineRisk = HIGH
```
**Explanation**: Combined corrosion and thickness loss indicates high risk of pipeline failure.

### Rule 3: Asset Failure Detection
```
IF healthIndex < 40
THEN status = FAILED
     Generate ALERT
```
**Explanation**: When overall health index drops below 40, the asset is considered failed and an alert is generated.

### Rule 4: Pump Station Critical Overload
```
IF temperature > 60°C OR pressure > 15 bar OR pumpEfficiency < 70%
THEN pumpStationStatus = CRITICAL
```
**Explanation**: Any single critical condition triggers a pump station alert.

### Rule 5: Bridge Structural Instability
```
IF displacement > 10 mm OR tiltAngle > 1° OR strain > 1000 µε
THEN bridgeStatus = CRITICAL
```
**Explanation**: Monitors multiple structural parameters for bridge safety.

---

## Best 12 Core Monitoring Metrics

These are standard SHM (Structural Health Monitoring) parameters recommended for comprehensive infrastructure monitoring:

1. **Vibration** - Detects dynamic structural issues
2. **Strain** - Monitors material stress levels
3. **Crack Width** - Tracks structural deterioration
4. **Displacement** - Measures structural movement
5. **Tilt Angle** - Monitors structural stability
6. **Corrosion** - Assesses material degradation
7. **Pressure** - Monitors fluid system health
8. **Flow Rate** - Tracks system efficiency
9. **Temperature** - Identifies thermal stress
10. **Traffic Load** - Monitors usage patterns
11. **Maintenance Delay** - Tracks operational compliance
12. **Health Index** - Overall asset condition score

---

## Implemented Rules Summary

| Rule ID | Name | Category | Logic | Key Parameters |
|---------|------|----------|-------|----------------|
| RULE-001 | Critical Structural Deterioration | Bridge | AND | crackWidth, vibration |
| RULE-002 | High Pipeline Risk | Pipeline | AND | corrosion, pipeThicknessLoss |
| RULE-003 | Asset Failure Detection | General | OR | healthIndex |
| RULE-004 | Pump Station Critical Overload | Pump Station | OR | temperature, pressure, pumpEfficiency |
| RULE-005 | Bridge Structural Instability | Bridge | OR | displacement, tiltAngle, strain |
| RULE-006 | Road Surface Degradation | Road | OR | surfaceRoughness, potholeDensity |
| RULE-007 | Electrical System Overload | Electrical | OR | currentLoad, powerConsumption, voltageLevel |
| RULE-008 | High Operational Risk | Operations | OR | maintenanceDelay, inspectionFrequency, failureFrequency |
| RULE-009 | Environmental Stress Alert | Environmental | OR | humidity, windLoad |
| RULE-010 | Critical Load Stress | Load Management | OR | loadStress, trafficLoad |
| RULE-011 | Pipeline Leakage Alert | Pipeline | OR | leakageRate, flowRate |
| RULE-012 | High Risk Score Alert | Risk Management | OR | riskScore |

---

## Hackathon Tips

### When Judges Ask "Why These Metrics?"

**Answer**: "These are industry-standard SHM (Structural Health Monitoring) parameters used globally for bridge, road, and critical infrastructure monitoring. They align with:
- **ISO 13822**: Assessment of existing structures
- **AASHTO Guidelines**: Bridge inspection standards
- **Industry Best Practices**: From civil engineering and asset management fields

Our core 12 metrics cover:
- **Structural integrity** (vibration, strain, displacement, tilt)
- **Material health** (corrosion, crack width)
- **Operational efficiency** (flow rate, pressure, temperature)
- **Performance tracking** (traffic load, maintenance compliance)
- **Overall assessment** (health index)"

### Demonstrating the System

1. **Show Color-Coded Dashboard**: Point out the green/yellow/orange/red visual system
2. **Demonstrate Rule Triggering**: Change a parameter value to show status change
3. **Explain Real-World Application**: "For example, if a bridge shows crack width > 0.5mm AND vibration > 10mm/s, our system automatically flags it as CRITICAL"
4. **Highlight Customization**: "Rules can be easily configured, thresholds adjusted, and new parameters added"

---

## Technical Implementation

### Usage in Code

#### Get Parameter Thresholds
```javascript
import { getParameterInfo } from './services/thresholdConfig';

const vibrationInfo = getParameterInfo('vibration');
// Returns: { unit: 'mm/s', healthy: {...}, warning: {...}, critical: {...}, failed: {...} }
```

#### Check Health Status
```javascript
import { getHealthStatus } from './services/thresholdConfig';

const status = getHealthStatus('vibration', 12);
// Returns: 'Critical'
```

#### Get All Parameters
```javascript
import { getAllParameters } from './services/thresholdConfig';

const params = getAllParameters();
// Returns: ['vibration', 'temperature', 'pressure', ...]
```

---

## Color Reference for UI

```javascript
const healthColors = {
  Healthy: '#10B981',   // Green
  Warning: '#F59E0B',   // Yellow
  Critical: '#F97316',  // Orange
  Failed: '#EF4444'     // Red
};
```

---

## Questions & Answers for Judges

**Q: How do you handle false positives?**  
A: Rules use weighted scoring and configurable thresholds. Operators can adjust sensitivity based on historical data and asset-specific behavior.

**Q: Can new parameters be added?**  
A: Yes, the system is fully extensible. Add new parameters to `thresholdConfig.js` and they become available system-wide.

**Q: What about multi-parameter correlations?**  
A: Rules support AND/OR logic with weighted conditions. For example, RULE-001 requires BOTH crack width AND vibration to exceed thresholds before triggering critical status.

**Q: How do you validate threshold accuracy?**  
A: Thresholds are based on industry standards (ISO, AASHTO, IEEE), engineering handbooks, and domain expert consultation. The simulation feature allows testing before deployment.

---

## File Locations

- **Threshold Configuration**: `src/features/rules/services/thresholdConfig.js`
- **Rules Service**: `src/features/rules/services/rulesMockService.js`
- **Rule Management UI**: `src/features/rules/pages/`
- **Status Components**: `src/shared/components/status/StatusBadge.jsx`

---

*Last Updated: March 6, 2026*  
*For InfraInfo - Infrastructure Monitoring System*
