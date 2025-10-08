'use client';
import { motion, useTransform } from 'framer-motion';

export default function RainLayer ({ scrollYProgress }) {
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