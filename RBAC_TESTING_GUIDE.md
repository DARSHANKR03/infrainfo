# Role-Based Access Control (RBAC) - Testing Guide

## Overview

The InfraInfo system now has a **fully functional role-based access control** system with two distinct user types:

### 🛡️ Administrator
- **Full system control**
- User management
- System configuration
- Rules & threshold configuration
- Complete analytics and reporting
- Asset creation and deletion

### 👤 User  
- **Operational access**
- View assigned assets
- Submit inspections
- Monitor alerts
- Handle maintenance work orders
- Limited reporting

---

## Testing the Role-Based Access System

### Test 1: Administrator Login Flow

1. **Open the application** → Navigate to login page
2. **Select Administrator role** → Click on "Administrator" card
3. **Choose quick login** → Click on "A. Kumar" or use:
   - Email: `admin@infrainfo.io`
   - Password: `admin123`
4. **Verify Administrator sidebar** appears with:
   - Dashboard
   - Assets
   - Inspections
   - Rules & Thresholds ⭐ (Admin Only)
   - Health & Analytics ⭐ (Admin Only)
   - Anomalies ⭐ (Admin Only)
   - Alerts
   - Maintenance & Work Orders
   - Risk & Prioritization ⭐ (Admin Only)
   - Reports
   - User Management ⭐ (Admin Only)
   - System Settings ⭐ (Admin Only)

5. **Test Admin Features:**
   - ✅ Click "User Management" → Should show user table
   - ✅ Click "Add User" → Should open user form
   - ✅ Click "Rules & Thresholds" → Should show rules list
   - ✅ Click "System Settings" → Should show configuration
   - ✅ Navigate to Assets → Click "Add Asset" → Should work
   - ✅ Try to access all menu items → All should be accessible

### Test 2: User Login Flow

1. **Logout** → Click profile dropdown → Sign Out
2. **Select User role** → Click on "User" card
3. **Choose quick login** → Click on "R. Patel" or use:
   - Email: `user@infrainfo.io`
   - Password: `user123`
4. **Verify User sidebar** appears with ONLY:
   - Dashboard
   - Assets
   - Inspections
   - Alerts
   - Maintenance & Work Orders
   - Reports
   - Profile

5. **Test User Restrictions:**
   - ❌ Try to access `/rules-thresholds` → Should redirect to dashboard
   - ❌ Try to access `/health-analytics` → Should redirect to dashboard
   - ❌ Try to access `/administration` → Should redirect to dashboard
   - ❌ Try to access `/settings` → Should redirect to dashboard
   - ✅ Click "Assets" → Should see assets (view only)
   - ✅ Try "Add Asset" button → Should NOT be visible
   - ✅ Click "Inspections" → Should work
   - ✅ Click "Alerts" → Should work (filtered to assigned assets)
   - ✅ Click "Maintenance" → Should work (filtered to assigned work orders)

### Test 3: Role Switching

1. **Login as Admin** → Verify admin features
2. **Logout** → Return to login
3. **Login as User** → Verify user features
4. **Logout** → Return to login
5. **Change role selection** → Should show role cards again

### Test 4: Profile Dropdown

#### As Administrator:
1. Click profile dropdown
2. Verify displays:
   - Name: "A. Kumar"
   - Badge: "🛡️ ADMIN" (blue)
   - Role: "Administrator"
   - Email: "admin@infrainfo.io"
   - Menu items:
     - 👤 My Profile
     - ⚙️ System Settings
     - 👥 User Management
     - 🚪 Sign Out

#### As User:
1. Click profile dropdown
2. Verify displays:
   - Name: "R. Patel"
   - Badge: "👤 USER" (green)
   - Role: "Field Engineer"
   - Email: "user@infrainfo.io"
   - Menu items:
     - 👤 My Profile
     - 🚪 Sign Out
   - Should NOT show: System Settings, User Management

### Test 5: URL Direct Access (Security Test)

#### As User, try to access admin URLs directly:

1. Type in browser: `/rules-thresholds`
   - **Expected**: Redirect to `/dashboard`
   
2. Type in browser: `/administration`
   - **Expected**: Redirect to `/dashboard`
   
3. Type in browser: `/settings`
   - **Expected**: Redirect to `/dashboard`
   
4. Type in browser: `/health-analytics`
   - **Expected**: Redirect to `/dashboard`

5. Type in browser: `/assets/new`
   - **Expected**: Redirect to `/dashboard`

✅ **Security works if all redirect to dashboard!**

### Test 6:Data Filtering (Conceptual)

#### Administrator:
- Should see **ALL assets** in the system
- Should see **ALL alerts** across all zones
- Should see **ALL work orders**
- Should see **ALL inspections**

#### User:
- Should see **only assigned assets** (AST-001, AST-002, AST-005 for R. Patel)
- Should see **alerts for assigned assets only**
- Should see **assigned work orders only**
- Should be able to **submit inspections for assigned assets**

---

