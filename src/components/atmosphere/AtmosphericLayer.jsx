'use client';
import { motion, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function AtmosphericLayer({ scrollYProgress }) {
  const heatShimmerOpacity = useTransform(scrollYProgress, [0.25, 0.4, 0.55], [0, 0.15, 0]);
  const dustOpacity = useTransform(scrollYProgress, [0.35, 0.5, 0.65], [0, 0.2, 0]);
  const mistOpacity = useTransform(scrollYProgress, [0, 0.1, 0.2], [0.3, 0.15, 0]);

  const [dustParticles, setDustParticles] = useState([]);

  useEffect(() => {
    const generated = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      xRange: Math.random() * 100 - 50,
      yRange: Math.random() * 100 - 50,
      duration: 8 + Math.random() * 4,
      delay: Math.random() * 5,
    }));
    setDustParticles(generated);
  }, []);

  return (
    <>
      <motion.div className="fixed inset-0 pointer-events-none" style={{ opacity: mistOpacity, zIndex: -42 }}>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-200/20 via-transparent to-transparent" />
      </motion.div>

      <motion.div className="fixed inset-0 pointer-events-none" style={{ opacity: heatShimmerOpacity, zIndex: -41 }}>
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={`shimmer-${i}`}
            className="absolute inset-0 bg-gradient-to-t from-amber-100/10 via-transparent to-transparent"
            animate={{
              y: [0, -20, 0],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}
      </motion.div>

      <motion.div className="fixed inset-0 pointer-events-none" style={{ opacity: dustOpacity, zIndex: -40 }}>
        {dustParticles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute w-1 h-1 bg-amber-900/20 rounded-full blur-sm"
            style={{ left: p.left, top: p.top }}
            animate={{
              x: [0, p.xRange],
              y: [0, p.yRange],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
            }}
          />
        ))}
      </motion.div>
    </>
  );
}
