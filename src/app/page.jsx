'use client';
import './page.css';
import { timelineData } from '../lib/data';
import TimelineItem from '../components/TimelineItems';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from "react";

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
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAnimation } from 'framer-motion';
import Link from 'next/link';


export default function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  

  // Boulder rotation animation
  const boulderRotation = useTransform(scrollYProgress, [0, 1], [0, 2160]);

  // Timeline progress animations
  const timelineProgress = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const orbPosition = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);


  // Floating ambient particles
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 10 + 10,
    delay: Math.random() * 5
  }));

  // Button animation controls
  const router = useRouter();
  const buttonControls = useAnimation();
  const overlayControls = useAnimation();
  const buttons = [
    { label: 'Geo', route: '/geo' },
    { label: 'Tension', route: '/tension' },
    { label: 'Blank', route: '/blank' }
  ];

  const handleClick = async (route) => {
    
      buttonControls.start({
        scale: 40,
        opacity: 0,
        filter: "blur(10px)",
        transition: {
          duration: 1.1,
          ease: [0.16, 1, 0.3, 1]
        }
      }),

      // Screen vignette closes in
      overlayControls.start({
        opacity: 1,
        transition: { duration: 0.9, ease: "easeInOut" }
      });

    router.push(route);
};




  return (
    <>
      {/* FIXED BACKGROUND LAYERS - OUTSIDE SCROLL CONTAINER */}
      <div className="fixed inset-0" style={{ zIndex: -100 }}>
        <SkyLayer scrollYProgress={scrollYProgress} />
        <AtmosphericLayer scrollYProgress={scrollYProgress} />
        <CelestialLayer scrollYProgress={scrollYProgress} />
        <StarsLayer scrollYProgress={scrollYProgress} />
        <CloudsLayer scrollYProgress={scrollYProgress} />
        <WindLayer scrollYProgress={scrollYProgress} />
        <LightningLayer scrollYProgress={scrollYProgress} />
        <RainLayer scrollYProgress={scrollYProgress} />
        <FogLayer scrollYProgress={scrollYProgress} />
        
        {/* Background Image */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "url('/Socrates1.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
            opacity: 0.25,
            zIndex: 10
          }}
        />
      </div>

      {/* Floating Ambient Particles */}
      <div className="fixed inset-0 pointer-events-none Nav-Main-Button" style={{ zIndex: 5 }}>
        {particles.map(p => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-amber-400/20"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              filter: `blur(${p.size * 0.5}px)`
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 50 - 25, 0],
              opacity: [0, 0.6, 0],
              scale: [0, 1.5, 0]
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <motion.div
        className="fixed inset-0 pointer-events-none z-40"
        animate={overlayControls}
        initial={{ opacity: 0 }}
        style={{
          background:
            "radial-gradient(circle at center, rgba(0,0,0,0) 0%, rgba(0,0,0,0.6) 70%)"
        }}
      />



      <div className="relative h-screen w-full mb-16">
        {
          buttons.map((button, index) => (
            <motion.button
              key={button.route}
              animate={buttonControls}
              onClick={() => handleClick(button.route)}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.97 }}
              className="main-btn"
            >
              {button.label}
            </motion.button>
          ))
        }

      </div>




      
      {/* SCROLL CONTAINER */}
      <div ref={containerRef} style={{ minHeight: '500vh' }}>
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
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 0.1, type: "inertia" }}
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

        {/* Timeline Content with Enhanced Animations */}
        <div className="relative" style={{ zIndex: 20, paddingTop: '10rem', paddingBottom: '3rem' }}>
          {/* Central timeline line with progress */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2" style={{ zIndex: 1 }}>
            {/* Background line */}
            <div className="absolute inset-0 bg-gradient-to-b from-amber-900/30 via-amber-700/40 to-amber-900/30" />
            
            {/* Animated progress line */}
            <motion.div 
              className="absolute top-0 left-0 right-0 bg-gradient-to-b from-amber-500 via-amber-400 to-amber-300"
              style={{ 
                height: timelineProgress,
                boxShadow: '0 0 20px rgba(251,191,36,0.6)'
              }}
            />
            
            {/* Glowing orb at progress position */}
            <motion.div
              className="absolute left-1/2 w-4 h-4 -ml-2 rounded-full bg-amber-400 shadow-lg"
              style={{
                top: orbPosition,
                boxShadow: '0 0 20px rgba(251,191,36,0.8), 0 0 40px rgba(251,191,36,0.4)'
              }}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.8, 1, 0.8]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>

          {timelineData.map((event, index) => (
            <motion.div 
              key={`${event.year}-${event.title}`} 
              className={`timeline-wrapper ${index % 2 === 0 ? 'left-timeline' : 'right-timeline'}`}
              initial={{ 
                opacity: 0, 
                x: index % 2 === 0 ? -100 : 100,
                scale: 0.8
              }}
              whileInView={{ 
                opacity: 1, 
                x: 0,
                scale: 1
              }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                duration: 0.6,
                delay: 0.1,
                type: "spring",
                stiffness: 100
              }}
            >
              <TimelineItem 
                event={event}
                isLeft={index % 2 === 0}
                index={index}
              />
              <motion.div 
                className={`timeline-year absolute top-1/2 transform -translate-y-1/2
                  ${index % 2 === 0 ? 'right-[calc(50%+1rem)]' : 'left-[calc(50%+1rem)]'}`}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <motion.p 
                  className="text-amber-500 font-bold text-xl"
                  whileHover={{ 
                    scale: 1.2,
                    textShadow: "0 0 20px rgba(251,191,36,0.8)"
                  }}
                >
                  {event.year}
                </motion.p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
}