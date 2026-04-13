'use client';
import { motion, useTransform } from 'framer-motion';

export default function FogLayer({ scrollYProgress }) {
  const fogOpacity = useTransform(scrollYProgress, [0.92, 0.97, 1], [0, 0.3, 0.4]);

  return (
    <motion.div className="absolute inset-0 pointer-events-none" style={{ opacity: fogOpacity }}>
      {Array.from({ length: 4 }).map((_, i) => (
        <motion.div key={`fog-${i}`} className="absolute inset-0 blur-3xl"
          style={{ background: 'linear-gradient(to top, rgba(71,85,105,0.4) 0%, rgba(100,116,139,0.2) 50%, transparent 100%)' }}
          animate={{ x: [-100, 100, -100], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 15 + i * 3, repeat: Infinity, delay: i * 4 }}
        />
      ))}
    </motion.div>
  );
}