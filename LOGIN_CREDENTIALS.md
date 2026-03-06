# InfraInfo - Login Credentials & User Guide

## Quick Access

The system now supports **two distinct user roles** with different access levels:

### 🛡️ Administrator Access
**Full system control** - User management, system configuration, rules & thresholds

### 👤 User Access  
**Limited operational access** - Inspections, alerts, maintenance, assigned assets

---

## Login Credentials

### Administrator Accounts

#### Primary Administrator
- **Email**: `admin@infrainfo.io`
- **Password**: `admin123`
- **Name**: A. Kumar
- **Employee ID**: ADMIN-001
- **City**: All Cities
- **Permissions**: Full Access

#### Secondary Administrator  
- **Email**: `admin2@infrainfo.io`
- **Password**: `admin123`
- **Name**: S. Verma
- **Employee ID**: ADMIN-002
- **City**: Bangalore
- **Permissions**: Full Access

---

### User Accounts

#### Field Engineer
- **Email**: `user@infrainfo.io`
- **Password**: `user123`
- **Name**: R. Patel
- **Role**: Field Engineer
- **Employee ID**: USER-001
- **City**: Bangalore
- **Assigned Assets**: AST-001, AST-002, AST-005

#### Inspector
- **Email**: `inspector@infrainfo.io`
- **Password**: `inspector123`
- **Name**: M. Sharma
- **Role**: Inspector
- **Employee ID**: USER-002
- **City**: Mumbai
- **Assigned Assets**: AST-003, AST-006, AST-007

#### Data Analyst
- **Email**: `analyst@infrainfo.io`
- **Password**: `analyst123`
- **Name**: P. Singh
- **Role**: Data Analyst
- **Employee ID**: USER-003
- **City**: Delhi
- **Assigned Assets**: AST-004, AST-008

---

## How to Login

### Step 1: Select Role
When you open the application, you'll see two options:
- **Administrator** - Full system control
- **User** - Operational access

### Step 2: Quick Login (Demo)
After selecting a role, you'll see quick login buttons for each demo account. Just click to instantly login!

### Step 3: Manual Login
Alternatively, enter credentials manually using the email and password fields.

---

## Feature Access Matrix

| Feature | Administrator | User |
|---------|--------------|------|
| **Dashboard** | ✅ Full System Dashboard | ✅ Assigned Assets Dashboard |
| **User Management** | ✅ Create, Edit, Delete Users | ❌ |
| **Asset Creation** | ✅ Add New Assets | ❌ View Only |
| **Asset Viewing** | ✅ All Assets | ✅ Assigned Assets |
| **Inspections** | ✅ All Inspections | ✅ Submit Reports |
| **Rule Configuration** | ✅ Create & Edit Rules | ❌ |
| **Health Analytics** | ✅ Full Analytics | ❌ |
| **Anomalies** | ✅ View & Analyze | ❌ |
| **Alerts** | ✅ All Alerts | ✅ Assigned Assets |
| **Maintenance** | ✅ All Work Orders | ✅ Assigned Work Orders |
| **Risk Prioritization** | ✅ Full Access | ❌ |
| **Reports** | ✅ All Reports | ✅ Limited Reports |
| **System Settings** | ✅ Full Configuration | ❌ |

---

## Administrator Functionalities

### A. User Management
- ✅ Create new users
- ✅ Edit user profiles
- ✅ Delete users
- ✅ Assign roles (Inspector / Analyst / Viewer)
- ✅ Reset user passwords
- ✅ View user activity logs

### B. Asset Management
- ✅ Add new infrastructure assets
- ✅ Edit asset information
- ✅ Delete assets
- ✅ Categorize assets (Bridge, Road, Pipeline, Drainage)
- ✅ Assign assets to zones or wards
- ✅ Upload assets in bulk (CSV / Excel)
- ✅ View full asset lifecycle

### C. Inspection & Data Control
- ✅ Create inspection templates
- ✅ Configure inspection parameters
- ✅ Assign inspections to users
- ✅ View inspection reports
- ✅ Approve or reject inspection data
- ✅ Monitor inspection compliance

