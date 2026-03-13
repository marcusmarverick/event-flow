import { useEffect, useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '../../components/AppLayout';
import { listEvents } from '../../services/eventService';
import styles from './Events.module.css';

import hero1 from '../../assets/images/landing/hero1.jpg';
import hero2 from '../../assets/images/landing/hero2.jpg';
import hero3 from '../../assets/images/landing/hero3.jpg';

const API_URL = process.env.REACT_APP_API_URL || '';
const HERO_IMAGES = [hero1, hero2, hero3];

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('pt-BR', {
    day: 'numeric', month: 'short', year: 'numeric',
  });
}

function formatTime(iso) {
  return new Date(iso).toLocaleTimeString('pt-BR', {
    hour: '2-digit', minute: '2-digit',
  });
}

function getStatus(iso) {
  const diff = (new Date(iso) - new Date()) / (1000 * 60 * 60);
  if (diff < 0)   return { label: 'Finalizado', key: 'done' };
  if (diff <= 24) return { label: 'Ao vivo',    key: 'live' };
  return           { label: 'Próximo',           key: 'upcoming' };
}

/* ── Card ── */
function EventCard({ event, onClick }) {
  const status = getStatus(event.dateTime);
  const img = event.image ? `${API_URL}${event.image}` : null;

  return (
    <div className={styles.card} onClick={() => onClick(event.id)}>
      <div className={styles.cardImg}>
        {img
          ? <img src={img} alt={event.name} />
          : <div className={styles.cardImgFallback}><span>📅</span></div>
        }
        <div className={styles.cardImgOverlay} />
        <span className={`${styles.badge} ${styles[`badge_${status.key}`]}`}>
          {status.label}
        </span>
      </div>

      <div className={styles.cardBody}>
        <h3 className={styles.cardTitle}>{event.name}</h3>
        {event.description && (
          <p className={styles.cardDesc}>{event.description}</p>
        )}

        <div className={styles.cardMeta}>
          <span className={styles.metaItem}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            {formatDate(event.dateTime)} · {formatTime(event.dateTime)}
          </span>
          <span className={styles.metaItem}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
            </svg>
            {event.location}
          </span>
        </div>

        <div className={styles.cardFooter}>
          <span className={`${styles.vagas} ${status.key === 'done' ? styles.vagasDone : ''}`}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
            {status.key === 'done' ? 'Encerrado' : `${event.capacity} vagas`}
          </span>
          <button className={styles.cardBtn}>Ver detalhes →</button>
        </div>
      </div>
    </div>
  );
}

const FILTERS = [
  { key: 'all',      label: 'Todos' },
  { key: 'upcoming', label: 'Próximos' },
  { key: 'live',     label: 'Ao vivo' },
  { key: 'done',     label: 'Finalizados' },
];

