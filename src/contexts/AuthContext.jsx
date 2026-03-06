import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

// Mock user database - In production, this would be handled by backend
// Two main roles: Administrator (full control) and User (limited access)
const MOCK_USERS = [
  // Administrator Accounts - Full System Control
  {
    email: 'admin@infrainfo.io',
    password: 'admin123',
    name: 'A. Kumar',
    role: 'Administrator',
    roleType: 'Administrator',
    employeeId: 'ADMIN-001',
    city: 'All Cities',
    permissions: {
      userManagement: true,
      assetCreation: true,
      ruleConfiguration: true,
      systemSettings: true,
      fullAccess: true
    }
  },
  {
    email: 'admin2@infrainfo.io',
    password: 'admin123',
    name: 'S. Verma',
    role: 'Administrator',
    roleType: 'Administrator',
    employeeId: 'ADMIN-002',
    city: 'Bangalore',
    permissions: {
      userManagement: true,
      assetCreation: true,
      ruleConfiguration: true,
      systemSettings: true,
      fullAccess: true
    }
  },
  
  // User Accounts - Limited Access (Inspectors, Analysts, Field Engineers)
  {
    email: 'user@infrainfo.io',
    password: 'user123',
    name: 'R. Patel',
    role: 'Field Engineer',
    roleType: 'User',
    employeeId: 'USER-001',
    city: 'Bangalore',
    assignedAssets: ['AST-001', 'AST-002', 'AST-005'],
    permissions: {
      userManagement: false,
      assetCreation: false,
      assetViewing: true,
      inspectionEntry: true,
      ruleConfiguration: false,
      alertMonitoring: true,
      maintenanceHandling: true,
      systemSettings: false,
      fullAccess: false
    }
  },
  {
    email: 'inspector@infrainfo.io',
    password: 'inspector123',
    name: 'M. Sharma',
    role: 'Inspector',
    roleType: 'User',
    employeeId: 'USER-002',
    city: 'Mumbai',
    assignedAssets: ['AST-003', 'AST-006', 'AST-007'],
    permissions: {
      userManagement: false,
      assetCreation: false,
      assetViewing: true,
      inspectionEntry: true,
      ruleConfiguration: false,
      alertMonitoring: true,
      maintenanceHandling: true,
      systemSettings: false,
      fullAccess: false
    }
  },
  {
    email: 'analyst@infrainfo.io',
    password: 'analyst123',
    name: 'P. Singh',
    role: 'Data Analyst',
    roleType: 'User',
    employeeId: 'USER-003',
    city: 'Delhi',
    assignedAssets: ['AST-004', 'AST-008'],
    permissions: {
      userManagement: false,
      assetCreation: false,
      assetViewing: true,
      inspectionEntry: true,
      ruleConfiguration: false,
      alertMonitoring: true,
      maintenanceHandling: false,
      systemSettings: false,
      fullAccess: false
    }
  }
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in (from localStorage)
  useEffect(() => {
    const storedUser = localStorage.getItem('infrainfo_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('infrainfo_user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Find user in mock database
    const foundUser = MOCK_USERS.find(
      u => u.email === email && u.password === password
    );

    if (foundUser) {
      // Don't store password in state or localStorage
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('infrainfo_user', JSON.stringify(userWithoutPassword));
      return { success: true };
    } else {
      return { success: false, error: 'Invalid email or password' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('infrainfo_user');
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    isAdministrator: user?.roleType === 'Administrator',
    isUser: user?.roleType === 'User',
    hasPermission: (permission) => user?.permissions?.[permission] || false,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Helper function for role checking
export function hasAdminRole(user) {
  return user?.roleType === 'Administrator';
}

export function hasUserRole(user) {
  return user?.roleType === 'User';
}

// Export mock users for admin reference
export { MOCK_USERS };
