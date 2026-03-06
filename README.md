
# 🏗️ Infrastructure Health & Anomaly Analysis System

**An Intelligent Urban Asset Monitoring & Predictive Maintenance Platform**

The **Infrastructure Health & Anomaly Analysis System** is a web-based platform designed to evaluate the operational condition of urban assets (bridges, roads, pipelines) using rule-based analytics and anomaly detection.

Unlike traditional systems that require expensive IoT sensors, this platform leverages inspection data to provide **Health Scoring** and **Risk Prioritization**, making it an ideal solution for municipalities with limited hardware infrastructure.

---

## 🔐 Demo Credentials

| Role | Login ID | Password |
| --- | --- | --- |
| **Administrator** | `admin@infrainfo.io` | `admin123` |
| **Inspector (User)** | `inspector@infrainfo.io` | `inspector123` |

---

## 🚀 Key Features

### 🛠️ Asset & Inspection Management

* **Digital Profiling:** Register and categorize assets (Bridges, Roads, Pipelines) with full lifecycle history.
* **Smart Data Entry:** Parameter-based inspection forms with support for photo/document attachments.
* **Bulk Processing:** CSV/Excel import for large-scale municipal data.

### 🧠 Intelligence Engine

* **Rule & Threshold Engine:** Multi-condition logic (AND/OR) to trigger alerts based on parameter deviations.
* **Anomaly Detection:** Identifies sudden spikes, gradual degradation, and statistical outliers.
* **Health Scoring:** Automated classification into four states:
> **Healthy** → **Warning** → **Critical** → **Failed**



### 📊 Visualization & Reporting

* **Risk Heatmaps:** Geographic or zone-wise visualization of asset criticality.
* **Trend Analysis:** Historical graphs showing degradation patterns over time.
* **Automated Reporting:** Export monthly health and maintenance performance reports to PDF/Excel.

---

## 🛠️ Technology Stack

* **Frontend:** React.js, Tailwind CSS (for responsive UI), Chart.js/Recharts (for analytics).
* **Backend:** Node.js, Express.js (REST API architecture).
* **Database:** MongoDB or PostgreSQL (Scalable data storage).
* **Version Control:** Git & GitHub.

---

## ⚙️ System Workflow

1. **Registration:** Assets are digitized and assigned to specific city zones.
2. **Inspection:** Field inspectors input real-world parameters (e.g., crack width, corrosion level).
3. **Analysis:** The Rule Engine evaluates data against safety thresholds.
4. **Scoring:** Anomaly detection algorithms calculate a real-time **Health Index**.
5. **Action:** The system generates automated **Work Orders** for assets in "Critical" state.

---

## 📋 Parameters Monitored

The system tracks a wide array of structural and operational data points:

| Structural | Mechanical/Fluid | Environmental |
| --- | --- | --- |
| Crack Width | Flow Rate | Temperature |
| Vibration | Pipe Thickness | Humidity |
| Tilt Angle | Pump Efficiency | Wind Load |
| Strain/Displacement | Leakage Rate | Traffic Load |

---

## 💻 Installation Guide

Follow these steps to set up the project locally:

1. **Clone the repository**
```bash
git clone https://github.com/DARSHANKR03/infrainfo.git

```


2. **Navigate to the directory**
```bash
cd infrainfo

```


3. **Install Dependencies**
```bash
npm install

```


4. **Launch Application**
```bash
npm start

```


*The app will be available at `http://localhost:3000*`

---

## 🔮 Future Scope

* **IoT Integration:** Real-time data streaming for automated sensors.
* **AI/ML Models:** Remaining Useful Life (RUL) estimation using deep learning.
* **Digital Twins:** 3D structural modeling for better visualization.
* **GIS Mapping:** Full integration with ArcGIS for spatial analysis.

---

**Author:** **DARSHAN** *B.E. Computer Science and Engineering* [GitHub Profile](https://github.com/DARSHANKR03)

