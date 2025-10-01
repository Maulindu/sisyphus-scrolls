'use client';
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { timelineData } from '../lib/data';
import TimelineItem from '../components/TimelineItems';

// Sky Layer - Gradual, subtle atmospheric changes
const SkyLayer = ({ scrollYProgress }) => {
  // Much more gradual transitions with overlapping ranges
  const dawnOpacity = useTransform(scrollYProgress, 
    [0, 0.08, 0.15, 0.22],
    [1, 1, 0.3, 0]
  );
  
  const morningOpacity = useTransform(scrollYProgress,
    [0.1, 0.18, 0.28, 0.35],
    [0, 0.7, 1, 0.3]
  );
  
  const noonOpacity = useTransform(scrollYProgress,
    [0.25, 0.33, 0.43, 0.50],
    [0, 0.7, 1, 0.3]
  );

  const afternoonOpacity = useTransform(scrollYProgress,
    [0.40, 0.48, 0.58, 0.65],
    [0, 0.7, 1, 0.3]
  );
  
  const duskOpacity = useTransform(scrollYProgress,
    [0.55, 0.63, 0.73, 0.80],
    [0, 0.7, 1, 0.3]
  );
  
  const twilightOpacity = useTransform(scrollYProgress,
    [0.70, 0.78, 0.85, 0.90],
    [0, 0.7, 1, 0.5]
  );

  const nightOpacity = useTransform(scrollYProgress,
    [0.82, 0.88, 0.93, 0.97],
    [0, 0.7, 1, 0.7]
  );
  
  const stormOpacity = useTransform(scrollYProgress,
    [0.90, 0.95, 1],
    [0, 0.8, 1]
  );

  return (
    <div className="fixed inset-0 -z-50">
      {/* Dawn - Pale, cold beginning */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-slate-400 via-rose-200 to-amber-100"
        style={{ opacity: dawnOpacity }}
      />
      
      {/* Morning - Hope and light */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-sky-300 via-blue-200 to-amber-50"
        style={{ opacity: morningOpacity }}
      />

      {/* Noon - Harsh, unforgiving light */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-cyan-200 via-sky-100 to-stone-100"
        style={{ opacity: noonOpacity }}
      />

      {/* Afternoon - Weariness sets in */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-amber-200 via-orange-100 to-stone-200"
        style={{ opacity: afternoonOpacity }}
      />
      
      {/* Dusk - Fading strength */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-slate-500 via-orange-300 to-rose-200"
        style={{ opacity: duskOpacity }}
      />

      {/* Twilight - Deepening despair */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-indigo-800 via-purple-600 to-slate-500"
        style={{ opacity: twilightOpacity }}
      />
      
      {/* Night - Exhaustion and solitude */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-800"
        style={{ opacity: nightOpacity }}
      />
      
      {/* Storm - The culmination of struggle */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-zinc-900 via-slate-800 to-stone-700"
        style={{ opacity: stormOpacity }}
      />
    </div>
  );
};

// Atmospheric Particles - Dust, heat shimmer, cold mist
const AtmosphericLayer = ({ scrollYProgress }) => {
  const heatShimmerOpacity = useTransform(scrollYProgress, [0.25, 0.4, 0.55], [0, 0.15, 0]);
  const dustOpacity = useTransform(scrollYProgress, [0.35, 0.5, 0.65], [0, 0.2, 0]);
  const mistOpacity = useTransform(scrollYProgress, [0, 0.1, 0.2], [0.3, 0.15, 0]);

  return (
    <>
      {/* Morning Mist */}
      <motion.div
        className="fixed inset-0 pointer-events-none"
        style={{ opacity: mistOpacity, zIndex: -42 }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-slate-200/20 via-transparent to-transparent" />
      </motion.div>

      {/* Heat Shimmer Effect */}
      <motion.div
        className="fixed inset-0 pointer-events-none"
        style={{ opacity: heatShimmerOpacity, zIndex: -41 }}
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={`shimmer-${i}`}
            className="absolute inset-0 bg-gradient-to-t from-amber-100/10 via-transparent to-transparent"
            animate={{
              y: [0, -20, 0],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3
            }}
          />
        ))}
      </motion.div>

      {/* Dust Particles */}
      <motion.div
        className="fixed inset-0 pointer-events-none"
        style={{ opacity: dustOpacity, zIndex: -40 }}
      >
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={`dust-${i}`}
            className="absolute w-1 h-1 bg-amber-900/20 rounded-full blur-sm"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
          />
        ))}
      </motion.div>
    </>
  );
};

// Celestial Bodies - Subtle sun and moon
const CelestialLayer = ({ scrollYProgress }) => {
  const sunY = useTransform(scrollYProgress, [0, 0.15, 0.5, 0.65], ['120%', '15%', '15%', '-20%']);
  const sunOpacity = useTransform(scrollYProgress, [0, 0.1, 0.55, 0.7], [0, 0.6, 0.6, 0]);
  const sunScale = useTransform(scrollYProgress, [0.3, 0.4, 0.5], [1, 1.15, 1]);
  
  const moonY = useTransform(scrollYProgress, [0.7, 0.85], ['120%', '20%']);
  const moonOpacity = useTransform(scrollYProgress, [0.7, 0.78, 0.95], [0, 0.5, 0.4]);

  return (
    <>
      {/* Sun - Harsh and unrelenting */}
      <motion.div
        className="fixed left-[15%] w-32 h-32 rounded-full"
        style={{ 
          y: sunY,
          opacity: sunOpacity,
          scale: sunScale,
          zIndex: -45,
          background: 'radial-gradient(circle, rgba(255,237,160,0.8) 0%, rgba(255,200,100,0.4) 50%, transparent 70%)',
          filter: 'blur(2px)'
        }}
      />
      
      {/* Moon - Cold and distant */}
      <motion.div
        className="fixed right-[20%] w-20 h-20 rounded-full bg-slate-200/60"
        style={{ 
          y: moonY,
          opacity: moonOpacity,
          zIndex: -45,
          filter: 'blur(1px)'
        }}
      >
        <div className="absolute top-2 left-2 w-5 h-5 rounded-full bg-slate-300/40" />
        <div className="absolute bottom-3 right-4 w-3 h-3 rounded-full bg-slate-300/30" />
      </motion.div>
    </>
  );
};

// Stars - Sparse and distant
const StarsLayer = ({ scrollYProgress }) => {
  const starsOpacity = useTransform(scrollYProgress, [0.7, 0.82, 0.93], [0, 0.4, 0.3]);
  
  const stars = Array.from({ length: 80 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 70}%`,
    size: Math.random() * 1.5 + 0.5,
    brightness: Math.random()
  }));

  return (
    <motion.div 
      className="fixed inset-0 pointer-events-none"
      style={{ opacity: starsOpacity, zIndex: -40 }}
    >
      {stars.map(star => (
        <motion.div
          key={star.id}
          className="absolute bg-slate-100 rounded-full"
          style={{
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
            opacity: star.brightness * 0.6
          }}
          animate={{
            opacity: [star.brightness * 0.4, star.brightness * 0.8, star.brightness * 0.4]
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 3
          }}
        />
      ))}
    </motion.div>
  );
};

// Clouds - Sparse, drifting
const CloudsLayer = ({ scrollYProgress }) => {
  const morningCloudsOpacity = useTransform(scrollYProgress, [0.1, 0.25, 0.4], [0, 0.3, 0]);
  const afternoonCloudsOpacity = useTransform(scrollYProgress, [0.4, 0.55, 0.7], [0, 0.25, 0]);
  const stormCloudsOpacity = useTransform(scrollYProgress, [0.88, 0.95, 1], [0, 0.6, 0.8]);

  const cloudDrift = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  return (
    <>
      {/* Morning Clouds */}
      <motion.div 
        className="fixed inset-0 pointer-events-none"
        style={{ opacity: morningCloudsOpacity, x: cloudDrift, zIndex: -35 }}
      >
        <div className="absolute top-[18%] left-[10%] w-48 h-20 bg-slate-300/30 rounded-full blur-xl" />
        <div className="absolute top-[35%] right-[15%] w-56 h-24 bg-slate-300/25 rounded-full blur-xl" />
      </motion.div>

      {/* Afternoon Clouds */}
      <motion.div 
        className="fixed inset-0 pointer-events-none"
        style={{ opacity: afternoonCloudsOpacity, x: cloudDrift, zIndex: -35 }}
      >
        <div className="absolute top-[25%] left-[20%] w-52 h-22 bg-slate-400/30 rounded-full blur-xl" />
        <div className="absolute top-[40%] right-[25%] w-60 h-26 bg-slate-400/25 rounded-full blur-xl" />
      </motion.div>

      {/* Storm Clouds */}
      <motion.div 
        className="fixed inset-0 pointer-events-none"
        style={{ opacity: stormCloudsOpacity, zIndex: -33 }}
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={`storm-cloud-${i}`}
            className="absolute w-80 h-32 bg-slate-700/50 rounded-full blur-2xl"
            style={{
              top: `${10 + i * 12}%`,
              left: `${i * 20}%`
            }}
            animate={{
              x: [0, -30, 0],
              opacity: [0.4, 0.6, 0.4]
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              delay: i * 1.5
            }}
          />
        ))}
      </motion.div>
    </>
  );
};

// Wind Effect - Subtle atmospheric movement
const WindLayer = ({ scrollYProgress }) => {
  const windOpacity = useTransform(scrollYProgress, [0.35, 0.5, 0.65], [0, 0.08, 0]);

  return (
    <motion.div
      className="fixed inset-0 pointer-events-none"
      style={{ opacity: windOpacity, zIndex: -38 }}
    >
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={`wind-${i}`}
          className="absolute w-40 h-0.5 bg-slate-400/15 blur-sm"
          style={{
            top: `${Math.random() * 80 + 10}%`,
            left: '-10%'
          }}
          animate={{
            x: ['0%', '120vw']
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: 'linear'
          }}
        />
      ))}
    </motion.div>
  );
};

// Lightning - Rare, powerful flashes
const LightningLayer = ({ scrollYProgress }) => {
  const lightningOpacity = useTransform(scrollYProgress, [0.88, 0.95, 1], [0, 1, 1]);
  
  return (
    <motion.div
      className="fixed inset-0 pointer-events-none"
      style={{ opacity: lightningOpacity, zIndex: -28 }}
    >
      {Array.from({ length: 2 }).map((_, i) => (
        <motion.div
          key={`lightning-${i}`}
          className="absolute top-0 w-2 h-full bg-slate-100"
          style={{
            left: `${30 + i * 40}%`,
            filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.8))',
            clipPath: 'polygon(48% 0%, 55% 35%, 52% 35%, 58% 60%, 50% 60%, 54% 100%, 46% 65%, 50% 65%, 45% 40%, 48% 40%)'
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0.8, 1, 0] }}
          transition={{
            duration: 0.3,
            repeat: Infinity,
            repeatDelay: 7 + i * 3,
            times: [0, 0.1, 0.2, 0.3, 1]
          }}
        />
      ))}
    </motion.div>
  );
};

// Rain - Relentless, heavy
const RainLayer = ({ scrollYProgress }) => {
  const rainOpacity = useTransform(scrollYProgress, [0.90, 0.96, 1], [0, 0.5, 0.6]);
  
  const raindrops = Array.from({ length: 150 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: Math.random() * 2,
    duration: 0.4 + Math.random() * 0.3
  }));

  return (
    <motion.div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ opacity: rainOpacity, zIndex: -25 }}
    >
      {raindrops.map(drop => (
        <motion.div
          key={drop.id}
          className="absolute w-px h-10 bg-slate-300/40"
          style={{ left: drop.left, top: '-5%' }}
          animate={{ y: ['0vh', '105vh'] }}
          transition={{
            duration: drop.duration,
            repeat: Infinity,
            delay: drop.delay,
            ease: 'linear'
          }}
        />
      ))}
    </motion.div>
  );
};

// Fog - Oppressive, obscuring
const FogLayer = ({ scrollYProgress }) => {
  const fogOpacity = useTransform(scrollYProgress, [0.92, 0.97, 1], [0, 0.3, 0.4]);

  return (
    <motion.div
      className="fixed inset-0 pointer-events-none"
      style={{ opacity: fogOpacity, zIndex: -27 }}
    >
      {Array.from({ length: 4 }).map((_, i) => (
        <motion.div
          key={`fog-${i}`}
          className="absolute inset-0 bg-gradient-to-t from-slate-600/40 via-slate-500/20 to-transparent blur-3xl"
          animate={{
            x: [-100, 100, -100],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: 15 + i * 3,
            repeat: Infinity,
            delay: i * 4
          }}
        />
      ))}
    </motion.div>
  );
};

// Main Scene Component
export default function SisyphusScene() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <div ref={containerRef} className="relative" style={{ height: '500vh' }}>
      {/* All Atmospheric Layers */}
      <SkyLayer scrollYProgress={scrollYProgress} />
      <AtmosphericLayer scrollYProgress={scrollYProgress} />
      <CelestialLayer scrollYProgress={scrollYProgress} />
      <StarsLayer scrollYProgress={scrollYProgress} />
      <CloudsLayer scrollYProgress={scrollYProgress} />
      <WindLayer scrollYProgress={scrollYProgress} />
      <LightningLayer scrollYProgress={scrollYProgress} />
      <RainLayer scrollYProgress={scrollYProgress} />
      <FogLayer scrollYProgress={scrollYProgress} />
      
      {/* Your timeline content goes here */}
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
              <div className={`timeline-year absolute top-1/2 transform -translate-y-1/2
                ${index % 2 === 0 ? 'right-[calc(50%+1rem)]' : 'left-[calc(50%+1rem)]'}`}>
                <p className="text-amber-500">{event.year}</p>
              </div>
            </div>
          ))}
    </div>
  );
}