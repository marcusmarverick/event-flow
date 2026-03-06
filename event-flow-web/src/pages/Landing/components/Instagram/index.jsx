import styles from './Instagram.module.css';

const photos = [
  'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&q=80',
  'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&q=80',
  'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400&q=80',
  'https://images.unsplash.com/photo-1511578314322-379afb476865?w=400&q=80',
  'https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=400&q=80',
  'https://images.unsplash.com/photo-1531058020387-3be344556be6?w=400&q=80',
];

function Instagram() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>

        <div className={styles.header}>
          <span className={styles.badge}>Redes Sociais</span>
          <h2 className={styles.title}>
            <span className={styles.accent}>#EventFlow</span> no Instagram
          </h2>
          <p className={styles.sub}>Acompanhe nossos eventos e novidades</p>
        </div>

        <div className={styles.grid}>
          {photos.map((src, i) => (
            <a
              key={i}
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className={styles.item}
            >
              <img src={src} alt={`Post ${i + 1}`} className={styles.img} />
              <div className={styles.overlay}>
                <span className={styles.overlayIcon}>♡</span>
              </div>
            </a>
          ))}
        </div>

        <div className={styles.cta}>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className={styles.ctaBtn}>
            <svg className={styles.ctaIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
            </svg>
            SIGA @eventflow
         </a>
        </div>

      </div>
    </section>
  );
}

export default Instagram;