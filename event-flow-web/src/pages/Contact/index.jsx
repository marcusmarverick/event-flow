import AppLayout from '../../components/AppLayout';
import styles from './InfoPage.module.css';
import hero3 from '../../assets/images/landing/hero3.jpg';

const CONTACTS = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
    label: 'E-mail',
    value: 'contato@eventflow.com',
    hint: 'Resposta em até 48h',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
      </svg>
    ),
    label: 'GitHub',
    value: 'github.com/IanBraga96/event-flow',
    hint: 'Repositório do projeto',
    href: 'https://github.com/IanBraga96/event-flow',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    ),
    label: 'Projeto',
    value: 'Trabalho acadêmico — ADS',
    hint: 'Análise e Desenvolvimento de Sistemas',
  },
];

export default function Contact() {
  return (
    <AppLayout searchPlaceholder="Buscar eventos..." fixedContent>
      <div className={styles.hero}>
        <img src={hero3} alt="Contato" className={styles.heroImg} />
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <span className={styles.heroEyebrow}>
            <span className={styles.heroLine} />
            Fale conosco
          </span>
          <h1 className={styles.heroTitle}>
            Entre em <span className={styles.heroAccent}>contato</span>
          </h1>
          <p className={styles.heroSub}>
            Tem dúvidas, sugestões ou quer saber mais sobre o projeto? Fale com a gente!
          </p>
        </div>
      </div>

      <div className={styles.contactGrid}>
        {CONTACTS.map((c, i) => (
          <div key={i} className={styles.contactCard}>
            <div className={styles.contactIcon}>{c.icon}</div>
            <div className={styles.contactInfo}>
              <span className={styles.contactLabel}>{c.label}</span>
              {c.href
                ? <a href={c.href} target="_blank" rel="noreferrer" className={styles.contactValue}>{c.value}</a>
                : <span className={styles.contactValue}>{c.value}</span>
              }
              <span className={styles.contactHint}>{c.hint}</span>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.highlight} style={{ marginTop: '32px' }}>
        <div className={styles.highlightIcon}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="1.8" strokeLinecap="round">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
        </div>
        <div>
          <h3 className={styles.highlightTitle}>Este é um projeto acadêmico</h3>
          <p className={styles.highlightDesc}>
            O EventFlow foi desenvolvido como trabalho da faculdade no curso de ADS.
            Todas as funcionalidades são reais e o código está disponível no GitHub.
          </p>
        </div>
      </div>
    </AppLayout>
  );
}