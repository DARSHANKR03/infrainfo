# INFRAINFO - Test User Credentials & Role-Based Access

## 🔐 Authentication System

The application now has a **comprehensive role-based authentication system** with two distinct user types:

### 🛡️ Administrator - Full System Control
- User management
- System configuration  
- Rules & threshold configuration
- Complete analytics and reporting
- Asset creation and deletion

### 👤 User - Operational Access
- View assigned assets
- Submit inspections
- Monitor alerts
- Handle maintenance work orders
- Limited reporting

---

## 📋 Test User Accounts

### ADMINISTRATOR ACCOUNTS

#### 1. Primary Administrator
- **Name:** A. Kumar
- **Email:** admin@infrainfo.io
- **Password:** admin123
- **Role Type:** Administrator
- **Employee ID:** ADMIN-001
- **City:** All Cities
- **Access:** Full system access with all permissions
- **Quick Login:** Available on Administrator login screen

#### 2. Secondary Administrator  
- **Name:** S. Verma
- **Email:** admin2@infrainfo.io
- **Password:** admin123
- **Role Type:** Administrator
- **Employee ID:** ADMIN-002
- **City:** Bangalore
- **Access:** Full system access with all permissions
- **Quick Login:** Available on Administrator login screen

---

### USER ACCOUNTS

#### 3. Field Engineer
- **Name:** R. Patel
- **Email:** user@infrainfo.io
- **Password:** user123
- **Role:** Field Engineer
- **Role Type:** User
- **Employee ID:** USER-001
- **City:** Bangalore
- **Assigned Assets:** AST-001, AST-002, AST-005
- **Access:** Operational access - inspections, alerts, maintenance
- **Quick Login:** Available on User login screen

#### 4. Inspector
- **Name:** M. Sharma
- **Email:** inspector@infrainfo.io
- **Password:** inspector123
- **Role:** Inspector
- **Role Type:** User
- **Employee ID:** USER-002
- **City:** Mumbai
- **Assigned Assets:** AST-003, AST-006, AST-007
- **Access:** Operational access - inspections, alerts, maintenance
- **Quick Login:** Available on User login screen

#### 5. Data Analyst
- **Name:** P. Singh
- **Email:** analyst@infrainfo.io
- **Password:** analyst123
- **Role:** Data Analyst
- **Role Type:** User
- **Employee ID:** USER-003
- **City:** Delhi
- **Assigned Assets:** AST-004, AST-008
- **Access:** Operational access - inspections, alerts (no maintenance)
- **Quick Login:** Available on User login screen

---

## 🚀 How to Login

### Method 1: Role Selection + Quick Login (Recommended)
1. Open the application
2. Select your role: **Administrator** or **User**
3. Click on any account name to instantly login

### Method 2: Manual Credentials
1. Open the application
2. Select your role: **Administrator** or **User**
3. Enter email and password manually
4. Click "Sign In"

---

## ✨ Features

### Authentication Features
✅ **Role Selection Screen** - Choose between Administrator and User before login  
✅ **Quick Login Buttons** - One-click login for demo accounts  
✅ **Professional Login UI** - Role-specific gradient themes (blue for admin, green for user)  
✅ **Session Management** - User sessions persist across page refreshes  
✅ **Protected Routes** - All routes require authentication  
✅ **Role-Based Route Protection** - Admin routes blocked for regular users

### Role-Based Features
✅ **Dynamic Sidebars** - Different navigation menus for each role  
✅ **Role Badges** - Visual indicators in profile dropdown  
✅ **Permission Checking** - Fine-grained access control  
✅ **Access Denied Handling** - Automatic redirect when unauthorized  
✅ **User Info Display** - Name, email, role, and initials throughout app

### User Interface
✅ **Enhanced Profile Dropdown** - Shows role, email, and contextual menu  
✅ **Sign Out** - Click "Sign Out" in profile dropdown  
✅ **Breadcrumbs** - Navigation tracking  
✅ **Notifications** - Alert system integration  
✅ **Search** - Global search functionality

---

## 🎯 Access Control Matrix

| Feature | Administrator | User |
|---------|:-------------:|:----:|
| Dashboard | ✅ | ✅ |
| View Assets | ✅ All | ✅ Assigned |
| Create Assets | ✅ | ❌ |
| Edit Assets | ✅ | ❌ |
| Delete Assets | ✅ | ❌ |
| Bulk Upload Assets | ✅ | ❌ |
| View Inspections | ✅ All | ✅ Assigned |
| Submit Inspections | ✅ | ✅ |
| Rules & Thresholds | ✅ | ❌ |
| Health Analytics | ✅ | ❌ |
| Anomalies | ✅ | ❌ |
| Alerts | ✅ All | ✅ Assigned |
| Maintenance | ✅ All | ✅ Assigned |
| Risk Prioritization | ✅ | ❌ |
| Reports | ✅ Full | ✅ Limited |
| User Management | ✅ | ❌ |
| System Settings | ✅ | ❌ |
| Profile | ✅ | ✅ |

---

## 📱 Testing Instructions

### Test Administrator Access:
1. Login as `admin@infrainfo.io` / `admin123`
2. Verify full sidebar menu (12 items)
3. Access User Management
4. Create/edit rules and thresholds
5. View system settings
6. Check profile shows "🛡️ ADMIN" badge

### Test User Access:
1. Login as `user@infrainfo.io` / `user123`
2. Verify limited sidebar menu (7 items)
3. Try to access `/rules-thresholds` → Should redirect
4. Try to access `/administration` → Should redirect
5. Verify can view assets and alerts
6. Check profile shows "👤 USER" badge

---

## 🔒 Security Notes

**⚠️ IMPORTANT:** These are demo credentials for development only.

In production, implement:
- Strong password requirements
- Multi-factor authentication (MFA)
- Password hashing (bcrypt)
- JWT token authentication
- Session timeout mechanisms
- HTTPS encryption
- Rate limiting
- Audit logging
- Regular security reviews

---

## 📚 Additional Documentation

- **LOGIN_CREDENTIALS.md** - Detailed login guide with all credentials
- **RBAC_TESTING_GUIDE.md** - Comprehensive testing procedures
- **INFRASTRUCTURE_THRESHOLDS_GUIDE.md** - Rules and threshold documentation

---

*Last Updated: March 6, 2026*  
*InfraInfo Role-Based Access Control System v1.0*

## How to Use

1. Navigate to the application (it will redirect to `/login` if not authenticated)
2. Enter one of the test email addresses and passwords above
3. Click "Sign In" to access the system
4. Your session will be saved, so you won't need to log in again on refresh
5. Click your profile icon → "Sign out" to log out

## Admin Functions

The admin can assign email addresses and passwords for new users. In a production environment, these credentials would be managed through the Administration module.

**Note:** This is a demonstration system. In production, passwords should be securely hashed and stored in a backend database.
