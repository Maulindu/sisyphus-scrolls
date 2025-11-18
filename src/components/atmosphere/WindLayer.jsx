'use client';
import { motion, useTransform } from 'framer-motion';
import { useState, useEffect } from "react";

export default function WindLayer({ scrollYProgress }) {
  const windOpacity = useTransform(scrollYProgress, 
    [0.38, 0.52, 0.68], 
    [0, 0.15, 0]
  );

  const stormWindOpacity = useTransform(scrollYProgress,
    [0.88, 0.95, 1],
    [0, 0.3, 0.35]
  );

  const [windStreaks, setWindStreaks] = useState([]);

  useEffect(() => {
    const generated = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      top: `${Math.random() * 85 + 10}%`,
      delay: Math.random() * 6,
      duration: 5 + Math.random() * 4,
      opacity: 0.1 + Math.random() * 0.15
    }));
    setWindStreaks(generated);
  }, []);

  return (
    <>
      {/* Gentle wind - Afternoon */}
      <motion.div
        className="fixed inset-0 pointer-events-none"
        style={{ opacity: windOpacity, zIndex: -38 }}
      >
        {windStreaks.map(streak => (
          <motion.div
            key={`wind-${streak.id}`}
            className="absolute w-48 h-0.5 rounded-full"
            style={{
              top: streak.top,
              left: '-15%',
              background: `linear-gradient(to right, 
                transparent 0%, 
                rgba(148,163,184,${streak.opacity}) 30%, 
                rgba(148,163,184,${streak.opacity * 0.7}) 60%, 
                transparent 100%
              )`,
              filter: 'blur(2px)'
            }}
            animate={{
              x: ['0%', '125vw']
            }}
            transition={{
              duration: streak.duration,
              repeat: Infinity,
              delay: streak.delay,
              ease: 'linear'
            }}
          />
        ))}
      </motion.div>

      {/* Storm wind - Violent gusts */}
      <motion.div
        className="fixed inset-0 pointer-events-none"
        style={{ opacity: stormWindOpacity, zIndex: -38 }}
      >
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={`storm-wind-${i}`}
            className="absolute w-64 h-1 rounded-full"
            style={{
              top: `${Math.random() * 90 + 5}%`,
              left: '-20%',
              background: 'linear-gradient(to right, transparent 0%, rgba(71,85,105,0.4) 30%, rgba(100,116,139,0.3) 60%, transparent 100%)',
              filter: 'blur(3px)'
            }}
            animate={{
              x: ['0%', '130vw'],
              y: [0, Math.random() * 40 - 20]
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: 'easeIn'
            }}
          />
        ))}
        
        {/* Wind gusts */}
        <motion.div
          className="absolute inset-0"
          animate={{
            opacity: [0, 0.2, 0, 0.15, 0]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatDelay: 2
          }}
          style={{
            background: 'linear-gradient(to right, transparent 0%, rgba(71,85,105,0.1) 50%, transparent 100%)',
            filter: 'blur(40px)'
          }}
        />
      </motion.div>
    </>
  );
}