### D. Rule & Threshold Configuration
- ✅ Create monitoring rules
- ✅ Set threshold values for parameters
- ✅ Configure rule logic (AND / OR)
- ✅ Activate / deactivate rules
- ✅ Test rules in simulation mode
- ✅ Manage rule versions

### E. Health & Risk Management
- ✅ Configure health scoring models
- ✅ Define risk scoring formulas
- ✅ Set asset priority levels
- ✅ Monitor critical asset alerts

### F. Alert & Notification Control
- ✅ Configure alert triggers
- ✅ Define escalation levels
- ✅ Manage alert workflows
- ✅ Monitor unresolved alerts
- ✅ Send system notifications

### G. Dashboard & Analytics
- ✅ Access system-wide dashboard
- ✅ View zone-wise performance
- ✅ Monitor anomaly trends
- ✅ Analyze infrastructure health statistics

### H. Maintenance Management
- ✅ Generate maintenance work orders
- ✅ Assign work orders to users
- ✅ Monitor maintenance progress
- ✅ Track maintenance costs
- ✅ Approve maintenance completion

### I. Reporting & Documentation
- ✅ Generate system reports
- ✅ Export data to PDF / Excel
- ✅ Schedule automated reports
- ✅ Access audit reports

### J. System Configuration
- ✅ Configure city/zone settings
- ✅ Manage system parameters
- ✅ Backup system data
- ✅ Restore database
- ✅ Configure API integrations

---

## User Functionalities

### A. Dashboard Access
- ✅ View assigned asset dashboard
- ✅ Monitor asset health status
- ✅ View alerts and notifications
- ✅ Track assigned tasks

### B. Asset Monitoring
- ✅ View asset details
- ✅ Search assets
- ✅ Filter assets by zone/type
- ✅ View asset health history

### C. Inspection Data Entry
- ✅ Submit inspection reports
- ✅ Fill inspection forms
- ✅ Upload photos/documents
- ✅ Add inspection remarks

### D. Alert Monitoring
- ✅ View alerts related to assigned assets
- ✅ Acknowledge alerts
- ✅ Update alert status
- ✅ Add investigation notes

### E. Maintenance Handling
- ✅ View assigned work orders
- ✅ Update work order progress
- ✅ Upload repair documentation
- ✅ Mark maintenance as completed

### F. Basic Analytics
- ✅ View asset health trends
- ✅ View inspection history
- ✅ View anomaly reports

### G. Reporting Access
- ✅ Download assigned asset reports
- ✅ View maintenance history

---

## Navigation Differences

### Administrator Sidebar
```
📊 Dashboard
🏠 Assets
✅ Inspections
🛡️ Rules & Thresholds
📈 Health & Analytics
⚠️ Anomalies
🔔 Alerts
🔧 Maintenance & Work Orders
⚡ Risk & Prioritization
📄 Reports
👥 User Management
⚙️ System Settings
```

### User Sidebar
```
📊 Dashboard
🏠 Assets
✅ Inspections
🔔 Alerts
🔧 Maintenance & Work Orders
📄 Reports
👤 Profile
```

---

## Security Notes

⚠️ **Important**: These are demo credentials for development and testing purposes only.

In production:
- Use strong, unique passwords
- Implement multi-factor authentication (MFA)
- Regular password rotation policies
- Implement session timeout
- Use HTTPS for all communications
- Implement proper backend authentication
- Use JWT or OAuth2 tokens
- Audit all user activities

---

## Troubleshooting

### Cannot Login?
1. Check if you selected the correct role
2. Verify email and password are correct
3. Try using the "Quick Login" buttons
4. Clear browser cache and try again

### Access Denied to a Page?
- This is normal! Different roles have different access levels
- Users cannot access Administrator features
- Contact your System Administrator for role changes

### Forgot Password?
- Use the quick login buttons for demo accounts
- In production, use the "Forgot Password" feature

---

## Support

For technical support or questions:
- Contact: System Administrator
- Email: admin@infrainfo.io
- Phone: +91 XXXX-XXXXXX

---

*Last Updated: March 6, 2026*  
*InfraInfo Infrastructure Health Monitoring System*
