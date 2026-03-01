import { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { sidebarMenu } from './sidebarMenu';

function ChevronRight() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
      style={{ color: 'var(--neutral-border)' }}>
      <polyline points="9 18 15 12 9 6"/>
    </svg>
  );
}

function Breadcrumbs() {
  const location = useLocation();

  const items = useMemo(() => {
    const active = sidebarMenu.find((item) => location.pathname.startsWith(item.path));
    return active ? ['Home', active.label] : ['Home'];
  }, [location.pathname]);

  return (
    <nav className="breadcrumb-nav" aria-label="Breadcrumb">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        if (index === 0) {
          return (
            <span key={item}>
              <Link to="/dashboard">{item}</Link>
            </span>
          );
        }

        return (
          <span key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <ChevronRight />
            <span className={isLast ? 'crumb-current' : ''}>{item}</span>
          </span>
        );
      })}
    </nav>
  );
}

export default Breadcrumbs;


