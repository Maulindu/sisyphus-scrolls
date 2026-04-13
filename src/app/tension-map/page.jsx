'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const PHILOSOPHERS = [
  { id: 'plato', name: 'Plato', year: '-428', x: 20, y: 25, color: '#818cf8', school: 'Idealism' },
  { id: 'aristotle', name: 'Aristotle', year: '-384', x: 38, y: 40, color: '#34d399', school: 'Empiricism' },
  { id: 'kant', name: 'Kant', year: '1724', x: 60, y: 20, color: '#f472b6', school: 'Transcendentalism' },
  { id: 'hegel', name: 'Hegel', year: '1770', x: 75, y: 38, color: '#fb923c', school: 'Idealism' },
  { id: 'nietzsche', name: 'Nietzsche', year: '1844', x: 80, y: 65, color: '#ef4444', school: 'Existentialism' },
  { id: 'descartes', name: 'Descartes', year: '1596', x: 42, y: 65, color: '#06b6d4', school: 'Rationalism' },
  { id: 'hume', name: 'Hume', year: '1711', x: 55, y: 50, color: '#a3e635', school: 'Empiricism' },
  { id: 'socrates', name: 'Socrates', year: '-470', x: 15, y: 55, color: '#fbbf24', school: 'Dialectics' },
  { id: 'marx', name: 'Marx', year: '1818', x: 62, y: 78, color: '#f87171', school: 'Materialism' },
  { id: 'locke', name: 'Locke', year: '1632', x: 30, y: 78, color: '#4ade80', school: 'Empiricism' },
];

const TENSIONS = [
  {
    from: 'plato', to: 'aristotle',
    label: 'Forms vs. Matter',
    description: 'Plato held that true reality consists of perfect, eternal Forms. Aristotle rejected this — reality is the concrete world of substances, not an abstract realm beyond it.',
    strength: 0.9, type: 'opposition',
  },
  {
    from: 'kant', to: 'hume',
    label: 'Rationalism vs. Skepticism',
    description: "Hume's radical skepticism — that causation is just habit, not necessity — woke Kant from his \"dogmatic slumber\" and forced him to construct transcendental idealism as an answer.",
    strength: 0.85, type: 'response',
  },
  {
    from: 'hegel', to: 'marx',
    label: 'Idealist vs. Material Dialectic',
    description: "Marx took Hegel's dialectic — the engine of history through contradiction — but 'stood it on its head': the real driver is material conditions, not the unfolding of Spirit.",
    strength: 0.95, type: 'inversion',
  },
  {
    from: 'descartes', to: 'hume',
    label: 'Certainty vs. Doubt',
    description: 'Descartes sought unshakeable foundations through rational deduction. Hume dismantled this — the mind has no access to necessary truths, only probability from experience.',
    strength: 0.8, type: 'opposition',
  },
  {
    from: 'socrates', to: 'plato',
    label: 'Influence & Myth-making',
    description: "Socrates wrote nothing. Everything we 'know' comes filtered through Plato, raising the question: is Socratic philosophy Socrates' — or Plato projecting his own ideas onto a martyr?",
    strength: 0.7, type: 'influence',
  },
  {
    from: 'nietzsche', to: 'kant',
    label: 'Life vs. Pure Reason',
    description: "Nietzsche saw Kant's categorical imperative as life-denying — a slave morality dressed in philosophical clothes. True values must be created by vital individuals, not derived from reason.",
    strength: 0.85, type: 'opposition',
  },
  {
    from: 'locke', to: 'kant',
    label: 'Empiricism vs. Apriorism',
    description: "Locke argued the mind is a blank slate. Kant countered: some knowledge (space, time, causation) is a priori — the mind doesn't receive reality passively but actively structures it.",
    strength: 0.75, type: 'response',
  },
  {
    from: 'nietzsche', to: 'hegel',
    label: 'Eternal Return vs. Progress',
    description: 'Hegel saw history as progressive — Spirit realizing itself through time. Nietzsche demolished teleological history: existence is cyclical, meaningless, a test of will.',
    strength: 0.8, type: 'opposition',
  },
  {
    from: 'aristotle', to: 'locke',
    label: 'Empirical Lineage',
    description: "Locke's empiricism descends from Aristotelian natural philosophy — knowledge begins in the senses, not in innate ideas. Aristotle's influence runs deep through British empiricism.",
    strength: 0.6, type: 'influence',
  },
];

const TENSION_COLORS = {
  opposition: '#ef4444',
  response: '#60a5fa',
  inversion: '#a78bfa',
  influence: '#fbbf24',
};

