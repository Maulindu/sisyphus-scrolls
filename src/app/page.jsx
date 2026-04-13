'use client';
import './page.css';
import { timelineData } from '../lib/data';
import TimelineItem from '../components/TimelineItems';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useRouter } from 'next/navigation';

import {
  SkyLayer,
  AtmosphericLayer,
  CelestialLayer,
  StarsLayer,
  CloudsLayer,
  WindLayer,
  LightningLayer,
  RainLayer,
  FogLayer,
} from '../components/atmosphere';

const NAV_BUTTONS = [
  {
    label: 'Geo Map',
    sub: 'Philosophers by origin',
    route: '/geo',
    icon: '🗺',
    accent: '#22c55e',
    desc: 'Interactive world map — where great minds were born',
  },
  {
    label: 'Tension Map',
    sub: 'Conflicts & lineages',
    route: '/tension-map',
    icon: '⚡',
    accent: '#f59e0b',
    desc: 'Visual graph of oppositions and inversions',
  },
];

export default function Home() {
  const containerRef = useRef(null);
  const router = useRouter();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const boulderRotation = useTransform(scrollYProgress, [0, 1], [0, 2160]);
  const timelineProgress = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const orbPosition = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <>
      {/* ONE fixed atmosphere container — children are absolute */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
        <SkyLayer        scrollYProgress={scrollYProgress} />
        <CelestialLayer  scrollYProgress={scrollYProgress} />
        <StarsLayer      scrollYProgress={scrollYProgress} />
        <CloudsLayer     scrollYProgress={scrollYProgress} />
        <AtmosphericLayer scrollYProgress={scrollYProgress} />
        <WindLayer       scrollYProgress={scrollYProgress} />
        <LightningLayer  scrollYProgress={scrollYProgress} />
        <RainLayer       scrollYProgress={scrollYProgress} />
        <FogLayer        scrollYProgress={scrollYProgress} />
        <div className="absolute inset-0" style={{
          backgroundImage: "url('/Socrates1.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.06,
          mixBlendMode: 'luminosity',
        }} />
      </div>

      {/* Hero */}
      <section className="hero-section" style={{ zIndex: 10 }}>
        <div className="grain-overlay" />

        <motion.div
          className="hero-inner"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.p
            className="hero-eyebrow"
            initial={{ opacity: 0, letterSpacing: '0.8em' }}
            animate={{ opacity: 1, letterSpacing: '0.4em' }}
            transition={{ delay: 0.3, duration: 1.2 }}
          >
            An absurdist scroll through thought
          </motion.p>

          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            Sisyphus<em>Scrolls</em>
          </motion.h1>

          <motion.div
            className="hero-rule"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          />

          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.9 }}
          >
            Scroll through the great minds of history.<br />
            Watch the sky shift as philosophy evolves from dawn to storm.
          </motion.p>

          <motion.div
            className="hero-nav"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.35, duration: 0.9 }}
          >
            {NAV_BUTTONS.map((btn) => (
              <motion.button
                key={btn.route}
                className="nav-card"
                onClick={() => router.push(btn.route)}
                whileHover={{ y: -7, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                style={{ '--accent': btn.accent }}
              >
                <div className="nav-card-top">
                  <span className="nav-card-icon">{btn.icon}</span>
                  <span className="nav-card-arrow">→</span>
                </div>
                <div className="nav-card-label">{btn.label}</div>
                <div className="nav-card-sub">{btn.sub}</div>
                <div className="nav-card-desc">{btn.desc}</div>
                <div className="nav-card-glow" />
              </motion.button>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          className="scroll-cue"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 1 }}
        >
          <span className="scroll-cue-label">scroll to begin</span>
          <motion.div
            className="scroll-cue-line"
            animate={{ scaleY: [0.3, 1, 0.3], opacity: [0.2, 0.8, 0.2] }}
            transition={{ duration: 2.4, repeat: Infinity }}
          />
        </motion.div>
      </section>

      {/* Scroll container */}
      <div ref={containerRef} style={{ minHeight: '500vh', position: 'relative', zIndex: 10 }}>

        {/* Rolling boulder */}
        <motion.div
          className="boulder-wrapper"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.8, type: 'spring', stiffness: 50 }}
        >
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <defs>
              <radialGradient id="bg" cx="28%" cy="28%">
                <stop offset="0%" stopColor="#d1d5db" />
                <stop offset="45%" stopColor="#9ca3af" />
                <stop offset="100%" stopColor="#1f2937" />
              </radialGradient>
              <filter id="rfx">
                <feTurbulence type="fractalNoise" baseFrequency="0.82" numOctaves="4" result="n" />
                <feDisplacementMap in="SourceGraphic" in2="n" scale="5" />
              </filter>
            </defs>
            <motion.g style={{ rotate: boulderRotation }} transformOrigin="100px 100px">
              <circle cx="100" cy="100" r="46" fill="url(#bg)"
                stroke="#111827" strokeWidth="2" filter="url(#rfx)" opacity="0.95" />
              <ellipse cx="85" cy="79" rx="19" ry="9" fill="none"
                stroke="rgba(255,255,255,0.09)" strokeWidth="1.5" filter="url(#rfx)" />
            </motion.g>
          </svg>
        </motion.div>

        {/* Timeline */}
        <div className="timeline-area">
          <div className="timeline-spine">
            <div className="spine-track" />
            <motion.div className="spine-fill" style={{ height: timelineProgress }} />
            <motion.div
              className="spine-orb"
              style={{ top: orbPosition }}
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 2.4, repeat: Infinity }}
            />
          </div>

          {timelineData.map((event, index) => (
            <motion.div
              key={`${event.year}-${event.title}`}
              className={`timeline-wrapper ${index % 2 === 0 ? 'left-timeline' : 'right-timeline'}`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.85, type: 'spring', stiffness: 55, damping: 20 }}
            >
              <TimelineItem event={event} isLeft={index % 2 === 0} index={index} />

              {/* Year label beside spine */}
              <motion.div
                className={`year-badge ${index % 2 === 0 ? 'year-badge-left' : 'year-badge-right'}`}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.25 }}
              >
                <span className="year-text">{event.year}</span>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
}