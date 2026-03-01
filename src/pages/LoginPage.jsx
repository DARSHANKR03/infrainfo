import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
        maxWidth: '420px',
        background: '#fff',
        borderRadius: '1rem',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, var(--accent-500), var(--accent-400))',
          padding: '2rem',
          textAlign: 'center'
        }}>
          <div style={{
            width: 80,
            height: 80,
            margin: '0 auto 1rem',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 36
          }}>
            🏙️
          </div>
          <h1 style={{
            margin: 0,
            fontSize: 24,
            fontWeight: 700,
            color: '#fff',
            letterSpacing: '0.5px'
          }}>
            INFRAINFO
          </h1>
          <p style={{
            margin: '0.5rem 0 0',
            fontSize: 14,
            color: 'rgba(255,255,255,0.9)'
          }}>
            Health Monitor
          </p>
        </div>

        {/* Login Form */}
        <div style={{ padding: '2rem' }}>
          <h2 style={{
            margin: '0 0 0.5rem',
            fontSize: 20,
            fontWeight: 600,
            color: 'var(--primary-900)'
          }}>
            Sign In
          </h2>
          <p style={{
            margin: '0 0 2rem',
            fontSize: 14,
            color: 'var(--neutral-muted)'
          }}>
            Enter your credentials to access the system
          </p>

          {error && (
            <div style={{
              padding: '0.75rem 1rem',
              marginBottom: '1rem',
              borderRadius: '0.5rem',
              background: '#fef2f2',
              border: '1px solid #fecaca',
              color: '#dc2626',
              fontSize: 14
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Email Field */}
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontSize: 14,
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
                  padding: '0.75rem 1rem',
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
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontSize: 14,
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
                    padding: '0.75rem 1rem',
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
                    fontSize: 18,
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
                padding: '0.875rem',
                fontSize: 15,
                fontWeight: 600,
                color: '#fff',
                background: loading ? '#94a3b8' : 'linear-gradient(135deg, var(--accent-500), var(--accent-400))',
                border: 'none',
                borderRadius: '0.5rem',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: '0 4px 12px rgba(59,130,246,0.4)'
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
            © 2026 INFRAINFO. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
