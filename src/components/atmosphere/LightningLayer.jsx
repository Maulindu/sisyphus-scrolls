'use client';
import { motion, useTransform } from 'framer-motion';

export default function LightningLayer ({ scrollYProgress })  {
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