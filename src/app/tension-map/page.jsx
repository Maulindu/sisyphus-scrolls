'use client';
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const PHILOSOPHERS = [
  { id: 'plato',     name: 'Plato',      year: '−428', x: 20, y: 25, color: '#818cf8', school: 'Idealism' },
  { id: 'aristotle', name: 'Aristotle',  year: '−384', x: 38, y: 40, color: '#34d399', school: 'Empiricism' },
  { id: 'kant',      name: 'Kant',       year: '1724', x: 60, y: 20, color: '#f472b6', school: 'Transcendentalism' },
  { id: 'hegel',     name: 'Hegel',      year: '1770', x: 75, y: 38, color: '#fb923c', school: 'Idealism' },
  { id: 'nietzsche', name: 'Nietzsche',  year: '1844', x: 80, y: 65, color: '#ef4444', school: 'Existentialism' },
  { id: 'descartes', name: 'Descartes',  year: '1596', x: 42, y: 65, color: '#06b6d4', school: 'Rationalism' },
  { id: 'hume',      name: 'Hume',       year: '1711', x: 55, y: 50, color: '#a3e635', school: 'Empiricism' },
  { id: 'socrates',  name: 'Socrates',   year: '−470', x: 15, y: 55, color: '#fbbf24', school: 'Dialectics' },
  { id: 'marx',      name: 'Marx',       year: '1818', x: 62, y: 78, color: '#f87171', school: 'Materialism' },
  { id: 'locke',     name: 'Locke',      year: '1632', x: 30, y: 78, color: '#4ade80', school: 'Empiricism' },
];

const TENSIONS = [
  { from: 'plato', to: 'aristotle', label: 'Forms vs. Matter', type: 'opposition', strength: 0.9,
    description: 'Plato held that true reality consists of perfect, eternal Forms. Aristotle rejected this — reality is the concrete world of substances, not an abstract realm beyond it.' },
  { from: 'kant', to: 'hume', label: 'Rationalism vs. Skepticism', type: 'response', strength: 0.85,
    description: "Hume's radical skepticism — that causation is just habit, not necessity — woke Kant from his \"dogmatic slumber\" and forced him to construct transcendental idealism as an answer." },
  { from: 'hegel', to: 'marx', label: 'Idealist vs. Material Dialectic', type: 'inversion', strength: 0.95,
    description: "Marx took Hegel's dialectic and 'stood it on its head': the real driver is material conditions, not the unfolding of Spirit." },
  { from: 'descartes', to: 'hume', label: 'Certainty vs. Doubt', type: 'opposition', strength: 0.8,
    description: 'Descartes sought unshakeable foundations through rational deduction. Hume dismantled this — the mind has no access to necessary truths, only probability from experience.' },
  { from: 'socrates', to: 'plato', label: 'Influence & Myth-making', type: 'influence', strength: 0.7,
    description: "Socrates wrote nothing. Everything we 'know' comes filtered through Plato — raising the question: is Socratic philosophy really Plato projecting his own ideas onto a martyr?" },
  { from: 'nietzsche', to: 'kant', label: 'Life vs. Pure Reason', type: 'opposition', strength: 0.85,
    description: "Nietzsche saw Kant's categorical imperative as life-denying — a slave morality dressed in philosophical clothes. True values must be created by vital individuals, not derived from reason." },
  { from: 'locke', to: 'kant', label: 'Empiricism vs. Apriorism', type: 'response', strength: 0.75,
    description: "Locke argued the mind is a blank slate. Kant countered: some knowledge (space, time, causation) is a priori — the mind actively structures reality, not passively receives it." },
  { from: 'nietzsche', to: 'hegel', label: 'Eternal Return vs. Progress', type: 'opposition', strength: 0.8,
    description: 'Hegel saw history as progressive — Spirit realizing itself. Nietzsche demolished teleological history: existence is cyclical, meaningless, a test of will.' },
  { from: 'aristotle', to: 'locke', label: 'Empirical Lineage', type: 'influence', strength: 0.6,
    description: "Locke's empiricism descends from Aristotelian natural philosophy — knowledge begins in the senses, not in innate ideas." },
];

