import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null); // 'Administrator' or 'User'

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(email, password);

    if (result.success) {
      navigate(from, { replace: true });
    } else {
      setError(result.error);
    }

    setLoading(false);
  };

  // Role selection view
  if (!selectedRole) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        padding: '1rem'
      }}>
        <div style={{
          width: '100%',
          maxWidth: '520px',
          background: '#fff',
          borderRadius: '1rem',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
          overflow: 'hidden'
        }}>
          {/* Header */}
          <div style={{
            background: 'linear-gradient(135deg, var(--accent-500), var(--accent-400))',
            padding: '2.5rem 2rem',
            textAlign: 'center'
          }}>
            <div style={{
              width: 90,
              height: 90,
              margin: '0 auto 1rem',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 42
            }}>
              🏙️
            </div>
            <h1 style={{
              margin: 0,
              fontSize: 28,
              fontWeight: 700,
              color: '#fff',
              letterSpacing: '0.5px'
            }}>
              INFRAINFO
            </h1>
            <p style={{
              margin: '0.5rem 0 0',
              fontSize: 15,
              color: 'rgba(255,255,255,0.95)'
            }}>
              Infrastructure Health Monitoring System
            </p>
          </div>

          {/* Role Selection */}
          <div style={{ padding: '2.5rem 2rem' }}>
            <h2 style={{
              margin: '0 0 0.75rem',
              fontSize: 22,
              fontWeight: 600,
              color: 'var(--primary-900)',
              textAlign: 'center'
            }}>
              Select Your Role
            </h2>
            <p style={{
              margin: '0 0 2rem',
              fontSize: 14,
              color: 'var(--neutral-muted)',
              textAlign: 'center'
            }}>
              Choose how you want to access the system
            </p>

            {/* Administrator Card */}
            <div 
              onClick={() => setSelectedRole('Administrator')}
              style={{
                padding: '1.5rem',
                marginBottom: '1rem',
                border: '2px solid var(--accent-200)',
                borderRadius: '0.75rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                background: '#fff'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--accent-500)';
                e.currentTarget.style.background = '#f0f9ff';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(59,130,246,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--accent-200)';
                e.currentTarget.style.background = '#fff';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{
                  width: 50,
                  height: 50,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 24,
                  flexShrink: 0
                }}>
                  🛡️
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{
                    margin: '0 0 0.25rem',
                    fontSize: 18,
                    fontWeight: 600,
                    color: 'var(--primary-900)'
                  }}>
                    Administrator
                  </h3>
                  <p style={{
                    margin: 0,
                    fontSize: 13,
                    color: 'var(--neutral-muted)',
                    lineHeight: 1.4
                  }}>
                    Full system control - User management, system configuration, rules
                  </p>
                </div>
                <div style={{ fontSize: 20, color: 'var(--accent-500)' }}>→</div>
              </div>
            </div>

            {/* User Card */}
            <div 
              onClick={() => setSelectedRole('User')}
              style={{
                padding: '1.5rem',
                border: '2px solid var(--success-200)',
                borderRadius: '0.75rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                background: '#fff'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--success-500)';
                e.currentTarget.style.background = '#f0fdf4';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(34,197,94,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--success-200)';
                e.currentTarget.style.background = '#fff';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{
                  width: 50,
                  height: 50,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #10b981, #059669)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 24,
                  flexShrink: 0
                }}>
                  👤
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{
                    margin: '0 0 0.25rem',
                    fontSize: 18,
                    fontWeight: 600,
                    color: 'var(--primary-900)'
                  }}>
                    User
                  </h3>
                  <p style={{
                    margin: 0,
                    fontSize: 13,
                    color: 'var(--neutral-muted)',
                    lineHeight: 1.4
                  }}>
                    Inspections, alerts, maintenance, assigned asset monitoring
                  </p>
                </div>
                <div style={{ fontSize: 20, color: 'var(--success-500)' }}>→</div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div style={{
            padding: '1rem 2rem',
            background: '#f8fafc',
            borderTop: '1px solid var(--neutral-border)',
            textAlign: 'center'
          }}>
            <p style={{
              margin: 0,
              fontSize: 11,
              color: 'var(--neutral-muted)'
            }}>
              © 2026 INFRAINFO. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Login form view
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
      padding: '1rem'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '480px',
        background: '#fff',
        borderRadius: '1rem',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{
          background: selectedRole === 'Administrator' 
            ? 'linear-gradient(135deg, #3b82f6, #2563eb)'
            : 'linear-gradient(135deg, #10b981, #059669)',
          padding: '2rem',
          textAlign: 'center'
        }}>
          <div style={{
            width: 70,
            height: 70,
            margin: '0 auto 1rem',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 32
          }}>
            {selectedRole === 'Administrator' ? '🛡️' : '👤'}
          </div>
          <h1 style={{
            margin: 0,
            fontSize: 22,
            fontWeight: 700,
            color: '#fff',
            letterSpacing: '0.5px'
          }}>
            {selectedRole} Login
          </h1>
          <p style={{
            margin: '0.5rem 0 0',
            fontSize: 13,
            color: 'rgba(255,255,255,0.9)'
          }}>
            INFRAINFO Health Monitor
          </p>
        </div>

        {/* Login Form */}
        <div style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h2 style={{
              margin: 0,
              fontSize: 18,
              fontWeight: 600,
              color: 'var(--primary-900)'
            }}>
              Sign In
            </h2>
            <button
              onClick={() => setSelectedRole(null)}
              style={{
                padding: '0.5rem 0.75rem',
                fontSize: 12,
                background: 'transparent',
                border: '1px solid var(--neutral-border)',
                borderRadius: '0.375rem',
                cursor: 'pointer',
                color: 'var(--neutral-muted)'
              }}
            >
              ← Change Role
            </button>
          </div>

          {error && (
            <div style={{
              padding: '0.75rem 1rem',
              marginBottom: '1rem',
              borderRadius: '0.5rem',
              background: '#fef2f2',
              border: '1px solid #fecaca',
              color: '#dc2626',
              fontSize: 13
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Email Field */}
            <div style={{ marginBottom: '1rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontSize: 13,
                fontWeight: 600,
                color: 'var(--primary-700)'
              }}>
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@infrainfo.io"
                required
                style={{
                  width: '100%',
                  padding: '0.625rem 0.875rem',
                  fontSize: 14,
                  border: '1px solid var(--neutral-border)',
                  borderRadius: '0.5rem',
                  outline: 'none',
                  transition: 'border-color 0.2s ease'
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--accent-500)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--neutral-border)'}
              />
            </div>

            {/* Password Field */}
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontSize: 13,
                fontWeight: 600,
                color: 'var(--primary-700)'
              }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  style={{
                    width: '100%',
                    padding: '0.625rem 0.875rem',
                    paddingRight: '3rem',
                    fontSize: 14,
                    border: '1px solid var(--neutral-border)',
                    borderRadius: '0.5rem',
                    outline: 'none',
                    transition: 'border-color 0.2s ease'
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--accent-500)'}
                  onBlur={(e) => e.target.style.borderColor = 'var(--neutral-border)'}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '0.75rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: 16,
                    padding: '0.25rem'
                  }}
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '0.75rem',
                fontSize: 14,
                fontWeight: 600,
                color: '#fff',
                background: loading ? '#94a3b8' 
                  : selectedRole === 'Administrator'
                    ? 'linear-gradient(135deg, #3b82f6, #2563eb)'
                    : 'linear-gradient(135deg, #10b981, #059669)',
                border: 'none',
                borderRadius: '0.5rem',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: selectedRole === 'Administrator'
                  ? '0 4px 12px rgba(59,130,246,0.4)'
                  : '0 4px 12px rgba(16,185,129,0.4)'
              }}
              onMouseEnter={(e) => {
                if (!loading) e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
              }}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>

        {/* Footer */}
        <div style={{
          padding: '1rem 2rem',
          background: '#f8fafc',
          borderTop: '1px solid var(--neutral-border)',
          textAlign: 'center'
        }}>
          <p style={{
            margin: 0,
            fontSize: 11,
            color: 'var(--neutral-muted)'
          }}>
            © 2026 INFRAINFO. All Rights Reserved.
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
