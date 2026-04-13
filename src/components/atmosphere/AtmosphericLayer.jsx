'use client';
import { motion, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function AtmosphericLayer({ scrollYProgress }) {
  const heatShimmerOpacity = useTransform(scrollYProgress, [0.30, 0.40, 0.55], [0, 0.25, 0]);
  const dustOpacity = useTransform(scrollYProgress, [0.40, 0.52, 0.65], [0, 0.3, 0]);
  const mistOpacity = useTransform(scrollYProgress, [0, 0.12, 0.22], [0.4, 0.25, 0]);

  const [dustParticles, setDustParticles] = useState([]);

  useEffect(() => {
    const generated = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: 1 + Math.random() * 2,
      xRange: Math.random() * 120 - 60,
      yRange: Math.random() * 80 - 40,
      duration: 10 + Math.random() * 8,
      delay: Math.random() * 6,
    }));
    setDustParticles(generated);
  }, []);

  return (
    <>
      <motion.div className="absolute inset-0 pointer-events-none" style={{ opacity: mistOpacity }}>
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(to top, rgba(226,232,240,0.4) 0%, rgba(241,245,249,0.2) 30%, transparent 60%)',
          filter: 'blur(30px)'
        }} />
        {[0, 1, 2].map(i => (
          <motion.div key={`mist-${i}`} className="absolute bottom-0 w-80 h-60 rounded-full blur-3xl"
            style={{ left: `${i * 35}%`, background: 'radial-gradient(ellipse, rgba(241,245,249,0.5) 0%, rgba(226,232,240,0.3) 50%, transparent 100%)' }}
            animate={{ x: [-20, 20, -20], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 12 + i * 3, repeat: Infinity, delay: i * 2 }}
          />
        ))}
      </motion.div>

      <motion.div className="absolute inset-0 pointer-events-none" style={{ opacity: heatShimmerOpacity }}>
        {Array.from({ length: 10 }).map((_, i) => (
          <motion.div key={`shimmer-${i}`} className="absolute inset-0"
            style={{ background: `linear-gradient(to top, rgba(254,243,199,0.1) 0%, transparent 40%)`, filter: 'blur(20px)' }}
            animate={{ y: [0, -30, 0], opacity: [0.15, 0.25, 0.15] }}
            transition={{ duration: 3 + i * 0.4, repeat: Infinity, delay: i * 0.3 }}
          />
        ))}
      </motion.div>

      <motion.div className="absolute inset-0 pointer-events-none" style={{ opacity: dustOpacity }}>
        {dustParticles.map((p) => (
          <motion.div key={p.id} className="absolute rounded-full bg-amber-800/30"
            style={{ left: p.left, top: p.top, width: p.size, height: p.size, filter: `blur(${p.size * 0.5}px)` }}
            animate={{ x: [0, p.xRange], y: [0, p.yRange], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: p.duration, repeat: Infinity, delay: p.delay }}
          />
        ))}
      </motion.div>
    </>
  );
}