const TENSION_COLORS = {
  opposition: '#ef4444',
  response:   '#60a5fa',
  inversion:  '#a78bfa',
  influence:  '#fbbf24',
};

const TENSION_LABELS = {
  opposition: 'Direct Opposition',
  response:   'Response / Reaction',
  inversion:  'Inversion',
  influence:  'Lineage / Influence',
};

function getP(id) { return PHILOSOPHERS.find(p => p.id === id); }

export default function TensionMap() {
  const [selected, setSelected]   = useState(null);
  const [hovered,  setHovered]    = useState(null);  // node id
  const [filter,   setFilter]     = useState('all');

  const visible = TENSIONS.filter(t => filter === 'all' || t.type === filter);

  const nodeHighlighted = (id) => {
    if (!hovered && !selected) return true;
    if (selected) return selected.from === id || selected.to === id;
    return visible.some(t => (t.from === hovered || t.to === hovered) && (t.from === id || t.to === id)) || hovered === id;
  };

  const edgeHighlighted = (t) => {
    if (!hovered && !selected) return true;
    if (selected) return selected === t;
    return t.from === hovered || t.to === hovered;
  };

  return (
    <div style={S.page}>
      {/* ── Header ── */}
      <div style={S.header}>
        <Link href="/" style={S.back}>← Timeline</Link>
        <div>
          <h1 style={S.title}>Tension Map</h1>
          <p style={S.subtitle}>Philosophical conflicts, lineages & inversions across history</p>
        </div>
      </div>

      {/* ── Filters ── */}
      <div style={S.filters}>
        {['all', ...Object.keys(TENSION_COLORS)].map(type => {
          const active = filter === type;
          return (
            <button
              key={type}
              onClick={() => setFilter(type)}
              style={{
                ...S.filterBtn,
                ...(active ? {
                  background: type === 'all' ? 'rgba(255,255,255,0.1)' : `${TENSION_COLORS[type]}18`,
                  borderColor: type === 'all' ? 'rgba(255,255,255,0.3)' : TENSION_COLORS[type],
                  color: type === 'all' ? '#e2e8f0' : TENSION_COLORS[type],
                } : {}),
              }}
            >
              {type !== 'all' && (
                <span style={{ ...S.dot, background: TENSION_COLORS[type] }} />
              )}
              {type === 'all' ? 'All' : TENSION_LABELS[type]}
            </button>
          );
        })}
      </div>

      {/* ── Layout ── */}
      <div style={S.layout}>

        {/* SVG Graph */}
        <div style={S.mapWrap}>
          <svg viewBox="0 0 100 100" style={S.svg} preserveAspectRatio="xMidYMid meet">
            <defs>
              {Object.entries(TENSION_COLORS).map(([type, color]) => (
                <marker key={type} id={`arr-${type}`} viewBox="0 0 10 10"
                  refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                  <path d="M0 0 L10 5 L0 10z" fill={color} opacity="0.85" />
                </marker>
              ))}
              <filter id="glow">
                <feGaussianBlur stdDeviation="0.6" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
              <filter id="nodeGlow">
                <feGaussianBlur stdDeviation="1" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>

            {/* Subtle grid */}
            {[20,40,60,80].map(v => (
              <g key={v} opacity="0.04">
                <line x1={v} y1="0" x2={v} y2="100" stroke="#94a3b8" strokeWidth="0.3" />
                <line x1="0" y1={v} x2="100" y2={v} stroke="#94a3b8" strokeWidth="0.3" />
              </g>
            ))}

            {/* Edges */}
            {visible.map((t, i) => {
              const from = getP(t.from), to = getP(t.to);
              if (!from || !to) return null;
              const color = TENSION_COLORS[t.type];
              const lit   = edgeHighlighted(t);
              const sel   = selected === t;
              const mx = (from.x + to.x) / 2;
              const my = (from.y + to.y) / 2;

              return (
                <g key={i} onClick={() => setSelected(sel ? null : t)} style={{ cursor: 'pointer' }}>
                  {/* Wide invisible hit area */}
                  <line x1={from.x} y1={from.y} x2={to.x} y2={to.y}
                    stroke="transparent" strokeWidth="4" />
                  {/* Visible line */}
                  <line x1={from.x} y1={from.y} x2={to.x} y2={to.y}
                    stroke={color}
                    strokeWidth={sel ? 0.7 : lit ? 0.45 : 0.12}
                    opacity={lit ? Math.min(t.strength + 0.1, 1) : 0.08}
                    strokeDasharray={t.type === 'influence' ? '1.8,1' : undefined}
                    markerEnd={`url(#arr-${t.type})`}
                    filter={sel ? 'url(#glow)' : undefined}
                    style={{ transition: 'stroke-width 0.2s, opacity 0.2s' }}
                  />
                  {/* Edge label */}
                  {lit && !sel && (
                    <text x={mx} y={my - 1.5} textAnchor="middle"
                      fill={color} fontSize="1.6" fontFamily="JetBrains Mono, monospace"
                      style={{ pointerEvents: 'none' }} opacity="0.85">
                      {t.label}
                    </text>
                  )}
                </g>
              );
            })}

            {/* Nodes */}
            {PHILOSOPHERS.map(p => {
              const lit = nodeHighlighted(p.id);
              const ish = hovered === p.id;
              return (
                <g key={p.id}
                  onMouseEnter={() => setHovered(p.id)}
                  onMouseLeave={() => setHovered(null)}
                  style={{ cursor: 'pointer' }}
                  onClick={() => setSelected(null)}
                >
                  {/* Glow ring */}
                  <circle cx={p.x} cy={p.y} r={ish ? 5.5 : 4.5}
                    fill="none" stroke={p.color} strokeWidth="0.35"
                    opacity={lit ? (ish ? 0.6 : 0.3) : 0.06}
                    style={{ transition: 'all 0.25s' }} />
                  {/* Main node */}
                  <circle cx={p.x} cy={p.y} r={ish ? 3.2 : 2.6}
                    fill={p.color}
                    opacity={lit ? (ish ? 1 : 0.85) : 0.15}
                    filter={ish ? 'url(#nodeGlow)' : undefined}
                    style={{ transition: 'all 0.25s' }} />
                  {/* Inner dot */}
                  <circle cx={p.x} cy={p.y} r="0.9"
                    fill="#050d1a" opacity={lit ? 0.9 : 0.2}
                    style={{ transition: 'all 0.25s' }} />
                  {/* Name */}
                  <text x={p.x} y={p.y + 5.8} textAnchor="middle"
                    fill={p.color} fontSize="2.1" fontFamily="IM Fell English, serif"
                    opacity={lit ? 0.95 : 0.15} style={{ transition: 'opacity 0.25s' }}>
                    {p.name}
                  </text>
                  {/* Year */}
                  <text x={p.x} y={p.y + 7.8} textAnchor="middle"
                    fill="#64748b" fontSize="1.4" fontFamily="JetBrains Mono, monospace"
                    opacity={lit ? 0.7 : 0.1} style={{ transition: 'opacity 0.25s' }}>
                    {p.year}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Side Panel */}
        <div style={S.panel}>
          <AnimatePresence mode="wait">
            {selected ? (
              <motion.div key="detail"
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }} style={S.detail}>
                <button onClick={() => setSelected(null)} style={S.backBtn}>← back</button>

                <div style={{ ...S.typeTag, color: TENSION_COLORS[selected.type] }}>
                  {TENSION_LABELS[selected.type]}
                </div>

                <h2 style={S.detailLabel}>{selected.label}</h2>

                <div style={S.participants}>
                  <span style={{ color: getP(selected.from)?.color, fontStyle: 'italic' }}>
                    {getP(selected.from)?.name}
                  </span>
                  <span style={S.arrow}>⟶</span>
                  <span style={{ color: getP(selected.to)?.color, fontStyle: 'italic' }}>
                    {getP(selected.to)?.name}
                  </span>
                </div>

                <div style={S.strengthRow}>
                  <span style={S.strengthLabel}>Intensity</span>
                  <div style={S.bar}>
                    <motion.div style={{
                      ...S.barFill,
                      background: TENSION_COLORS[selected.type],
                    }}
                      initial={{ width: 0 }}
                      animate={{ width: `${selected.strength * 100}%` }}
                      transition={{ duration: 0.6, ease: [0.22,1,0.36,1] }}
                    />
                  </div>
                  <span style={S.strengthPct}>{Math.round(selected.strength * 100)}%</span>
                </div>

                <p style={S.desc}>{selected.description}</p>
              </motion.div>
            ) : (
              <motion.div key="list"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>

                <p style={S.panelHint}>Click any edge to explore a tension</p>

                {/* Legend */}
                <div style={S.legendBlock}>
                  {Object.entries(TENSION_COLORS).map(([type, color]) => (
                    <div key={type} style={S.legendRow}>
                      <div style={{
                        ...S.legendLine,
                        background: type === 'influence'
                          ? `repeating-linear-gradient(90deg,${color} 0,${color} 6px,transparent 6px,transparent 10px)`
                          : color,
                      }} />
                      <span style={S.legendText}>{TENSION_LABELS[type]}</span>
                    </div>
                  ))}
                </div>

                {/* List */}
                <div style={S.listItems}>
                  {visible.map((t, i) => (
                    <motion.button key={i}
                      onClick={() => setSelected(t)}
                      style={{ ...S.listItem, borderLeftColor: TENSION_COLORS[t.type] }}
                      whileHover={{ x: 4, background: 'rgba(255,255,255,0.04)' }}
                      transition={{ duration: 0.15 }}>
                      <div style={S.listTitle}>{t.label}</div>
                      <div style={S.listSub}>
                        <span style={{ color: getP(t.from)?.color }}>{getP(t.from)?.name}</span>
                        <span style={{ color: '#334155' }}> × </span>
                        <span style={{ color: getP(t.to)?.color }}>{getP(t.to)?.name}</span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

/* ── Styles ── */
const S = {
  page: {
    minHeight: '100vh',
    background: '#080c14',
    color: '#e2e8f0',
    fontFamily: "'Crimson Pro', 'IM Fell English', serif",
    padding: '1rem 1.25rem 1.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    boxSizing: 'border-box',
  },
  header: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '1.5rem',
    paddingBottom: '1rem',
    borderBottom: '1px solid rgba(251,191,36,0.12)',
  },
  back: {
    fontFamily: 'JetBrains Mono, monospace',
    fontSize: '0.68rem',
    letterSpacing: '0.1em',
    color: 'rgba(251,191,36,0.55)',
    textDecoration: 'none',
    padding: '0.45rem 0.9rem',
    border: '1px solid rgba(251,191,36,0.2)',
    borderRadius: 3,
    whiteSpace: 'nowrap',
    marginTop: 4,
    transition: 'color 0.2s, border-color 0.2s',
    display: 'inline-block',
  },
  title: {
    margin: 0,
    fontSize: 'clamp(1.8rem,3vw,2.5rem)',
    fontWeight: 400,
    background: 'linear-gradient(135deg,#fde68a,#f59e0b)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    lineHeight: 1.1,
  },
  subtitle: {
    margin: '0.3rem 0 0',
    fontSize: '0.88rem',
    fontStyle: 'italic',
    color: '#64748b',
    fontFamily: 'system-ui, sans-serif',
  },
  filters: {
    display: 'flex',
    gap: '0.5rem',
    flexWrap: 'wrap',
  },
  filterBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.4rem',
    padding: '0.35rem 0.8rem',
    fontFamily: 'JetBrains Mono, monospace',
    fontSize: '0.62rem',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    background: 'transparent',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 3,
    color: '#64748b',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  dot: {
    width: 6, height: 6, borderRadius: '50%', display: 'inline-block', flexShrink: 0,
  },
  layout: {
    display: 'grid',
    gridTemplateColumns: '1fr 300px',
    gap: '1rem',
    flex: 1,
    minHeight: 0,
    height: 'calc(100vh - 180px)',
  },
  mapWrap: {
    background: 'rgba(255,255,255,0.018)',
    border: '1px solid rgba(255,255,255,0.06)',
    borderRadius: 6,
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  svg: {
    width: '100%',
    height: '100%',
    display: 'block',
  },
  panel: {
    background: 'rgba(255,255,255,0.018)',
    border: '1px solid rgba(255,255,255,0.06)',
    borderRadius: 6,
    overflowY: 'auto',
    padding: '1.25rem',
  },
  panelHint: {
    fontFamily: 'JetBrains Mono, monospace',
    fontSize: '0.62rem',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: '#334155',
    marginTop: 0,
    marginBottom: '1.25rem',
  },
  legendBlock: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    marginBottom: '1.5rem',
    paddingBottom: '1.25rem',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
  },
  legendRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.7rem',
  },
  legendLine: {
    width: 24,
    height: 2,
    borderRadius: 1,
    flexShrink: 0,
  },
  legendText: {
    fontSize: '0.78rem',
    color: '#64748b',
    fontFamily: 'system-ui, sans-serif',
  },
  listItems: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.3rem',
  },
  listItem: {
    width: '100%',
    textAlign: 'left',
    padding: '0.7rem 0.75rem',
    background: 'transparent',
    border: 'none',
    borderLeft: '2px solid transparent',
    cursor: 'pointer',
    borderRadius: '0 3px 3px 0',
  },
  listTitle: {
    fontFamily: "'IM Fell English', serif",
    fontSize: '0.95rem',
    color: '#e2e8f0',
    marginBottom: '0.2rem',
  },
  listSub: {
    fontFamily: 'JetBrains Mono, monospace',
    fontSize: '0.62rem',
    letterSpacing: '0.04em',
  },
  // Detail styles
  detail: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  backBtn: {
    background: 'none',
    border: 'none',
    fontFamily: 'JetBrains Mono, monospace',
    fontSize: '0.62rem',
    letterSpacing: '0.1em',
    color: '#475569',
    cursor: 'pointer',
    padding: 0,
    textAlign: 'left',
    transition: 'color 0.2s',
  },
  typeTag: {
    fontFamily: 'JetBrains Mono, monospace',
    fontSize: '0.62rem',
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
  },
  detailLabel: {
    fontFamily: "'IM Fell English', serif",
    fontSize: '1.55rem',
    fontWeight: 400,
    color: '#f8fafc',
    lineHeight: 1.2,
    margin: 0,
  },
  participants: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.7rem',
    fontFamily: "'IM Fell English', serif",
    fontSize: '1.05rem',
  },
  arrow: { color: '#334155' },
  strengthRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.6rem',
    fontFamily: 'JetBrains Mono, monospace',
    fontSize: '0.62rem',
    color: '#475569',
    letterSpacing: '0.04em',
  },
  strengthLabel: { flexShrink: 0 },
  bar: {
    flex: 1,
    height: 3,
    background: 'rgba(255,255,255,0.08)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 2,
  },
  strengthPct: { flexShrink: 0 },
  desc: {
    fontSize: '1rem',
    lineHeight: 1.75,
    color: '#94a3b8',
    fontStyle: 'italic',
    paddingTop: '0.75rem',
    borderTop: '1px solid rgba(255,255,255,0.06)',
    margin: 0,
  },
};