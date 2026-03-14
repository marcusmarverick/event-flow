import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { getEvent, deleteEvent } from '../../services/eventService';
import AppLayout from '../../components/AppLayout';
import styles from './EventDetails.module.css';

const API_URL = process.env.REACT_APP_API_URL || '';

/* ── Contador regressivo ── */
function Countdown({ dateTime }) {
  const [time, setTime] = useState(getTimeLeft(dateTime));

  function getTimeLeft(iso) {
    const diff = new Date(iso) - new Date();
    if (diff <= 0) return null;
    const days    = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours   = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    return { days, hours, minutes, seconds };
  }

  useEffect(() => {
    const t = setInterval(() => setTime(getTimeLeft(dateTime)), 1000);
    return () => clearInterval(t);
  }, [dateTime]);

  if (!time) return (
    <div className={styles.countdownDone}>
      <span>🎯</span> Evento encerrado
    </div>
  );

  const units = [
    { label: 'dias',     value: time.days },
    { label: 'horas',    value: time.hours },
    { label: 'minutos',  value: time.minutes },
    { label: 'segundos', value: time.seconds },
  ];

  return (
    <div className={styles.countdown}>
      <span className={styles.countdownLabel}>⏱ Faltam</span>
      <div className={styles.countdownUnits}>
        {units.map((u, i) => (
          <div key={i} className={styles.countdownUnit}>
            <span className={styles.countdownNum}>
              {String(u.value).padStart(2, '0')}
            </span>
            <span className={styles.countdownUnitLabel}>{u.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Delete Modal ── */
function DeleteModal({ eventName, onClose, onConfirm, loading }) {
  return (
    <div className={styles.modalOverlay} onClick={e => e.target === e.currentTarget && onClose()}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Excluir evento</h2>
          <button className={styles.modalClose} onClick={onClose}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
        <p className={styles.confirmText}>
          Tem certeza que deseja excluir <strong>{eventName}</strong>? Esta ação não pode ser desfeita.
        </p>
        <div className={styles.confirmFooter}>
          <button className={styles.btnCancel} onClick={onClose}>Cancelar</button>
          <button className={styles.btnDanger} onClick={onConfirm} disabled={loading}>
            {loading ? <span className={styles.spinnerSmall} /> : 'Excluir evento'}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Página principal ── */
export default function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [event, setEvent]         = useState(null);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState(null);
  const [deleting, setDeleting]   = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  useEffect(() => {
    getEvent(id)
      .then(({ event: data }) => setEvent(data))
      .catch(() => setError('Evento não encontrado.'))
      .finally(() => setLoading(false));
  }, [id]);

  async function handleDelete() {
    setDeleting(true);
    try {
      await deleteEvent(id);
      navigate('/organizer/events', { replace: true });
    } catch {
      setDeleting(false);
      setShowDelete(false);
    }
  }

  if (loading) return (
    <AppLayout>
      <div className={styles.center}>
        <div className={styles.spinner} />
        <p>Carregando evento...</p>
      </div>
    </AppLayout>
  );

  if (error || !event) return (
    <AppLayout>
      <div className={styles.center}>
        <span className={styles.stateIcon}>😕</span>
        <p>{error || 'Evento não encontrado.'}</p>
        <button className={styles.btnBack} onClick={() => navigate('/events')}>
          ← Voltar aos eventos
        </button>
      </div>
    </AppLayout>
  );

  const isOrganizer     = user?.type === 'organizer';
  const isCreator       = isOrganizer && String(event.userId) === String(user?.id);
  const isPast          = new Date(event.dateTime) < new Date();
  const img             = event.image ? `${API_URL}${event.image}` : null;

  function formatDate(iso) {
    return new Date(iso).toLocaleDateString('pt-BR', {
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
    });
  }

  function formatTime(iso) {
    return new Date(iso).toLocaleTimeString('pt-BR', {
      hour: '2-digit', minute: '2-digit',
    });
  }

  return (
    <AppLayout searchPlaceholder="Buscar eventos...">

      {/* ── Botão voltar ── */}
      <button className={styles.btnBack} onClick={() => navigate(-1)}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <polyline points="15 18 9 12 15 6"/>
        </svg>
        Voltar
      </button>

      {/* ── Hero com imagem ── */}
      <div className={styles.hero}>
        {img
          ? <img src={img} alt={event.name} className={styles.heroImg} />
          : <div className={styles.heroImgFallback}>📅</div>
        }
        <div className={styles.heroOverlay} />

        {/* Badge status */}
        <span className={`${styles.heroBadge} ${styles[`badge_${isPast ? 'done' : 'upcoming'}`]}`}>
          {isPast ? 'Finalizado' : 'Próximo'}
        </span>

        {/* Título sobre a imagem */}
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>{event.name}</h1>
          {event.user?.name && (
            <p className={styles.heroOrg}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
              </svg>
              Organizado por {event.user.name}
            </p>
          )}
        </div>
      </div>

      {/* ── Contador regressivo ── */}
      {!isPast && <Countdown dateTime={event.dateTime} />}

      {/* ── Grid principal ── */}
      <div className={styles.grid}>

        {/* Coluna esquerda — infos */}
        <div className={styles.infoCol}>

          {/* Descrição */}
          {event.description && (
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.cardDot} />
                <span className={styles.cardLabel}>SOBRE O EVENTO</span>
              </div>
              <p className={styles.description}>{event.description}</p>
            </div>
          )}

          {/* Data, local e vagas */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.cardDot} />
              <span className={styles.cardLabel}>DETALHES</span>
            </div>
            <div className={styles.detailsList}>
              <div className={styles.detailItem}>
                <div className={styles.detailIcon}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <rect x="3" y="4" width="18" height="18" rx="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                </div>
                <div className={styles.detailText}>
                  <span className={styles.detailLabel}>Data</span>
                  <span className={styles.detailValue}>{formatDate(event.dateTime)}</span>
                </div>
              </div>

              <div className={styles.detailItem}>
                <div className={styles.detailIcon}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                </div>
                <div className={styles.detailText}>
                  <span className={styles.detailLabel}>Horário</span>
                  <span className={styles.detailValue}>{formatTime(event.dateTime)}</span>
                </div>
              </div>

              <div className={styles.detailItem}>
                <div className={styles.detailIcon}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <div className={styles.detailText}>
                  <span className={styles.detailLabel}>Local</span>
                  <span className={styles.detailValue}>{event.location}</span>
                </div>
              </div>

              <div className={styles.detailItem}>
                <div className={styles.detailIcon}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                </div>
                <div className={styles.detailText}>
                  <span className={styles.detailLabel}>Capacidade</span>
                  <span className={styles.detailValue}>{event.capacity} vagas</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Coluna direita — ações */}
        <div className={styles.actionCol}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.cardDot} />
              <span className={styles.cardLabel}>
                {isCreator ? 'GERENCIAR EVENTO' : 'PARTICIPAR'}
              </span>
            </div>

            {isCreator ? (
              /* Organizador criador */
              <div className={styles.actionsWrap}>
                <p className={styles.actionHint}>Você é o organizador deste evento.</p>

                {/* Botão participantes — placeholder por enquanto */}
                <button className={styles.btnParticipants} disabled>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                  Ver participantes
                  <span className={styles.comingSoon}>em breve</span>
                </button>

                <button
                  className={styles.btnEdit}
                  onClick={() => navigate('/organizer/events')}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                  </svg>
                  Editar evento
                </button>

                <button className={styles.btnDelete} onClick={() => setShowDelete(true)}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <polyline points="3 6 5 6 21 6"/>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                  </svg>
                  Excluir evento
                </button>
              </div>
            ) : isPast ? (
              /* Evento encerrado */
              <div className={styles.actionsWrap}>
                <p className={styles.actionHint}>Este evento já foi encerrado.</p>
                <button className={styles.btnDisabled} disabled>Inscrições encerradas</button>
              </div>
            ) : (
              /* Participante ou organizador não-criador */
              <div className={styles.actionsWrap}>
                <p className={styles.actionHint}>
                  Garanta sua vaga neste evento!
                </p>
                {/* Botão inscrição — placeholder até endpoint estar disponível */}
                <button className={styles.btnEnroll} disabled>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                  Inscrever-se
                  <span className={styles.comingSoon}>em breve</span>
                </button>
                <p className={styles.vagasInfo}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
                  </svg>
                  {event.capacity} vagas disponíveis
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Modal excluir ── */}
      {showDelete && (
        <DeleteModal
          eventName={event.name}
          onClose={() => setShowDelete(false)}
          onConfirm={handleDelete}
          loading={deleting}
        />
      )}
    </AppLayout>
  );
}