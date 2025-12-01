'use client';
import './page.css';
import { timelineData } from '../lib/data';
import TimelineItem from '../components/TimelineItems';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from "react";

import {
  SkyLayer,
  AtmosphericLayer,
  CelestialLayer,
  StarsLayer,
  CloudsLayer,
  WindLayer,
  LightningLayer,
  RainLayer,
  FogLayer
} from '../components/atmosphere';

export default function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Boulder rotation animation
  const boulderRotation = useTransform(scrollYProgress, [0, 1], [0, 2160]);

  return (
    <div ref={containerRef} className="relative" style={{ minHeight: '500vh' }}>
      {/* Atmospheric Layers - MUST be before background image! */}
      <SkyLayer scrollYProgress={scrollYProgress} />
      <AtmosphericLayer scrollYProgress={scrollYProgress} />
      <CelestialLayer scrollYProgress={scrollYProgress} />
      <StarsLayer scrollYProgress={scrollYProgress} />
      <CloudsLayer scrollYProgress={scrollYProgress} />
      <WindLayer scrollYProgress={scrollYProgress} />
      <LightningLayer scrollYProgress={scrollYProgress} />
      <RainLayer scrollYProgress={scrollYProgress} />
      <FogLayer scrollYProgress={scrollYProgress} />

      {/* Background - BEHIND atmospheric layers with LOWER z-index */}
      <div 
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: "url('/Socrates1.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          opacity: 0.3,
          zIndex: -60  // LOWER than all atmospheric layers!
        }}
      />

      {/* Boulder - Fixed */}
      <motion.div 
        className="fixed boulder pointer-events-none"
        style={{
          top: "35%",
          left: "75%",
          width: "180px",
          height: "180px",
          zIndex: 40
        }}
      >   
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <defs>
            <radialGradient id="boulderArt" cx="30%" cy="30%">
              <stop offset="0%" stopColor="#D4D4D4" />
              <stop offset="50%" stopColor="#A3A3A3" />
              <stop offset="100%" stopColor="#525252" />
            </radialGradient>
            <filter id="roughTexture">
              <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" result="noise"/>
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" />
            </filter>
          </defs>
          <motion.g 
            style={{ rotate: boulderRotation }}
            transformOrigin="100px 100px"
          >
            <circle 
              cx="100" 
              cy="100" 
              r="45" 
              fill="url(#boulderArt)" 
              stroke="#404040" 
              strokeWidth="2"
              filter="url(#roughTexture)"
              opacity="0.95"
            />
          </motion.g>
        </svg>
      </motion.div>

      {/* Timeline Content */}
      <div className="relative" style={{ zIndex: 20, paddingTop: '6rem', paddingBottom: '3rem' }}>
        {timelineData.map((event, index) => (
          <div 
            key={`${event.year}-${event.title}`} 
            className={`timeline-wrapper ${index % 2 === 0 ? 'left-timeline' : 'right-timeline'}`}
          >
            <TimelineItem 
              event={event}
              isLeft={index % 2 === 0}
              index={index}
            />
            <div 
              className={`timeline-year absolute top-1/2 transform -translate-y-1/2
                ${index % 2 === 0 ? 'right-[calc(50%+1rem)]' : 'left-[calc(50%+1rem)]'}`}
            >
              <p className="text-amber-500">{event.year}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}