/* ── Página ── */
export default function Events() {
  const navigate = useNavigate();
  const [events, setEvents]     = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);
  const [search, setSearch]     = useState('');
  const [filter, setFilter]     = useState('all');
  const [heroIdx, setHeroIdx]   = useState(0);
  const [heroPaused, setHeroPaused] = useState(false);

  /* carrossel hero */
  useEffect(() => {
    if (heroPaused) return;
    const t = setInterval(() => setHeroIdx(i => (i + 1) % HERO_IMAGES.length), 4000);
    return () => clearInterval(t);
  }, [heroPaused]);

  useEffect(() => {
    listEvents()
      .then(({ events: data }) => setEvents(data))
      .catch(() => setError('Não foi possível carregar os eventos.'))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    return events.filter(ev => {
      const matchSearch = ev.name.toLowerCase().includes(search.toLowerCase()) ||
                          ev.location.toLowerCase().includes(search.toLowerCase());
      const matchFilter = filter === 'all' || getStatus(ev.dateTime).key === filter;
      return matchSearch && matchFilter;
    });
  }, [events, search, filter]);

  const counts = useMemo(() => ({
    all:      events.length,
    upcoming: events.filter(e => getStatus(e.dateTime).key === 'upcoming').length,
    live:     events.filter(e => getStatus(e.dateTime).key === 'live').length,
    done:     events.filter(e => getStatus(e.dateTime).key === 'done').length,
  }), [events]);

  return (
    <AppLayout
      onSearch={setSearch}
      searchValue={search}
      searchPlaceholder="Buscar por nome ou cidade..."
    >
      {/* ── Hero ── */}
      <div className={styles.hero}>
        {/* Orbs decorativos */}
        <div className={styles.heroOrb1} />
        <div className={styles.heroOrb2} />

        {/* Conteúdo esquerdo */}
        <div className={styles.heroContent}>
          <span className={styles.heroEyebrow}>
            <span className={styles.heroLine} />
            Plataforma de eventos
          </span>
          <h1 className={styles.heroTitle}>
            Descubra experiências<br />
            <span className={styles.heroAccent}>que inspiram</span>
          </h1>
          <p className={styles.heroSub}>
            Explore eventos de tecnologia, design, negócios e muito mais.
          </p>

          {/* Stats */}
          <div className={styles.heroStats}>
            <div className={styles.heroStat}>
              <span className={styles.heroStatNum}>{counts.all}</span>
              <span className={styles.heroStatLabel}>eventos</span>
            </div>
            <div className={styles.heroStatDivider} />
            <div className={styles.heroStat}>
              <span className={styles.heroStatNum}>{counts.upcoming}</span>
              <span className={styles.heroStatLabel}>próximos</span>
            </div>
            <div className={styles.heroStatDivider} />
            <div className={styles.heroStat}>
              <span className={styles.heroStatNum}>{counts.live}</span>
              <span className={styles.heroStatLabel}>ao vivo</span>
            </div>
          </div>
        </div>

        {/* Imagem carrossel direita */}
        <div
          className={styles.heroImgWrap}
          onMouseEnter={() => setHeroPaused(true)}
          onMouseLeave={() => setHeroPaused(false)}
        >
          {HERO_IMAGES.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`hero ${i + 1}`}
              className={`${styles.heroImg} ${i === heroIdx ? styles.heroImgActive : ''}`}
            />
          ))}
          <div className={styles.heroImgOverlay} />
          {/* Dots */}
          <div className={styles.heroDots}>
            {HERO_IMAGES.map((_, i) => (
              <button
                key={i}
                className={`${styles.heroDot} ${i === heroIdx ? styles.heroDotActive : ''}`}
                onClick={() => setHeroIdx(i)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── Filtros ── */}
      <div className={styles.filters}>
        {FILTERS.map(f => (
          <button
            key={f.key}
            className={`${styles.filterBtn} ${filter === f.key ? styles.filterBtnActive : ''}`}
            onClick={() => setFilter(f.key)}
          >
            {f.label}
            <span className={styles.filterCount}>{counts[f.key]}</span>
          </button>
        ))}
        <span className={styles.filterResult}>
          {!loading && `${filtered.length} resultado${filtered.length !== 1 ? 's' : ''}`}
        </span>
      </div>

      {/* ── Estados ── */}
      {loading && (
        <div className={styles.center}>
          <div className={styles.spinner} />
          <p>Carregando eventos...</p>
        </div>
      )}

      {error && !loading && (
        <div className={styles.center}>
          <span className={styles.stateIcon}>⚠️</span>
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && filtered.length === 0 && (
        <div className={styles.center}>
          <span className={styles.stateIcon}>🔍</span>
          <p className={styles.emptyTitle}>Nenhum evento encontrado</p>
          <p className={styles.emptyDesc}>Tente outro termo ou filtro</p>
        </div>
      )}

      {/* ── Grid ── */}
      {!loading && !error && filtered.length > 0 && (
        <div className={styles.grid}>
          {filtered.map(ev => (
            <EventCard
              key={ev.id}
              event={ev}
              onClick={id => navigate(`/events/${id}`)}
            />
          ))}
        </div>
      )}
    </AppLayout>
  );
}