'use client';
import { motion, useTransform } from 'framer-motion';

export default function CelestialLayer({ scrollYProgress }) {
  const sunY = useTransform(scrollYProgress, [0, 0.15, 0.5, 0.65], ['120%', '15%', '15%', '-20%']);
  const sunOpacity = useTransform(scrollYProgress, [0, 0.1, 0.55, 0.7], [0, 0.6, 0.6, 0]);
  const sunScale = useTransform(scrollYProgress, [0.3, 0.4, 0.5], [1, 1.15, 1]);
  
  const moonY = useTransform(scrollYProgress, [0.7, 0.85], ['120%', '20%']);
  const moonOpacity = useTransform(scrollYProgress, [0.7, 0.78, 0.95], [0, 0.5, 0.4]);

  return (
    <>
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
}