## Expected Results Summary

| Test | Administrator | User |
|------|--------------|------|
| Login with role selection | ✅ Works | ✅ Works |
| See full sidebar menu | ✅ 12 items | ✅ 7 items |
| Access Rules & Thresholds | ✅ Allowed | ❌ Blocked |
| Access User Management | ✅ Allowed | ❌ Blocked |
| Access System Settings | ✅ Allowed | ❌ Blocked |
| View Assets | ✅ All | ✅ Assigned |
| Create Assets | ✅ Allowed | ❌ Blocked |
| Submit Inspections | ✅ Allowed | ✅ Allowed |
| View Alerts | ✅ All | ✅ Assigned |
| Maintenance Work Orders | ✅ All | ✅ Assigned |
| Generate Reports | ✅ All | ✅ Limited |
| Profile shows role badge | ✅ Blue Admin | ✅ Green User |

---

## Screenshots to Capture (for Documentation)

1. **Login Role Selection Screen**
   - Shows both Administrator and User cards

2. **Administrator Login Screen**
   - Blue gradient header
   - Quick login buttons
   - Shows admin accounts

3. **User Login Screen**
   - Green gradient header
   - Quick login buttons
   - Shows user accounts

4. **Administrator Sidebar**
   - Full menu with 12 items
   - "Administrator" subtitle

5. **User Sidebar**
   - Limited menu with 7 items
   - "User Portal" subtitle

6. **Administrator Profile Dropdown**
   - Blue admin badge
   - Shows System Settings & User Management

7. **User Profile Dropdown**
   - Green user badge
   - No admin options

8. **Access Denied Scenario**
   - User trying to access admin route
   - Redirects to dashboard

---

## Integration Testing

### Test Scenario 1: End-to-End Admin Workflow
1. Login as Administrator
2. Create a new user
3. Assign roles and permissions
4. Create a new asset
5. Create a monitoring rule
6. View system analytics
7. Generate a report
8. Logout

### Test Scenario 2: End-to-End User Workflow
1. Login as User (Field Engineer)
2. View assigned assets
3. Check alerts for assigned assets
4. Submit an inspection report
5. Update a maintenance work order
6. View inspection history
7. Download an assigned asset report
8. Logout

---

## Performance Testing

1. **Login Performance**
   - Should complete in < 1 second
   - Quick login should be instant

2. **Route Protection**
   - Role checking should be instant
   - No visible lag when accessing protected routes

3. **Sidebar Rendering**
   - Different menus should render immediately
   - No flicker between role switches

---

## Security Checklist

- ✅ Users cannot access admin routes via URL manipulation
- ✅ User passwords are never stored in localStorage
- ✅ Role information is validated on every protected route
- ✅ Admin routes are wrapped with `<AdminRoute>` component
- ✅ User sessions persist across page refreshes
- ✅ Logout clears all session data
- ✅ Role badges correctly identify user type

---

## Known Limitations (Demo Mode)

1. **Backend Integration**: Currently uses mock users stored in frontend
2. **Real-time Updates**: No WebSocket connections for live updates
3. **Data Filtering**: Asset/alert filtering by user is conceptual
4. **Password Security**: Demo passwords are simple (production would require strong passwords)
5. **Session Management**: Basic localStorage (production would use JWT/OAuth2)

---

## Production Recommendations

### Security Enhancements:
1. Implement JWT token-based authentication
2. Add refresh token mechanism
3. Implement multi-factor authentication (MFA)
4. Add session timeout (15-30 minutes)
5. Implement rate limiting on login attempts
6. Use HTTPS for all communications
7. Hash passwords with bcrypt (backend)
8. Implement CSRF protection
9. Add audit logging for all role-based actions
10. Regular security audits

### Feature Enhancements:
1. Add "Remember Me" functionality
2. Implement "Forgot Password" flow
3. Add email verification for new users
4. Implement role hierarchy (Super Admin, Admin, Supervisor, User, Viewer)
5. Add custom permission sets
6. Implement team/department grouping
7. Add real-time notifications
8. Implement data export with role-based filtering
9. Add activity logs per user
10. Implement approval workflows

---

## Troubleshooting

### Issue: Cannot see admin menu after login
**Solution**: Verify you selected "Administrator" role before login

### Issue: Redirected to dashboard when accessing a page
**Solution**: Check if your current role has permission for that page

### Issue: Quick login buttons not working
**Solution**: Check browser console for errors, verify MOCK_USERS data

### Issue: Role badge not showing correct color
**Solution**: Clear browser cache and hard refresh (Ctrl+Shift+R)

### Issue: Sidebar not updating after switching users
**Solution**: Ensure full logout before switching roles

---

## Contact & Support

For issues or questions about the RBAC system:
- Developer: [Your Name]
- Email: admin@infrainfo.io
- Documentation: See LOGIN_CREDENTIALS.md

---

*Last Updated: March 6, 2026*  
*InfraInfo RBAC System v1.0*
