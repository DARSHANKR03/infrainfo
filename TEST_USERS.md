# INFRAINFO - Test User Credentials

## Authentication System

The application now has a complete authentication system. Users must log in with their assigned email and password before accessing the system.

## Test User Accounts

The following test accounts are available for login:

### 1. System Administrator
- **Name:** A. Kumar
- **Email:** admin@infrainfo.io
- **Password:** admin123
- **Role:** System Administrator
- **Employee ID:** EMP-001
- **Access:** Full system access with all permissions

### 2. Field Engineer
- **Name:** R. Patel
- **Email:** engineer@infrainfo.io
- **Password:** engineer123
- **Role:** Field Engineer
- **Employee ID:** EMP-002
- **Access:** Suitable for operational tasks

### 3. Operations Manager
- **Name:** S. Singh
- **Email:** manager@infrainfo.io
- **Password:** manager123
- **Role:** Operations Manager
- **Employee ID:** EMP-003
- **Access:** Management and oversight capabilities

### 4. Inspector
- **Name:** M. Sharma
- **Email:** inspector@infrainfo.io
- **Password:** inspector123
- **Role:** Inspector
- **Employee ID:** EMP-004
- **Access:** Inspection and reporting functions

## Features

✅ **Login Page** - Professional login interface with INFRAINFO branding
✅ **Session Management** - User sessions persist across page refreshes
✅ **Protected Routes** - All application routes require authentication
✅ **Sign Out** - Click "Sign out" in the profile dropdown to log out
✅ **Dynamic User Info** - User name, email, and initials display throughout the app
✅ **User Profile** - Complete profile page with activity logs and permissions

## How to Use

1. Navigate to the application (it will redirect to `/login` if not authenticated)
2. Enter one of the test email addresses and passwords above
3. Click "Sign In" to access the system
4. Your session will be saved, so you won't need to log in again on refresh
5. Click your profile icon → "Sign out" to log out

## Admin Functions

The admin can assign email addresses and passwords for new users. In a production environment, these credentials would be managed through the Administration module.

**Note:** This is a demonstration system. In production, passwords should be securely hashed and stored in a backend database.
