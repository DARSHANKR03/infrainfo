import { NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { administratorMenu, userMenu } from './sidebarMenu';

function CollapseIcon({ collapsed }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ transition: 'transform 250ms ease', transform: collapsed ? 'rotate(180deg)' : 'none' }}
    >
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

function Sidebar({ collapsed, mobileOpen, onMobileClose }) {
  const { user, isAdministrator } = useAuth();
  
  // Select menu based on user role
  const menu = isAdministrator ? administratorMenu : userMenu;
  
  const sidebarClass = [
    'app-sidebar',
    collapsed     ? 'is-collapsed'    : '',
    mobileOpen    ? 'is-mobile-open'  : ''
  ].filter(Boolean).join(' ');

  return (
    <aside className={sidebarClass} aria-label="Sidebar navigation">
      {/* Brand */}
      <div className="sidebar-brand">
        <div className="sidebar-brand-logo" aria-hidden="true">
          🏙️
        </div>
        <div className="sidebar-brand-text">
          <div className="brand-name">InfraInfo</div>
          <div className="brand-sub">
            {isAdministrator ? 'Administrator' : 'User Portal'}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav" role="navigation">
        {menu.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={onMobileClose}
            title={collapsed ? item.label : undefined}
            className={({ isActive }) =>
              ['sidebar-nav-item', isActive ? 'active' : ''].filter(Boolean).join(' ')
            }
          >
            <span className="sidebar-nav-icon" aria-hidden="true">
              {item.icon}
            </span>
            <span className="sidebar-nav-label">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="sidebar-footer">
        <div className="sidebar-nav-item" style={{ cursor: 'default', opacity: 0.6 }}>
          <span className="sidebar-nav-icon" aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
          </span>
          {!collapsed && (
            <span className="sidebar-nav-label" style={{ fontSize: 11, lineHeight: 1.4 }}>
              {user?.roleType || 'User'} | © 2026
            </span>
          )}
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;