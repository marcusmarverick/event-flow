import AppLayout from '../../components/AppLayout';
import styles from './InfoPage.module.css';
import hero1 from '../../assets/images/landing/hero1.jpg';

const STEPS = [
  {
    num: '01',
    title: 'Crie sua conta',
    desc: 'Cadastre-se como participante ou organizador em menos de um minuto. Sem burocracia.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
        <line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/>
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Explore os eventos',
    desc: 'Navegue pela listagem de eventos por categoria, data ou localização e encontre o que combina com você.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Inscreva-se',
    desc: 'Com um clique você se inscreve no evento. O sistema valida vagas disponíveis e conflitos de horário automaticamente.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
        <polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
    ),
  },
  {
    num: '04',
    title: 'Participe e conecte',
    desc: 'Acesse seus eventos inscritos, cancele quando necessário e conecte-se com outros participantes.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
];

export default function HowItWorks() {
  return (
    <AppLayout searchPlaceholder="Buscar eventos..." fixedContent>
      <div className={styles.hero}>
        <img src={hero1} alt="Como funciona" className={styles.heroImg} />
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <span className={styles.heroEyebrow}>
            <span className={styles.heroLine} />
            Guia da plataforma
          </span>
          <h1 className={styles.heroTitle}>
            Como funciona o <span className={styles.heroAccent}>EventFlow</span>
          </h1>
          <p className={styles.heroSub}>
            Simples, rápido e seguro. Veja como aproveitar tudo que a plataforma oferece.
          </p>
        </div>
      </div>

      <div className={styles.steps}>
        {STEPS.map((step, i) => (
          <div key={i} className={styles.stepCard}>
            <div className={styles.stepNum}>{step.num}</div>
            <div className={styles.stepIcon}>{step.icon}</div>
            <h3 className={styles.stepTitle}>{step.title}</h3>
            <p className={styles.stepDesc}>{step.desc}</p>
            {i < STEPS.length - 1 && <div className={styles.stepArrow}>→</div>}
          </div>
        ))}
      </div>

      <div className={styles.highlight}>
        <div className={styles.highlightIcon}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#14b8a6" strokeWidth="1.8" strokeLinecap="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
        </div>
        <div>
          <h3 className={styles.highlightTitle}>Segurança em primeiro lugar</h3>
          <p className={styles.highlightDesc}>
            Autenticação via Bearer Token, senhas com hash e validação de dados em todas as operações.
            Seus dados estão protegidos em cada etapa.
          </p>
        </div>
      </div>
    </AppLayout>
  );
}