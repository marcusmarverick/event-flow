import styles from './EventsHighlight.module.css';

const events = [
  {
    tag: 'Ao vivo',
    tagColor: 'live',
    title: 'Summit de Inovação 2025',
    meta: '15 Mar 2026 — São Paulo',
    org: 'TechBrasil',
    vagas: '120 vagas',
    img: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&q=80',
  },
  {
    tag: 'Próximo',
    tagColor: 'upcoming',
    title: 'Workshop de UX Design',
    meta: '22 Mar 2026 — Remoto',
    org: 'DesignHub',
    vagas: '80 vagas',
    img: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=500&q=80',
  },
  {
    tag: 'Próximo',
    tagColor: 'upcoming',
    title: 'Hackathon Dev Connect',
    meta: '30 Mar 2026 — BH',
    org: 'DevConnect',
    vagas: '70 vagas',
    img: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=500&q=80',
  },
  {
    tag: 'Finalizado',
    tagColor: 'done',
    title: 'Conferência de IA 2024',
    meta: '10 Fev 2026 — São Paulo',
    org: 'AIBrasil',
    vagas: 'Encerrado',
    img: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=500&q=80',
  },
  {
    tag: 'Próximo',
    tagColor: 'upcoming',
    title: 'Meetup de Startups',
    meta: '05 Abr 2026 — Rio de Janeiro',
    org: 'StartupRJ',
    vagas: '150 vagas',
    img: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=500&q=80',
  },
  {
    tag: 'Finalizado',
    tagColor: 'done',
    title: 'Festival de Design',
    meta: '20 Fev 2026 — Curitiba',
    org: 'DesignFest',
    vagas: 'Encerrado',
    img: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?w=500&q=80',
  },
  {
    tag: 'Próximo',
    tagColor: 'upcoming',
    title: 'Workshop de Liderança',
    meta: '18 Abr 2026 — Remoto',
    org: 'LeadAcademy',
    vagas: '60 vagas',
    img: 'https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=500&q=80',
  },
  {
    tag: 'Próximo',
    tagColor: 'upcoming',
    title: 'Bootcamp de Python',
    meta: '25 Abr 2025 — Remoto',
    org: 'CodeAcademy',
    vagas: '100 vagas',
    img: 'https://images.unsplash.com/photo-1526379879527-8559ecfcaec0?w=500&q=80',
  },
  {
    tag: 'Finalizado',
    tagColor: 'done',
    title: 'Encontro de Product Managers',
    meta: '01 Fev 2025 — São Paulo',
    org: 'PMHub',
    vagas: 'Encerrado',
    img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&q=80',
  },
  {
    tag: 'Próximo',
    tagColor: 'upcoming',
    title: 'Semana de Acessibilidade Digital',
    meta: '10 Mai 2025 — Remoto',
    org: 'A11yBrasil',
    vagas: '400 vagas',
    img: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=500&q=80',
  },
  {
    tag: 'Ao vivo',
    tagColor: 'live',
    title: 'Maratona de Data Science',
    meta: '15 Mar 2025 — Porto Alegre',
    org: 'DataSul',
    vagas: '180 vagas',
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&q=80',
  },
  {
    tag: 'Próximo',
    tagColor: 'upcoming',
    title: 'Fórum de Cibersegurança',
    meta: '30 Mai 2025 — Brasília',
    org: 'CyberBR',
    vagas: '250 vagas',
    img: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=500&q=80',
  },
];

function Card({ ev }) {
  return (
    <div className={styles.card}>
      <div className={styles.cardImgWrap}>
        <img src={ev.img} alt={ev.title} className={styles.cardImg} />
        <div className={styles.cardImgOverlay} />
        <span className={`${styles.cardTag} ${styles[`tag${ev.tagColor}`]}`}>
          {ev.tag}
        </span>
      </div>
      <div className={styles.cardInfo}>
        <div className={styles.cardInfoTop}>
          <h3 className={styles.cardTitle}>{ev.title}</h3>
          <span className={styles.cardArrow}>→</span>
        </div>
        <p className={styles.cardMeta}>{ev.meta}</p>
        <div className={styles.cardBottom}>
          <span className={styles.cardOrg}>{ev.org}</span>
          <span className={`${styles.cardVagas} ${ev.tagColor === 'done' ? styles.vagasDone : ''}`}>
            {ev.vagas}
          </span>
        </div>
      </div>
    </div>
  );
}

function EventsHighlight() {
  return (
    <section className={styles.section} id="eventos">
      <div className={styles.container}>

        {/* ── HEADER ── */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <span className={styles.eyebrow}>
              <span className={styles.eyebrowLine} />
              Events
            </span>
            <h2 className={styles.title}>EVENTOS ✦</h2>
            <span className={styles.hint}>Passe o mouse para pausar →</span>
          </div>
          <div className={styles.headerRight}>
            <span className={styles.totalNum}>{events.length}</span>
            <span className={styles.totalLabel}>eventos</span>
          </div>
        </div>

        {/* ── MARQUEE ── */}
        <div className={styles.marqueeWrap}>
          <div className={styles.fadeLeft} />
          <div className={styles.fadeRight} />
          <div className={styles.marqueeTrack}>
            {/* duplica os cards para loop infinito */}
            {[...events, ...events].map((ev, i) => (
              <Card key={i} ev={ev} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

export default EventsHighlight;