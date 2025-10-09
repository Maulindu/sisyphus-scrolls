'use client';
import { motion, useTransform } from 'framer-motion';

export default function FogLayer ({ scrollYProgress }) {
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