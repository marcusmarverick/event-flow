import AppLayout from '../../components/AppLayout';
import { useAuth } from '../../hooks/useAuth';
import styles from './InfoPage.module.css';
import hero1 from '../../assets/images/landing/hero1.jpg';

const STEPS_PARTICIPANT = [
  {
    num: '01',
    title: 'Crie sua conta',
    desc: 'Cadastre-se como participante em menos de um minuto. Só nome, e-mail, CPF e senha.',
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
    desc: 'Navegue pela listagem de eventos, filtre por status e encontre o que combina com você.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Inscreva-se',
    desc: 'Com um clique você se inscreve no evento. O sistema valida vagas disponíveis automaticamente.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
        <polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
    ),
  },
  {
    num: '04',
    title: 'Gerencie suas inscrições',
    desc: 'Acompanhe todos os eventos em que está inscrito e cancele quando necessário.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <rect x="3" y="4" width="18" height="18" rx="2"/>
        <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
    ),
  },
];

const STEPS_ORGANIZER = [
  {
    num: '01',
    title: 'Crie sua conta',
    desc: 'Cadastre-se como organizador em menos de um minuto. Só nome, e-mail e senha.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
        <line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/>
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Crie seu evento',
    desc: 'Preencha nome, descrição, data, local, capacidade e adicione uma imagem de capa.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Gerencie inscrições',
    desc: 'Acompanhe quantas vagas foram preenchidas e edite os detalhes do evento quando necessário.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  {
    num: '04',
    title: 'Publique e divulgue',
    desc: 'Seu evento fica visível para todos os participantes da plataforma assim que criado.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
  },
];

export default function HowItWorks() {
  const { user } = useAuth();
  const isOrganizer = user?.type === 'organizer';
  const steps = isOrganizer ? STEPS_ORGANIZER : STEPS_PARTICIPANT;

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
            {isOrganizer
              ? 'Crie e gerencie seus eventos de forma simples e rápida.'
              : 'Simples, rápido e seguro. Veja como aproveitar tudo que a plataforma oferece.'
            }
          </p>
        </div>
      </div>

      {/* Badge do tipo */}
      <div className={styles.typeTag}>
        <span className={isOrganizer ? styles.typeTagOrg : styles.typeTagPart}>
          {isOrganizer ? '🎤 Guia do Organizador' : '🎟️ Guia do Participante'}
        </span>
      </div>

      <div className={styles.steps}>
        {steps.map((step, i) => (
          <div key={i} className={styles.stepCard}>
            <div className={styles.stepNum}>{step.num}</div>
            <div className={styles.stepIcon}>{step.icon}</div>
            <h3 className={styles.stepTitle}>{step.title}</h3>
            <p className={styles.stepDesc}>{step.desc}</p>
            {i < steps.length - 1 && <div className={styles.stepArrow}>→</div>}
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
            Autenticação via Bearer Token e senhas com hash em todas as operações.
            Seus dados estão protegidos em cada etapa.
          </p>
        </div>
      </div>
    </AppLayout>
  );
}