import { Link, useLocation } from 'react-router-dom';
import styles from './AuthLayout.module.css';

/* SVG do logo — reutilizado nos dois painéis */
function LogoIcon() {
  return (
    <svg
      className={styles.logoIcon}
      viewBox="0 0 42 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="42" height="42" rx="10" fill="rgba(20,184,166,0.12)" />
      {/* Calendário */}
      <rect x="7" y="11" width="28" height="22" rx="4" stroke="#14b8a6" strokeWidth="1.8" />
      <line x1="7" y1="18" x2="35" y2="18" stroke="#14b8a6" strokeWidth="1.8" />
      {/* Pinos */}
      <line x1="14" y1="7" x2="14" y2="13" stroke="#14b8a6" strokeWidth="2" strokeLinecap="round" />
      <line x1="28" y1="7" x2="28" y2="13" stroke="#14b8a6" strokeWidth="2" strokeLinecap="round" />
      {/* Flow lines */}
      <path d="M12 25 Q21 21 30 25" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M14 29 Q21 25 28 29" stroke="#f59e0b" strokeWidth="1.4" strokeLinecap="round" fill="none" opacity="0.45" />
    </svg>
  );
}

/**
 * Layout dividido para páginas de autenticação.
 *
 * Props:
 *  - brandContent: JSX exibido no painel esquerdo (brand)
 *  - children: formulário exibido no painel direito
 */
function AuthLayout({ brandContent, children }) {
  const { pathname } = useLocation();
  const isLogin = pathname === '/login';

  return (
    <div className={styles.split}>
      {/* Painel de marca */}
      <div className={styles.brandPanel}>
        <div className={styles.brandContent}>
          <div className={styles.logo}>
            <LogoIcon />
            <span className={styles.logoText}>
              Event<span>Flow</span>
            </span>
          </div>
          {brandContent}
        </div>
        <div className={styles.brandFooter}>
          <p className={styles.brandFooterText}>
            Plataforma de Gestão de Eventos · ADS 2026
          </p>
        </div>
      </div>

      {/* Painel do formulário */}
      <div className={styles.formPanel}>
        {/* Toggle Login / Cadastro */}
        <div className={styles.authTabs}>
          <Link
            to="/login"
            className={`${styles.authTab} ${isLogin ? styles.authTabActive : ''}`}
          >
            Login
          </Link>
          <Link
            to="/register"
            className={`${styles.authTab} ${!isLogin ? styles.authTabActive : ''}`}
          >
            Cadastro
          </Link>
        </div>

        <div className={styles.formContainer}>{children}</div>
      </div>
    </div>
  );
}

export default AuthLayout;
