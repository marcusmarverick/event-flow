import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import styles from './AppLayout.module.css';

function LogoIcon() {
  return (
    <svg className={styles.logoIcon} viewBox="0 0 42 42" fill="none">
      <rect width="42" height="42" rx="10" fill="rgba(20,184,166,0.15)" />
      <rect x="7" y="11" width="28" height="22" rx="4" stroke="#14b8a6" strokeWidth="1.8" />
      <line x1="7" y1="18" x2="35" y2="18" stroke="#14b8a6" strokeWidth="1.8" />
      <line x1="14" y1="7" x2="14" y2="13" stroke="#14b8a6" strokeWidth="2" strokeLinecap="round" />
      <line x1="28" y1="7" x2="28" y2="13" stroke="#14b8a6" strokeWidth="2" strokeLinecap="round" />
      <path d="M12 25 Q21 21 30 25" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M14 29 Q21 25 28 29" stroke="#f59e0b" strokeWidth="1.4" strokeLinecap="round" fill="none" opacity="0.45" />
    </svg>
  );
}

const NAV_PARTICIPANT = [
  {
    to: '/participant/profile',
    label: 'Meu perfil',
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
      </svg>
    ),
  },
  {
    to: '/events',
    label: 'Explorar eventos',
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
      </svg>
    ),
  },
  {
    to: '/participant/events',
    label: 'Meus eventos',
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
    ),
  },
];

const NAV_ORGANIZER = [
  {
    to: '/organizer/profile',
    label: 'Meu perfil',
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
      </svg>
    ),
  },
  {
    to: '/events',
    label: 'Explorar eventos',
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
      </svg>
    ),
  },
  {
    to: '/events/create',
    label: 'Criar evento',
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
      </svg>
    ),
  },
  {
    to: '/organizer/events',
    label: 'Meus eventos',
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
    ),
  },
];

export default function AppLayout({ children, onSearch, searchValue = '', searchPlaceholder = 'Buscar eventos...' }) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const isOrganizer = user?.type === 'organizer';
  const navItems = isOrganizer ? NAV_ORGANIZER : NAV_PARTICIPANT;
  const initials = (user?.name || 'U').split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();

  function handleLogout() {
    logout();
    navigate('/');
  }

  return (
    <div className={styles.root}>
      <div className={styles.dots} />
      <div className={styles.orbs} />

      <div className={styles.shell}>

        {/* ── Sidebar ── */}
        <aside className={styles.sidebar}>
          <div className={styles.sidebarLogo}>
            <Link to="/" className={styles.logoLink}>
              <LogoIcon />
              <span className={styles.logoText}>
                Event<span className={styles.logoAccent}>Flow</span>
              </span>
            </Link>
          </div>

          <div className={styles.sidebarType}>
            <span className={`${styles.typePill} ${isOrganizer ? styles.typeOrg : styles.typePart}`}>
              {isOrganizer ? '🎤 Organizador' : '🎟️ Participante'}
            </span>
          </div>

          <nav className={styles.sidebarNav}>
            <span className={styles.navSection}>MENU</span>
            {navItems.map(item => {
              const active = location.pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`${styles.navItem} ${active ? styles.navItemActive : ''}`}
                >
                  <span className={styles.navIcon}>{item.icon}</span>
                  <span className={styles.navLabel}>{item.label}</span>
                  {active && <span className={styles.navActiveDot} />}
                </Link>
              );
            })}
          </nav>

          <div className={styles.sidebarFooter}>
            <div className={styles.sidebarUser}>
              <div className={styles.sidebarAvatar}>{initials}</div>
              <div className={styles.sidebarUserInfo}>
                <span className={styles.sidebarUserName}>{user?.name?.split(' ')[0]}</span>
                <span className={styles.sidebarUserEmail}>{user?.email}</span>
              </div>
            </div>
            <button className={styles.logoutBtn} onClick={handleLogout} title="Sair">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                <polyline points="16 17 21 12 16 7"/>
                <line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
            </button>
          </div>
        </aside>

        {/* ── Main ── */}
        <div className={styles.main}>
          <header className={styles.topbar}>
            <div className={styles.topbarSearch}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input
                className={styles.searchInput}
                type="text"
                placeholder={searchPlaceholder}
                value={searchValue}
                onChange={e => onSearch?.(e.target.value)}
              />
            </div>

            <div className={styles.topbarRight}>
              <div className={styles.topbarAvatar}>{initials}</div>
              <div className={styles.topbarUserInfo}>
                <span className={styles.topbarUserName}>{user?.name?.split(' ')[0]}</span>
                <span className={`${styles.topbarUserType} ${isOrganizer ? styles.typeOrg : styles.typePart}`}>
                  {isOrganizer ? 'Organizador' : 'Participante'}
                </span>
              </div>
            </div>
          </header>

          <div className={styles.content}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}