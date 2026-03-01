import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

// Mock user database - In production, this would be handled by backend
const MOCK_USERS = [
  {
    email: 'admin@infrainfo.io',
    password: 'admin123',
    name: 'A. Kumar',
    role: 'System Administrator',
    employeeId: 'EMP-001'
  },
  {
    email: 'engineer@infrainfo.io',
    password: 'engineer123',
    name: 'R. Patel',
    role: 'Field Engineer',
    employeeId: 'EMP-002'
  },
  {
    email: 'manager@infrainfo.io',
    password: 'manager123',
    name: 'S. Singh',
    role: 'Operations Manager',
    employeeId: 'EMP-003'
  },
  {
    email: 'inspector@infrainfo.io',
    password: 'inspector123',
    name: 'M. Sharma',
    role: 'Inspector',
    employeeId: 'EMP-004'
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

// Export mock users for admin reference
export { MOCK_USERS };
