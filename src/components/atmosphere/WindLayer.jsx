'use client';
import { motion, useTransform } from 'framer-motion';
import { useState, useEffect } from "react";

export default function WindLayer({ scrollYProgress }) {
  const windOpacity = useTransform(scrollYProgress, [0.35, 0.5, 0.65], [0, 0.08, 0]);

  const [windParticles, setWindParticles] = useState([]);

  useEffect(() => {
    const generated = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      top: `${Math.random() * 80 + 10}%`, // random vertical position
      delay: Math.random() * 5,           // staggered start
      duration: 4 + Math.random() * 3     // varied speed
    }));
    setWindParticles(generated);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 pointer-events-none"
      style={{ opacity: windOpacity, zIndex: -38 }}
    >
      {windParticles.map(particle => (
        <motion.div
          key={particle.id}
          className="absolute w-40 h-0.5 bg-slate-400/15 blur-sm"
          style={{
            top: particle.top,
            left: '-10%'
          }}
          animate={{
            x: ['0%', '120vw']
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: 'linear'
          }}
        />
      ))}
    </motion.div>
  );
};