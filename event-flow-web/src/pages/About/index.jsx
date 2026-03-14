import AppLayout from '../../components/AppLayout';
import styles from './InfoPage.module.css';
import hero2 from '../../assets/images/landing/hero2.jpg';

const TEAM = [
  { name: 'Érika Laiane',  initials: 'EL', color: 'amber' },
  { name: 'Felipe Soares', initials: 'FS', color: 'teal'  },
  { name: 'Ian Braga',     initials: 'IB', color: 'amber'  },
  { name: 'João Pedro',    initials: 'JP', color: 'teal' },
  { name: 'Marcus Vinícius', initials: 'MV', color: 'amber' },
];

const VALUES = [
  { icon: '⚡', title: 'Simplicidade', desc: 'Interfaces limpas que qualquer pessoa consegue usar sem precisar de manual.' },
  { icon: '🔒', title: 'Segurança',    desc: 'Autenticação robusta e proteção de dados em todas as operações.' },
  { icon: '🎯', title: 'Foco no usuário', desc: 'Cada decisão de design foi tomada pensando em quem vai usar.' },
  { icon: '🚀', title: 'Performance',  desc: 'Código limpo e otimizado para uma experiência rápida e fluida.' },
];

export default function About() {
  return (
    <AppLayout searchPlaceholder="Buscar eventos...">
      <div className={styles.hero}>
        <img src={hero2} alt="Sobre nós" className={styles.heroImg} />
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <span className={styles.heroEyebrow}>
            <span className={styles.heroLine} />
            Nossa história
          </span>
          <h1 className={styles.heroTitle}>
            Sobre o <span className={styles.heroAccent}>EventFlow</span>
          </h1>
          <p className={styles.heroSub}>
            Um projeto acadêmico do curso de ADS que nasceu com a missão de simplificar
            a gestão e participação em eventos.
          </p>
        </div>
      </div>

      {/* Time */}
      <div className={styles.sectionTitle}>
        <h2>Quem fez isso acontecer</h2>
        <p>Cinco estudantes apaixonados por tecnologia</p>
      </div>

      <div className={styles.teamGrid}>
        {TEAM.map((member, i) => (
          <div key={i} className={styles.teamCard}>
            <div className={`${styles.teamAvatar} ${styles[`avatar_${member.color}`]}`}>
              {member.initials}
            </div>
            <span className={styles.teamName}>{member.name}</span>
          </div>
        ))}
      </div>

      {/* Valores */}
      <div className={styles.sectionTitle} style={{ marginTop: '40px' }}>
        <h2>Nossos valores</h2>
        <p>Princípios que guiaram cada linha de código</p>
      </div>

      <div className={styles.valuesGrid}>
        {VALUES.map((v, i) => (
          <div key={i} className={styles.valueCard}>
            <span className={styles.valueIcon}>{v.icon}</span>
            <h4 className={styles.valueTitle}>{v.title}</h4>
            <p className={styles.valueDesc}>{v.desc}</p>
          </div>
        ))}
      </div>
    </AppLayout>
  );
}