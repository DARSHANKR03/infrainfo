import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Breadcrumbs from './Breadcrumbs';
import NotificationDropdown from '../../features/alerts/components/NotificationDropdown';

function HamburgerIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="6"  x2="21" y2="6"/>
      <line x1="3" y1="12" x2="21" y2="12"/>
      <line x1="3" y1="18" x2="21" y2="18"/>
    </svg>
  );
}

function CollapseIcon({ collapsed }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
      style={{ transition: 'transform 250ms ease', transform: collapsed ? 'rotate(180deg)' : 'none' }}>
      <polyline points="15 18 9 12 15 6"/>
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
  );
}

function Navbar({ onMobileMenuOpen, sidebarCollapsed, onSidebarToggle }) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchVal, setSearchVal]     = useState('');

  const handleSignOut = () => {
    logout();
    navigate('/login');
  };

  // Get user initials for avatar
  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const userName = user?.name || 'User';
  const userEmail = user?.email || 'user@infrainfo.io';
  const userInitials = getInitials(userName);

  return (
    <header className="app-topbar">
      {/* Left: toggles + title */}
      <div className="topbar-left">
        {/* Mobile hamburger – hidden on desktop */}
        <button
          type="button"
          onClick={onMobileMenuOpen}
          className="icon-btn topbar-mobile-only"
          aria-label="Open sidebar"
        >
          <HamburgerIcon />
        </button>

        {/* Desktop collapse – hidden on mobile */}
        <button
          type="button"
          onClick={onSidebarToggle}
          className="icon-btn topbar-desktop-only"
          aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <CollapseIcon collapsed={sidebarCollapsed} />
        </button>

        <div style={{ minWidth: 0 }}>
          <h1 style={{ fontSize: 'clamp(13px, 1.6vw, 16px)', fontWeight: 700, color: 'var(--primary-900)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            INFRAINFO
          </h1>
          <Breadcrumbs />
        </div>
      </div>

      {/* Centre: search */}
      <div className="topbar-center">
        <div className="search-wrapper">
          <SearchIcon />
          <input
            type="search"
            className="search-input"
            placeholder="Search assets, alerts, work orders…"
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            aria-label="Search"
          />
        </div>
      </div>

      {/* Right: notifications + profile + status */}
      <div className="topbar-right">
        <NotificationDropdown />

        {/* Profile */}
        <div style={{ position: 'relative' }}>
          <button
            type="button"
            onClick={() => setProfileOpen((p) => !p)}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.4rem 0.75rem', borderRadius: '9999px',
              border: '1px solid var(--neutral-border)',
              background: 'var(--surface)',
              color: 'var(--primary-700)', fontSize: 13, fontWeight: 600,
              cursor: 'pointer', transition: 'all 150ms ease'
            }}
            aria-label="Profile menu"
            aria-expanded={profileOpen}
          >
            <span style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              width: 28, height: 28, borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--accent-500), var(--accent-400))',
              color: '#fff', fontSize: 11, fontWeight: 700, flexShrink: 0
            }}>
              {userInitials}
            </span>
            <span className="profile-name-text">{userName}</span>
          </button>

          {profileOpen && (
            <div className="profile-dropdown anim-dropdown" role="menu">
              <div style={{ padding: '0.75rem 1rem', borderBottom: '1px solid var(--neutral-border)' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--primary-900)' }}>{userName}</div>
                <div style={{ fontSize: 11.5, color: 'var(--neutral-muted)', marginTop: 2 }}>{userEmail}</div>
              </div>
              <button type="button" className="profile-dropdown-item" role="menuitem" onClick={() => { setProfileOpen(false); navigate('/profile'); }}>
                👤 &nbsp;Profile
              </button>
              <button type="button" className="profile-dropdown-item" role="menuitem" onClick={() => { setProfileOpen(false); navigate('/settings'); }}>
                ⚙️ &nbsp;Preferences
              </button>
              <div style={{ height: 1, background: 'var(--neutral-border)', margin: '0.25rem 0' }} />
              <button type="button" className="profile-dropdown-item danger" role="menuitem" onClick={handleSignOut}>
                🚪 &nbsp;Sign out
              </button>
            </div>
          )}
        </div>

        {/* System status pill */}
        <div className="system-status-pill" style={{
          flexDirection: 'column', alignItems: 'flex-end',
          padding: '0.25rem 0.75rem', borderRadius: '9999px',
          background: 'var(--success-light)', border: '1px solid rgba(22,163,74,0.2)'
        }}>
          <span style={{ fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--success)', display: 'flex', alignItems: 'center', gap: 5 }}>
            <span className="status-dot online" />
            Operational
          </span>
        </div>
      </div>
    </header>
  );
}

export default Navbar;