const TENSION_LABELS = {
  opposition: 'Direct Opposition',
  response: 'Response / Reaction',
  inversion: 'Inversion',
  influence: 'Lineage / Influence',
};

export default function TensionMap() {
  const [selectedTension, setSelectedTension] = useState(null);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [filter, setFilter] = useState('all');
  const svgRef = useRef(null);

  const visibleTensions = TENSIONS.filter(t =>
    filter === 'all' || t.type === filter
  );

  const getPhilosopher = (id) => PHILOSOPHERS.find(p => p.id === id);

  const isNodeHighlighted = (nodeId) => {
    if (!hoveredNode && !selectedTension) return true;
    if (hoveredNode === nodeId) return true;
    if (selectedTension) {
      return selectedTension.from === nodeId || selectedTension.to === nodeId;
    }
    // Dim nodes not connected to hovered
    return visibleTensions.some(t => (t.from === hoveredNode || t.to === hoveredNode) && (t.from === nodeId || t.to === nodeId));
  };

  const isTensionHighlighted = (tension) => {
    if (!hoveredNode && !selectedTension) return true;
    if (selectedTension) return selectedTension === tension;
    return tension.from === hoveredNode || tension.to === hoveredNode;
  };

  return (
    <div className="tension-page">
      {/* Header */}
      <div className="tension-header">
        <Link href="/" className="tension-back">← Timeline</Link>
        <div>
          <h1 className="tension-title">Tension Map</h1>
          <p className="tension-subtitle">Philosophical conflicts, lineages & inversions across history</p>
        </div>
      </div>

      {/* Filters */}
      <div className="tension-filters">
        {['all', 'opposition', 'response', 'inversion', 'influence'].map(type => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`tension-filter-btn ${filter === type ? 'active' : ''}`}
            style={filter === type && type !== 'all' ? { borderColor: TENSION_COLORS[type], color: TENSION_COLORS[type] } : {}}
          >
            {type === 'all' ? 'All Tensions' : TENSION_LABELS[type]}
            {type !== 'all' && <span className="filter-dot" style={{ background: TENSION_COLORS[type] }} />}
          </button>
        ))}
      </div>

      <div className="tension-layout">
        {/* SVG Map */}
        <div className="tension-map-container">
          <svg ref={svgRef} viewBox="0 0 100 100" className="tension-svg" preserveAspectRatio="xMidYMid meet">
            <defs>
              {Object.entries(TENSION_COLORS).map(([type, color]) => (
                <marker
                  key={type}
                  id={`arrow-${type}`}
                  viewBox="0 0 10 10"
                  refX="9"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 0 L 10 5 L 0 10 z" fill={color} opacity="0.8" />
                </marker>
              ))}
              <filter id="glow">
                <feGaussianBlur stdDeviation="0.5" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Grid lines */}
            {[20, 40, 60, 80].map(v => (
              <g key={v} opacity="0.05">
                <line x1={v} y1="0" x2={v} y2="100" stroke="#94a3b8" strokeWidth="0.2" />
                <line x1="0" y1={v} x2="100" y2={v} stroke="#94a3b8" strokeWidth="0.2" />
              </g>
            ))}

            {/* Tension edges */}
            {visibleTensions.map((tension, i) => {
              const from = getPhilosopher(tension.from);
              const to = getPhilosopher(tension.to);
              if (!from || !to) return null;
              const color = TENSION_COLORS[tension.type];
              const highlighted = isTensionHighlighted(tension);
              const active = selectedTension === tension;

              // Midpoint for label
              const mx = (from.x + to.x) / 2;
              const my = (from.y + to.y) / 2;

              return (
                <g key={i} onClick={() => setSelectedTension(active ? null : tension)} style={{ cursor: 'pointer' }}>
                  {/* Wider invisible hit area */}
                  <line
                    x1={from.x} y1={from.y} x2={to.x} y2={to.y}
                    stroke="transparent" strokeWidth="3"
                  />
                  {/* Visible line */}
                  <line
                    x1={from.x} y1={from.y} x2={to.x} y2={to.y}
                    stroke={color}
                    strokeWidth={active ? 0.6 : highlighted ? 0.4 : 0.15}
                    opacity={highlighted ? tension.strength * 0.9 : 0.1}
                    strokeDasharray={tension.type === 'influence' ? '1.5,1' : 'none'}
                    markerEnd={`url(#arrow-${tension.type})`}
                    filter={active ? 'url(#glow)' : 'none'}
                    style={{ transition: 'all 0.3s ease' }}
                  />
                  {/* Edge label on hover */}
                  {highlighted && (
                    <text x={mx} y={my - 1} textAnchor="middle" fill={color}
                      fontSize="1.8" fontFamily="JetBrains Mono, monospace" opacity={highlighted ? 0.9 : 0}>
                      {tension.label}
                    </text>
                  )}
                </g>
              );
            })}

            {/* Philosopher nodes */}
            {PHILOSOPHERS.map((p) => {
              const highlighted = isNodeHighlighted(p.id);
              const isHovered = hoveredNode === p.id;
              return (
                <g key={p.id}
                  onMouseEnter={() => setHoveredNode(p.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                  style={{ cursor: 'pointer' }}
                >
                  {/* Outer glow ring */}
                  <circle cx={p.x} cy={p.y} r={isHovered ? 5 : 4}
                    fill="none" stroke={p.color} strokeWidth="0.4"
                    opacity={highlighted ? 0.4 : 0.08}
                    style={{ transition: 'all 0.3s ease' }} />
                  {/* Main node */}
                  <circle cx={p.x} cy={p.y} r={isHovered ? 3 : 2.5}
                    fill={p.color} opacity={highlighted ? 0.9 : 0.2}
                    filter={isHovered ? 'url(#glow)' : 'none'}
                    style={{ transition: 'all 0.3s ease' }} />
                  {/* Inner dot */}
                  <circle cx={p.x} cy={p.y} r="0.8"
                    fill="#0c111d" opacity={highlighted ? 0.8 : 0.3}
                    style={{ transition: 'all 0.3s ease' }} />
                  {/* Name label */}
                  <text x={p.x} y={p.y + 5.5} textAnchor="middle"
                    fill={p.color} fontSize="2.2" fontFamily="IM Fell English, serif"
                    opacity={highlighted ? 0.95 : 0.2}
                    style={{ transition: 'all 0.3s ease' }}>
                    {p.name}
                  </text>
                  <text x={p.x} y={p.y + 7.5} textAnchor="middle"
                    fill="#64748b" fontSize="1.5" fontFamily="JetBrains Mono, monospace"
                    opacity={highlighted ? 0.6 : 0.1}
                    style={{ transition: 'all 0.3s ease' }}>
                    {p.year}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Side panel */}
        <div className="tension-panel">
          <AnimatePresence mode="wait">
            {selectedTension ? (
              <motion.div key="detail"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="tension-detail"
              >
                <button onClick={() => setSelectedTension(null)} className="tension-close">← Back</button>
                <div className="detail-type" style={{ color: TENSION_COLORS[selectedTension.type] }}>
                  {TENSION_LABELS[selectedTension.type]}
                </div>
                <h2 className="detail-label">{selectedTension.label}</h2>
                <div className="detail-participants">
                  <span style={{ color: getPhilosopher(selectedTension.from)?.color }}>
                    {getPhilosopher(selectedTension.from)?.name}
                  </span>
                  <span className="detail-arrow">⟶</span>
                  <span style={{ color: getPhilosopher(selectedTension.to)?.color }}>
                    {getPhilosopher(selectedTension.to)?.name}
                  </span>
                </div>
                <div className="detail-strength">
                  <span>Tension Intensity</span>
                  <div className="strength-bar">
                    <div className="strength-fill"
                      style={{ width: `${selectedTension.strength * 100}%`, background: TENSION_COLORS[selectedTension.type] }} />
                  </div>
                  <span>{Math.round(selectedTension.strength * 100)}%</span>
                </div>
                <p className="detail-description">{selectedTension.description}</p>
              </motion.div>
            ) : (
              <motion.div key="list"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="tension-list"
              >
                <h3 className="panel-heading">Click any edge to explore</h3>
                <div className="legend">
                  {Object.entries(TENSION_COLORS).map(([type, color]) => (
                    <div key={type} className="legend-item">
                      <div className="legend-line" style={{ background: color }} />
                      <span>{TENSION_LABELS[type]}</span>
                    </div>
                  ))}
                </div>
                <div className="tension-list-items">
                  {visibleTensions.map((t, i) => (
                    <button key={i} className="tension-list-item"
                      onClick={() => setSelectedTension(t)}
                      style={{ borderLeftColor: TENSION_COLORS[t.type] }}
                    >
                      <div className="list-item-title">{t.label}</div>
                      <div className="list-item-sub">
                        <span style={{ color: getPhilosopher(t.from)?.color }}>{getPhilosopher(t.from)?.name}</span>
                        {' × '}
                        <span style={{ color: getPhilosopher(t.to)?.color }}>{getPhilosopher(t.to)?.name}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <style jsx>{`
        .tension-page {
          min-height: 100vh;
          background: #080c14;
          color: #e2e8f0;
          font-family: 'Crimson Pro', serif;
          padding: 1rem;
        }

        .tension-header {
          display: flex;
          align-items: flex-start;
          gap: 2rem;
          padding: 1rem 0 1.5rem;
          border-bottom: 1px solid rgba(251,191,36,0.1);
          margin-bottom: 1.5rem;
        }

        .tension-back {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.7rem;
          letter-spacing: 0.1em;
          color: rgba(251,191,36,0.6);
          text-decoration: none;
          padding: 0.5rem 1rem;
          border: 1px solid rgba(251,191,36,0.2);
          border-radius: 2px;
          white-space: nowrap;
          margin-top: 0.25rem;
          transition: all 0.2s ease;
        }
        .tension-back:hover {
          color: #fbbf24;
          border-color: rgba(251,191,36,0.5);
        }

        .tension-title {
          font-family: 'IM Fell English', serif;
          font-size: 2.5rem;
          background: linear-gradient(135deg, #fbbf24, #f59e0b);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 0.25rem;
        }

        .tension-subtitle {
          font-style: italic;
          color: #64748b;
          font-size: 1rem;
        }

        .tension-filters {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
          margin-bottom: 1.5rem;
        }

        .tension-filter-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.4rem 0.9rem;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.65rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          background: transparent;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 2px;
          color: #94a3b8;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .tension-filter-btn.active {
          background: rgba(255,255,255,0.05);
        }

        .tension-filter-btn:hover:not(.active) {
          border-color: rgba(255,255,255,0.2);
          color: #e2e8f0;
        }

        .filter-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          display: inline-block;
        }

        .tension-layout {
          display: grid;
          grid-template-columns: 1fr 320px;
          gap: 1.5rem;
          height: calc(100vh - 200px);
          min-height: 500px;
        }

        .tension-map-container {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 4px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .tension-svg {
          width: 100%;
          height: 100%;
        }

        .tension-panel {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 4px;
          overflow-y: auto;
          padding: 1.5rem;
        }

        .panel-heading {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.65rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #475569;
          margin-bottom: 1.5rem;
        }

        .legend {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
          margin-bottom: 2rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.85rem;
          color: #64748b;
        }

        .legend-line {
          width: 24px;
          height: 2px;
          border-radius: 1px;
          flex-shrink: 0;
        }

        .tension-list-items {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .tension-list-item {
          width: 100%;
          text-align: left;
          padding: 0.75rem;
          background: transparent;
          border: none;
          border-left: 2px solid transparent;
          cursor: pointer;
          transition: all 0.2s ease;
          border-radius: 0 2px 2px 0;
        }

        .tension-list-item:hover {
          background: rgba(255,255,255,0.04);
        }

        .list-item-title {
          font-family: 'IM Fell English', serif;
          font-size: 1rem;
          color: #e2e8f0;
          margin-bottom: 0.25rem;
        }

        .list-item-sub {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.65rem;
          color: #475569;
          letter-spacing: 0.05em;
        }

        /* Detail panel */
        .tension-detail { display: flex; flex-direction: column; gap: 1rem; }

        .tension-close {
          background: transparent;
          border: none;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.65rem;
          letter-spacing: 0.1em;
          color: #475569;
          cursor: pointer;
          padding: 0;
          transition: color 0.2s;
          text-align: left;
        }
        .tension-close:hover { color: #94a3b8; }

        .detail-type {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.65rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
        }

        .detail-label {
          font-family: 'IM Fell English', serif;
          font-size: 1.6rem;
          color: #f8fafc;
          line-height: 1.2;
        }

        .detail-participants {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-family: 'IM Fell English', serif;
          font-size: 1.1rem;
        }

        .detail-arrow { color: #475569; }

        .detail-strength {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.65rem;
          color: #475569;
          letter-spacing: 0.05em;
        }

        .strength-bar {
          flex: 1;
          height: 3px;
          background: rgba(255,255,255,0.08);
          border-radius: 1.5px;
          overflow: hidden;
        }

        .strength-fill {
          height: 100%;
          border-radius: 1.5px;
          transition: width 0.6s ease;
        }

        .detail-description {
          font-size: 1.05rem;
          line-height: 1.7;
          color: #94a3b8;
          font-style: italic;
          padding-top: 0.5rem;
          border-top: 1px solid rgba(255,255,255,0.06);
        }

        @media (max-width: 768px) {
          .tension-layout {
            grid-template-columns: 1fr;
            height: auto;
          }
          .tension-map-container {
            height: 60vw;
            min-height: 300px;
          }
          .tension-panel {
            max-height: 60vh;
          }
        }
      `}</style>
    </div>
  );
}